import BaseConfig from "./base"



//同步未登录前的购物车数据
export function updateCart(data) {
    return BaseConfig({
        url: "/user/update_cart",
        method: 'post',
        data
    })
}

//获取用户购物车数据
export function getUserCart() {
    return BaseConfig({
        url: "/user/cart",
    })
}

//获取用户收藏数据
export function getUserCollection() {
    return BaseConfig({
        url: "/user/collection"
    })
}

//获取用户浏览记录
export function getUserViewed() {
    return BaseConfig({
        url: "/user/viewed"
    })
}

//获取订单详情
export function getOrderDetail(i) {
    return BaseConfig({
        url: "/order",
        params: {
            i
        }
    })
}

//更新订单
export function updateOrder(data) {
    return BaseConfig({
        url: "/order/update",
        method: "post",
        data,
    })
}

//获取收货地址
export function getAddress() {
    return BaseConfig({
        url: "/user/address",
    })
}

//添加收货地址
export function addAddress(data) {
    return BaseConfig({
        url: "/user/add_address",
        method: "post",
        data
    })
}


//选择收货地址
export function selectAddress(i) {
    return BaseConfig({
        url: "/user/one_address",
        params: {
            i
        }
    })
}


//更新收货地址
export function updateAddress(data) {
    return BaseConfig({
        url: "/user/update_address",
        method: "post",
        data
    })
}


//获取已取消订单
export function canceledOrder() {
    return BaseConfig({
        url: "/order/canceled",
    })
}



//获取已完成订单
export function completedOrder() {
    return BaseConfig({
        url: "/order/completed",
    })
}


//取消订单
export function cancelOrder(data) {
    return BaseConfig({
        url: "/order/cancel",
        method: "post",
        data
    })
}


//支付订单
export function PayOrder(data) {
    return BaseConfig({
        url: "/order/payed",
        method: "post",
        data
    })
}

//获取未支付订单
export function unpayOrder() {
    return BaseConfig({
        url: "/order/unpay",
    })
}

//订单已收货
export function receiveOrder(data) {
    return BaseConfig({
        url: "/order/received",
        method: "post",
        data
    })
}


//获取未收货订单
export function untakeOrder() {
    return BaseConfig({
        url: "/order/untake",
    })
}


//重命名用户名
export function rename(data) {
    return BaseConfig({
        url: "/user/set_nickname",
        method: "post",
        data
    })
}

//是否已设置支付密码
export function hasPayPwd() {
    return BaseConfig({
        url: "/user/has_pay_pwd",
        method: "post",
    })
}


//密码是否正确
export function isValidPwd(data) {
    return BaseConfig({
        url: "/user/valid_pwd",
        method: "post",
        data
    })
}


//更新密码
export function updatePwd(data) {
    return BaseConfig({
        url: "/user/update_pwd",
        method: "post",
        data
    })
}

//支付密码是否正确
export function validPayPwd(data) {
    return BaseConfig({
        url: "/user/valid_pay_pwd",
        method: "post",
        data
    })
}


//设置支付密码
export function setPayPwd(data) {
    return BaseConfig({
        url: "/user/set_pay_pwd",
        method: "post",
        data
    })
}


//同步购物车
export function syncCart(data) {
    return BaseConfig({
        url: "/user/sync_cart",
        method: "post",
        data
    })
}


//更新收藏 
export function updateCollection(data) {
    return BaseConfig({
        url: "/user/update_collection",
        method: "post",
        data
    })
}

//更新历史浏览
export function updateViewed(data) {
    return BaseConfig({
        url: "/user/update_viewed",
        method: "post",
        data
    })
}

//删除用户地址
export function deleteAddress(data) {
    return BaseConfig({
        url: "/user/delete_address",
        method: "post",
        data
    })
}