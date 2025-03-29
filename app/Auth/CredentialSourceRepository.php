<?php

namespace App\Auth;

use App\Models\Authenticator;
use App\Models\User;
use Webauthn\PublicKeyCredentialSource;
use Webauthn\PublicKeyCredentialSourceRepository;
use Webauthn\PublicKeyCredentialUserEntity;

class CredentialSourceRepository implements PublicKeyCredentialSourceRepository
{
    public function findOneByCredentialId(string $publicKeyCredentialId): ?PublicKeyCredentialSource
    {
        $authenticator = Authenticator::where(
            'credential_id',
            base64_encode($publicKeyCredentialId)
        )->first();

        if (!$authenticator) {
            return null;
        }

        return PublicKeyCredentialSource::createFromArray($authenticator->public_key);
    }

    public function findAllForUserEntity(PublicKeyCredentialUserEntity $publicKeyCredentialUserEntity): array
    {
        return User::with('authenticators')
            ->where('id', $publicKeyCredentialUserEntity->getId())
            ->first()
            ->authenticators
            ->toArray();
    }

    public function saveCredentialSource(PublicKeyCredentialSource $publicKeyCredentialSource): void
    {
        $user = User::where(
            'username',
            $publicKeyCredentialSource->getUserHandle()
        )->firstOrFail();

        $authenticator = Authenticator::where(
            'credential_id',
            base64_encode($publicKeyCredentialSource->getPublicKeyCredentialId())
        )->first();

        if ($authenticator) {
            // Update existing authenticator
            $authenticator->public_key = $publicKeyCredentialSource->jsonSerialize();
            $authenticator->last_used_at = now();
            $authenticator->save();

            return;
        }

        // Create new authenticator
        $deviceName = $publicKeyCredentialSource->getTransports()[0] ?? 'unknown';

        $user->authenticators()->save(new Authenticator([
            'name'          => $deviceName ?? '',
            'credential_id' => $publicKeyCredentialSource->getPublicKeyCredentialId(),
            'public_key'    => $publicKeyCredentialSource->jsonSerialize(),
            'last_used_at'  => now(),
        ]));
    }
}