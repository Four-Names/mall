import axios from "axios"

let BaseConfig = axios.create({
    baseURL: "http://112.74.76.116:5000",
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default BaseConfig;