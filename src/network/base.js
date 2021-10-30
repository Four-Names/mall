import axios from "axios"
export default axios.create({
    baseURL: "http://152.136.185.210:7878/api/hy66",
    timeout: 5000
})