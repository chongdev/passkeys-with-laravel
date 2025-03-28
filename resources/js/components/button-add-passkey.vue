<template>
    <button
        @click="submitRegister"
        class="bg-gray-100 flex items-center justify-center rounded-lg hover:bg-gray-200 px-3 py-2"
        type="button"
        v-if="isBrowserSupported"
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
            errors: {},
            isBrowserSupported: browserSupportsWebAuthn(),
        };
    },

    methods: {
        async submitRegister() {
            if (!this.username) {
                console.error("username is required");
                return;
            }
            // console.log("submitRegister....");

            // Prompt the user to create a passkey
            this.$http
                .post("/auth/registration/options", {
                    username: this.username,
                })
                .then((response) => startRegistration(response.data))
                // Verify the data with the server
                .then((attResp) =>
                    this.$http.post("/auth/registration/verify", attResp)
                )
                .then((verificationResponse) => {
                    console.log("verificationResponse", verificationResponse);
                })
                .catch((error) => {
                    console.error("error", error);
                });
        },
    },
};
</script>
