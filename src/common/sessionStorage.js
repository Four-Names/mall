export {
    goodIfInHistory,
    goodInHistory,
    clearGoodHistory,
    getGoodsState,
    updateGoodsState,
    getHistoryObj,
    getHistoryListLength,
    removeGoodsInHistory,
};


//历史记录数据👇
    
    
//添加浏览记录
function goodInHistory(target) {
    const {
        goodId,
        info
    } = target

    const historyObj = getHistoryObj()
    historyObj[goodId] = info
    updateHistoryObj(historyObj)

}

//清空浏览记录
function clearGoodHistory() {

}

//获取浏览记录对象
function getHistoryObj() {
    if (!JSON.parse(sessionStorage.getItem('goodsHistory'))) {

        sessionStorage.setItem('goodsHistory', JSON.stringify({}))
    }

    return JSON.parse(sessionStorage.getItem('goodsHistory'))
}

//获取历史已浏览商品数量
function getHistoryListLength() {
    return Object.keys(getHistoryObj()).length
}

//删除指定的商品记录
function removeGoodsInHistory(goods)
{
    let historyObj = getHistoryObj()

    goods.forEach(goodId => {
        delete historyObj[goodId]
    });
    updateHistoryObj(historyObj)
}

//更新浏览记录
function updateHistoryObj(obj) {
    sessionStorage.setItem('goodsHistory', JSON.stringify(obj))
}

//商品是否已在浏览记录中
function goodIfInHistory(goodId) {
    const historyObj = getHistoryObj()
    return historyObj.hasOwnProperty(goodId)
}



//同步vuex数据👇

//获取商品状态
function getGoodsState() {
    if (!sessionStorage.getItem('GoodsState'))
        sessionStorage.setItem('GoodsState', JSON.stringify({}))

    return JSON.parse(sessionStorage.getItem('GoodsState'))

}

//更新商品状态
function updateGoodsState(target) {
    sessionStorage.setItem('GoodsState', JSON.stringify(target))
}