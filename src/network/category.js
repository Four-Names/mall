import BaseConfig from "./base"

export function getCategory() {
    return BaseConfig({
        url: '/category'
    })
}

export function getCategoryGoods(maitKey) {
    return BaseConfig({
        url: '/subcategory',
        params: {
            maitKey
        }
    })
}


export function getCategoryGoodsDetail(miniWallkey, type) {
    return BaseConfig({
        url: '/subcategory/detail',
        params: {
            miniWallkey,
            type
        }
    })
}

