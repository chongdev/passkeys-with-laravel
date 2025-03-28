import Vue from "vue";
import axios from "./axios.js";

Vue.prototype.$http = axios;
new Vue({
    components: {
        loginPage: () => import("./pages/LoginPage.vue"),
        buttonAddPasskey: () => import("./components/button-add-passkey.vue"),
    },
}).$mount("#app");
