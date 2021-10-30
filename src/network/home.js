import BaseConfig from "./base"

export function getHomeMultidata() {
    return BaseConfig({
        url: "/home/multidata",
    })
}

export function getHomeGoods(type,page) {
    return BaseConfig({
        url: "/home/data",
        params:{
            type,
            page
        }
    })
}
