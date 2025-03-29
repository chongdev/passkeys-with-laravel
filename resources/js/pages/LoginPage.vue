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

            <div>
                <label
                    for="username"
                    class="block text-sm font-medium text-gray-700"
                >
                    Username
                </label>

                <div>
                    <div class="relative mt-1 rounded-md shadow-sm">
                        <input
                            v-model="username"
                            type="text"
                            id="username"
                            name="username"
                            required
                            class="block w-full px-3 py-2 placeholder-gray-400 border rounded-md appearance-none focus:outline-none sm:text-sm"
                            :class="
                                errors.username
                                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                    : 'border-gray-300 focus:border-sky-500 focus:ring-sky-500'
                            "
                        />

                        <div
                            class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
                            v-if="errors.username"
                        >
                            <svg
                                class="w-5 h-5 text-red-500"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </div>
                    </div>

                    <p v-if="errors.username" class="text-red-500 text-sm mt-1">
                        {{ errors.username }}
                    </p>
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

        // this.getUsernameInPasskeys();
    },

    methods: {
        // async getUsernameInPasskeys() {
        //     if (await platformAuthenticatorIsAvailable()) {
        //         console.log("Platform authenticator is available");
        //     } else {
        //         console.log("Platform authenticator is not available");
        //     }
        // },
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

                // useBrowserAutofill
                const attResp = await startAuthentication(options);

                const verificationResponse = await this.$http.post(
                    "/authentication/verify",
                    attResp
                );

                if (verificationResponse.data?.verified) {
                    return window.location.reload();
                }

                throw new Error("Authentication failed");
            } catch (error) {
                // alert("Something went wrong verifying the authentication.");
                this.username = "";
                this.errors = {
                    username: error.message || "An error occurred",
                };
            }
        },
    },
};
</script>
