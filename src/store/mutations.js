import Vue from "vue"
import {
    getGoodsState,
    updateGoodsState,

}
from "common/sessionStorage"
export default {
    //添加商店与商品
    addShop(state, goodInfo) {
        let {
            shopId,
            shop,
            goodId,
            good
        } = goodInfo
        if (state.shopList.hasOwnProperty(shopId)) {
            if (state.shopList[shopId]['goods'].hasOwnProperty(goodId)) {
                state.shopList[shopId]['goods'][goodId].count++
                Vue.set(state.shopList[shopId]['goods'][goodId], 'active', true)

            } else {
                Vue.set(good, 'count', 1)
                Vue.set(good, 'active', true)
                Vue.set(state.shopList[shopId]['goods'], goodId, good)
                state.shopList[shopId]['goodsSum']++
                    ++state.goodsNum;
            }
        } else {
            Vue.set(state.shopList, shopId, {})
            Vue.set(state.shopList[shopId], 'goods', {})
            Vue.set(good, 'count', 1)
            Vue.set(good, 'active', true)
            Vue.set(state.shopList[shopId]['goods'], goodId, good)
            Vue.set(state.shopList[shopId], 'shop', shop)
            Vue.set(state.shopList[shopId], 'id', shopId)
            Vue.set(state.shopList[shopId], 'goodsSum', 1)
            Vue.set(state.shopList[shopId], 'active', true)
            Vue.set(state.shopState, shopId, true)

                ++state.goodsNum;
            ++state.shopNum;
            state.shopName.push(shopId)
        }

    },
    //商品数量加1
    goodLess(state, target) {
        const {
            shopId,
            goodId
        } = target
        state.shopList[shopId]['goods'][goodId].count--
        Vue.set(state.shopList[shopId]['goods'][goodId], 'active', true)
    },
    //商品数量减1
    goodMore(state, target) {
        const {
            shopId,
            goodId
        } = target
        Vue.set(state.shopList[shopId]['goods'][goodId], 'active', true)
        state.shopList[shopId]['goods'][goodId].count++


    },
    //删除商品
    goodDelete(state, target) {
        const {
            shopId,
            goodId
        } = target
        if (state.shopList[shopId]['goodsSum'] == 1) {
            this.commit('shopDelete', shopId)
        } else {
            Vue.delete(state.shopList[shopId]['goods'], goodId)
                --state.shopList[shopId]['goodsSum']
        }
        --state.goodsNum;
    },
    //删除店铺
    shopDelete(state, shopId) {
        Vue.delete(state.shopList, shopId)
        state.shopName.splice(state.shopName.indexOf(shopId), 1)
        Vue.delete(state.shopState, shopId)
            --state.shopNum;
    },
    //全选店铺商品
    chooseAllGoods(state, shopId) {
        for (let good in state.shopList[shopId]['goods']) {
            Vue.set(state.shopList[shopId]['goods'][good], 'active', true)


        }
    },
    //不全选店铺商品
    noChooseGoods(state, shopId) {
        for (let good in state.shopList[shopId]['goods']) {
            Vue.set(state.shopList[shopId]['goods'][good], 'active', false)


        }
    },
    //全选所有店铺
    chooseAllShop(state) {
        for (let shop of state.shopName) {
            this.commit('chooseAllGoods', shop)
        }
    },
    //不全选所有店铺
    unChooseAllShop(state) {
        for (let shop of state.shopName) {
            this.commit('noChooseGoods', shop)
        }
    },
    //商品为选择状态
    chooseGood(state, target) {
        const {
            shopId,
            goodId
        } = target
        Vue.set(state.shopList[shopId]['goods'][goodId], 'active', true)
    },
    //商品为未选择状态
    noChooseGood(state, target) {
        const {
            shopId,
            goodId
        } = target
        Vue.set(state.shopList[shopId]['goods'][goodId], 'active', false)

    },

    //设置商品收藏状态
    goodCollected(state, target) {


        let {
            goodId
        } = target

        if (this.getters.goodIfCollected(goodId))
            return

        Vue.set(state.collectionList, goodId, {
            ...target
        })


    },
    //取消商品收藏状态
    goodUnCollect(state, goodId) {
        if (this.getters.goodIfCollected(goodId)) {
            Vue.delete(state.collectionList, goodId)
        }

    },

    //vuex数据改动时更新session
    syncToCartGoodList(state) {
        updateGoodsState({
            shopList: state.shopList,
            shopNum: state.shopNum,
            shopState: state.shopState,
            shopName: state.shopName,
            collectionList: state.collectionList,
            goodsNum: state.goodsNum,
            goodsMaxNum: state.goodsMaxNum,
        });
    },

    //刷新后同步与sessionStorage同步数据
    sync(state) {
        const data_CartGood = getGoodsState()
        if (JSON.stringify(data_CartGood) != '{}') {
            state.shopList = data_CartGood.shopList
            state.shopNum = data_CartGood.shopNum
            state.shopState = data_CartGood.shopState
            state.shopName = data_CartGood.shopName
            state.collectionList = data_CartGood.collectionList,
            state.goodsNum = data_CartGood.goodsNum
            state.goodsMaxNum = data_CartGood.goodsMaxNum
        }

    }
}