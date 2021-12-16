import Vue from "vue"
import VueRouter from "vue-router"
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(() => {})
}


Vue.use(VueRouter)

const routes = [{
        path: '',
        redirect: '/home'
    },

    {
        path: '/cart',
        name: 'Cart',
        component: () => import("views/cart/Cart"),
        children: [{
            path: 'confirm/:type',
            name: 'ConfirmOrder',
            component: () => import('views/cart/pay/ConfirmOrder'),
            meta: {
                requiresAuth: true
            },
        }]
    },
    {
        path: '/my',
        name: 'My',
        component: () => import("views/my/My"),

        children: [{
                path: 'viewed',
                name: 'Viewed',
                component: () => import("views/my/childCpn/MyViewed"),
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: 'collect',
                name: 'Collect',
                component: () => import("views/my/childCpn/MyCollect"),
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: 'order/:idx',
                name: 'Order',
                component: () => import("views/my/order/MyOrder"),
                meta: {
                    requiresAuth: true
                },

            },
            {
                path: 'order_detail',
                name: 'OrderDetail',
                component: () => import("views/my/order/OrderDetail"),
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: 'setting',
                name: 'Setting',
                component: () => import("views/my/setting/MySetting"),
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: 'address',
                name: 'Address',
                component: () => import("views/my/address/Address"),
                meta: {
                    requiresAuth: true
                },
                children: [{
                        path: 'edit',
                        name: 'EditAddress',
                        component: () => import("views/my/address/EditAddress"),
                        meta: {
                            requiresAuth: true
                        },
                    },
                    {
                        path: 'add',
                        name: 'AddAddress',
                        component: () => import("views/my/address/AddAddress"),
                        meta: {
                            requiresAuth: true
                        },
                    },

                ]
            }

        ],
        meta: {
            requiresAuth: true
        },
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import("views/home/Home")
    },
    {
        path: '/category',
        name: 'Category',
        component: () => import("views/category/Category")
    },
    {
        path: '/detail',
        name: 'Detail',
        component: () => import("views/detail/Detail")
    },

    {
        path: '/login',
        name: 'Login',
        component: () => import("views/user/Login"),
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import("views/user/Register"),
    },
    {
        path: '/search',
        name: 'SearchPage',
        component: () => import("views/search/SearchPage"),
    },
    {
        path: "*",
        redirect: '/home'
    }

]

const router = new VueRouter({
    mode: "history",
    routes,
})

router.beforeEach((to, from, next) => {
    //判断是否需要登录
    let token = localStorage.token;
    if (token && to.path == '/login') {
        next('/my')
    } else if (to.meta.requiresAuth && !token) {
        next('/login')
    } else {
        next()
    }
})

export default router