export {
    getUserInfo,
    updateUserData,
    getUserState,
    setUserState,
    loginIn,
    getToken,
    setUserInfo,
    getUserData,
    removeUserData
};



//同步vuex数据👇

//获取用户数据
function getUserData() {
    if (!localStorage.getItem('userInfo'))
        localStorage.setItem('userInfo', JSON.stringify({}))

    return JSON.parse(localStorage.getItem('userInfo'))

}

//更新用户数据
function updateUserData(target) {
    localStorage.setItem('userInfo', JSON.stringify(target))
}

//用户

//保存登录状态
function setUserState(state) {
    localStorage.setItem('isLogin', state)
}

//获取登录状态
function getUserState() {
    return localStorage.getItem('isLogin')
}


//保存token
function loginIn(token) {
    localStorage.setItem('token', token)
}

//取token
function getToken() {
    return localStorage.getItem('token')
}

//保存用户信息
function setUserInfo(info) {
    localStorage.setItem('user', JSON.stringify(info));
}

//获取用户信息

function getUserInfo() {
    return JSON.parse(localStorage.getItem('user'));
}

//删除数据
function removeUserData() {
    try {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        localStorage.removeItem('userInfo')
        return true;
    } catch (error) {
        return false;
    }
}