import BaseConfig from "./base"

export function Login(data) {
    return BaseConfig({
        url: "/login",
        method: "post",
        data
    })
}