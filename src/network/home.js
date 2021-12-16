import BaseConfig from "./base"

export function getHomeData() {
    return BaseConfig({
        url: "/home/data",
    })
}

export function getHomeGoods(type, page) {
    return BaseConfig({
        url: "/home/good",
        params: {
            type,
            page
        }
    })
}