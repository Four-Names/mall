import BaseConfig from "./base"

export function userLogin(id) {
    return BaseConfig({
        url: "/login",

    })
}


export function userRegister() {
    return BaseConfig({
        url: "/register",
    })
}

export function sendEmail({
    username,
    email,
    type
}) {
    return BaseConfig({
        url: "/user/mailer",
        method: 'post',
        data: {
            username,
            email,
            type,
        },
        
    })
}