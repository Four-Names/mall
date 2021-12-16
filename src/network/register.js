import BaseConfig from "./base"

export function validCode(code, email) {
    return BaseConfig({
        method: "post",
        url: "/register/validCode",
        data: {
            code,
            email
        }
    })
}


export function register(data) {
    return BaseConfig({
        url: "/register",
        method: "post",
        data
    })
}


export function sendCode(username, email) {
    return BaseConfig({
        url: "/register/mailer",
        params: {
            type: "注册",
            username,
            email
        },
    })
}


export function hasUser(username) {
    return BaseConfig({
        url: "/register/has_user",
        params: {
            username,
        },
    })
}



export function hasEmail(email) {
    return BaseConfig({
        url: "/register/has_email",
        params: {
            email
        },
    })
}