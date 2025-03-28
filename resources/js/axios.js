// axios
import axios from "axios";

const baseURL = "/";

export default axios.create({
    baseURL,

    // headers
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
    },
});
