import BaseConfig from "./base"

export function getCategory() {
    return BaseConfig({
        // url: '/category'
        url: '/category'
    })
}

export function getCategoryGoods(maitKey) {
    return BaseConfig({
        // url: '/subcategory',

        url: '/category/detail',
        params: {
            maitKey
        },
    })
}


export function getCategoryGoodsDetail(miniWallkey, type) {
    return BaseConfig({
        // url: '/subcategory/detail',
        url: '/category/detail/good',
        params: {
            miniWallkey,
            type
        }
    })
}