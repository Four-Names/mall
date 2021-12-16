export default {
    //是否已全选所有店铺
    ifAllShopChoosed(state, getters) {
        if (state.shopNum > 0) {
            for (let shopId of state.shopName) {
                if (!getters.ifShopActive(shopId))
                    return false
            }
            return true
        } else {
            return false
        }
    },

    //计算已选商品总数
    reCount(state) {
        let count = 0
        state.totalPrice = 0
        if (state.shopNum > 0) {
            for (let shopId of state.shopName) {
                for (let good in state.shopList[shopId]['goods'])
                    if (state.shopList[shopId]['goods'][good].active) {
                        count += state.shopList[shopId]['goods'][good].count
                        state.totalPrice += (
                            state.shopList[shopId]['goods'][good].count *
                            state.shopList[shopId]['goods'][good].price
                        )
                    }
            }
        }
        return count
    },
    //获取商品是否已选
    ifGoodActive: (state) => (target) => {
        const {
            shopId,
            goodId,
        } = target

        return state.shopList[shopId]['goods'][goodId].active
    },

    //获取店铺内商品是否已全选
    ifShopActive: (state) => (shopId) => {
        for (let good in state.shopList[shopId]['goods']) {
            if (!state.shopList[shopId]['goods'][good].active)
                return false
        }
        return true
    },

    //获取商品收藏状态
    goodIfCollected: (state) => (goodId) => {
        return state.collectionList.hasOwnProperty(goodId)
    },

    //获取购物车内是否有商品
    cartIsEmpty(state) {
        return state.shopNum == 0
    },


    //获取商品数量是否达到上限
    goodsIfFull(state) {
        return state.goodsNum == state.goodsMaxNum
    },

    //获取商品是否已存在于购物车
    goodIfInCart: (state) => (target) => {
        const {
            shopId,
            goodId,
        } = target
        if (state.shopList.hasOwnProperty(shopId)) {
            return state.shopList[shopId]['goods'].hasOwnProperty(goodId)
        }
        return false
    },


    //获取已收藏商品数量
    getCollectionNum(state) {
        return Object.keys(state.collectionList).length
    },

    //获取已浏览商品数
    getViewedNum(state) {
        return Object.keys(state.viewedList).length
    },

    //该商品是否已在浏览记录中
    goodIfViewed: (state) => (goodId) => {
        return Object.keys(state.viewedList).includes(goodId)
    },

    //店铺是否已有商品被选中
    goodSelected: (state) => (shopId) => {
        for (let good in state.shopList[shopId]['goods']) {
            if (state.shopList[shopId]['goods'][good].active)
                return true;
        }
        return false;
    },

    //获取已选商品信息
    getSelectedGood(state, getters) {
        let confirmList = {};
        for (let shopId in state.shopList) {
            if (getters.goodSelected(shopId)) {
                let shop = state.shopList[shopId];
                confirmList[shopId] = {
                    info: shop.shop
                };
                confirmList[shopId]['goods'] = {};
                for (let goodId in shop.goods) {
                    if (getters.ifGoodActive({
                            shopId,
                            goodId
                        })) {

                        let {
                            price,
                            title,
                            count,
                            cover,
                        } = shop.goods[goodId];

                        confirmList[shopId]['goods'][goodId] = {
                            goodId,
                            price,
                            title,
                            count,
                            cover,
                        }
                    }
                }
            }
        }
        return confirmList;
    },

    //获取是否已有默认地址
    hasAddress(state) {
        return state.address;
    },

    //获取商品数量
    goodCount: (state) => ({
        shopId,
        goodId
    }) => {
        return state.shopList[shopId].goods[goodId].count;
    },

    //获取用户信息
    userInfo(state) {
        return state.userInfo;
    }

}