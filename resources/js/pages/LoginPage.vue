<template>
    <div v-if="!isBrowserSupported">
        <div class="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
            <h2 class="text-xl font-bold text-center">Browser not supported</h2>
            <p class="mt-4 text-center">
                WebAuthn is not supported in this browser. Please use a modern
                browser like Chrome, Firefox, or Safari.
            </p>
        </div>
    </div>
    <div v-else class="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="submitLogin">
            <h2 class="text-xl font-bold text-center">Log In</h2>

            <div>
                <label
                    for="username"
                    class="block text-sm font-medium text-gray-700"
                >
                    Username
                </label>
                <div class="mt-1">
                    <input
                        v-model="username"
                        type="text"
                        id="username"
                        name="username"
                        required
                        class="block w-full px-3 py-2 text-base text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                    />
                </div>
            </div>
            <div>
                <button
                    type="submit"
                    class="mt-3 flex justify-center w-full px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                >
                    Login with a Passkey
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import {
    startAuthentication,
    browserSupportsWebAuthn,
    platformAuthenticatorIsAvailable,
} from "@simplewebauthn/browser";

export default {
    name: "LoginPage",

    data() {
        return {
            username: "",
            errors: {},

            isBrowserSupported: browserSupportsWebAuthn(),
        };
    },

    mounted() {
        if (!browserSupportsWebAuthn()) {
            alert("WebAuthn is not supported in this browser");
        }

        this.getUsernameInPasskeys();
    },

    methods: {
        async getUsernameInPasskeys() {
            if (await platformAuthenticatorIsAvailable()) {
                console.log("Platform authenticator is available");
            } else {
                console.log("Platform authenticator is not available");
            }
        },
        async submitLogin() {
            try {
                const response = await this.$http.post(
                    "/authentication/options",
                    {
                        username: this.username,
                    }
                );

                const options = response.data;
                if (!options.challenge) {
                    throw new Error("Invalid authentication options received");
                }

                const attResp = await startAuthentication(options);

                const verificationResponse = await this.$http.post(
                    "/authentication/verify",
                    attResp
                );

                if (verificationResponse.data?.verified) {
                    alert("Authentication successful");
                    return window.location.reload();
                }

                throw new Error("Authentication failed");
            } catch (error) {
                alert("Something went wrong verifying the authentication.");
                this.username = "";
            }
        },
    },
};
</script>
