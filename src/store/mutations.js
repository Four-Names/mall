import Vue from "vue"
import {
    getUserData,
    updateUserData,
    setUserState,
    getUserState,
    removeUserData
}
from "common/localStorage"

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


    //加入浏览记录
    addGoodViewed(state, target) {

        let {
            goodId,
            info
        } = target

        if (this.getters.goodIfViewed(goodId))
            return
        Vue.set(state.viewedList, goodId, info)

    },
    //删除浏览记录
    deleteViewedData(state, goodId) {
        if (this.getters.goodIfViewed(goodId)) {
            Vue.delete(state.viewedList, goodId)
        }
    },



    //vuex数据改动时更新localStorage数据
    syncToCartGoodList(state) {
        updateUserData({
            shopList: state.shopList,
            shopNum: state.shopNum,
            shopState: state.shopState,
            shopName: state.shopName,
            collectionList: state.collectionList,
            goodsNum: state.goodsNum,
            goodsMaxNum: state.goodsMaxNum,
            viewedList: state.viewedList
        })
        setUserState(state.isLogin)
    },

    //刷新后vuex同步localStorage数据
    sync(state) {
        const userInfo = getUserData()
        if (JSON.stringify(userInfo) != '{}') {
            state.shopList = userInfo.shopList
            state.shopNum = userInfo.shopNum
            state.shopState = userInfo.shopState
            state.shopName = userInfo.shopName
            state.collectionList = userInfo.collectionList,
                state.goodsNum = userInfo.goodsNum
            state.goodsMaxNum = userInfo.goodsMaxNum
            state.viewedList = userInfo.viewedList
        }
        state.isLogin = getUserState();
    },

    //设置登录状态
    setLogin(state, status) {
        console.log('setLogin', status);
        state.isLogin = status;
    },

    //同步购物车数据
    syncCart(state, data) {
        let shopId = data.id;
        Vue.set(state.shopList, shopId, {})
        Vue.set(state.shopList[shopId], 'goodsSum', data.goodsSum)
        Vue.set(state.shopList[shopId], 'active', data.active)
        Vue.set(state.shopList[shopId], 'goods', {})
        Vue.set(state.shopList[shopId], 'id', shopId)
        Vue.set(state.shopList[shopId], 'shop', data.shop)

        Vue.set(state.shopState, shopId, true)

        let goods = data.goods;
        for (let good in goods) {
            Vue.set(state.shopList[shopId]['goods'], good, goods[good])
        }
        state.goodsNum += data.goodsSum
        state.shopNum++;
        state.shopName.push(shopId)

    },

    //同步收藏数据
    syncCollection(state, data) {
        let {
            goodId
        } = data;
        Vue.set(state.collectionList, goodId, data)
    },

    //同步浏览记录
    syncViewed(state, data) {
        let {
            goodId
        } = data;
        Vue.set(state.viewedList, goodId, data)
    },

    //退出登录
    logout(state) {
        Vue.set(state, "shopList", {})
        Vue.set(state, "shopNum", 0)
        Vue.set(state, "shopState", {})
        Vue.set(state, "shopName", [])
        Vue.set(state, "totalPrice", 0)
        Vue.set(state, "collectionList", {})
        Vue.set(state, "viewedList", {})
        Vue.set(state, "goodsNum", 0)
        Vue.set(state, "goodsMaxNum", 99)
        Vue.set(state, "isLogin", false)
        removeUserData()
    }

}