import BaseConfig from "./base"

export function getHomeMultidata() {
    return BaseConfig({
        // url: "/home/multidata",
        url: "/home/data",
    })
}

export function getHomeGoods(type, page) {
    return BaseConfig({
        // url: "/home/data",
        url: "/home/good",
        params: {
            type,
            page
        }
    })
}