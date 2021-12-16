import BaseConfig from "./base"


export function searchGood(key, limit) {
    return BaseConfig({
        url: "/good/search",
        params: {
            key,
            limit
        }
    })
}