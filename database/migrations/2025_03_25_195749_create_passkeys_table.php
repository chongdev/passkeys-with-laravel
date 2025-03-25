<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePasskeysTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('passkeys', function (Blueprint $table) {
            $table->id();

            // use a cascade on delete relationship
            $table->foreignIdFor(\App\Models\User::class)->constrained()->cascadeOnDelete();

            $table->text('name');
            $table->text('credential_id');
            $table->json('data');

            $table->timestamp('last_used_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('passkeys');
    }
}
