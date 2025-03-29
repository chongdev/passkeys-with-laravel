<template>
    <button
        @click="submitRegister"
        class="bg-gray-100 flex items-center justify-center rounded-lg hover:bg-gray-200 px-3 py-2"
        type="button"
        v-if="isBrowserSupported"
        :disabled="isLoading"
    >
        <span>{{ "Add a passkey" }}</span>
    </button>
</template>

<script>
import {
    startRegistration,
    browserSupportsWebAuthn,
} from "@simplewebauthn/browser";

export default {
    name: "ButtonAddPasskey",

    props: {
        username: {
            type: String,
            required: true,
        },
    },

    data() {
        return {
            isLoading: false,
            errors: {},
            isBrowserSupported: browserSupportsWebAuthn(),
        };
    },

    mounted() {
        if (!this.isBrowserSupported) {
            this.$emit("error", "WebAuthn is not supported in this browser.");
        }
    },

    methods: {
        async submitRegister() {
            this.isLoading = true;
            try {
                if (!this.username) {
                    throw new Error(
                        "Username is required for passkey registration."
                    );
                }

                const response = await this.$http.post(
                    "/auth/registration/options",
                    {
                        username: this.username,
                        userAgent: window.navigator.userAgent,
                    }
                );

                const options = response.data;

                // Start the registration process
                const attResp = await startRegistration({
                    ...options,
                    useAutoRegister: true,
                });

                // Verify the data with the server
                const verificationResponse = await this.$http.post(
                    "/auth/registration/verify",
                    attResp
                );

                if (verificationResponse.data?.verified) {
                    window.location.reload();
                } else {
                    // Passkey registration failed
                    throw new Error("Passkey registration failed.");
                }
            } catch {
                //console.error("Error during passkey registration:", error);
            } finally {
                this.isLoading = false;
            }
        },
    },
};
</script>
