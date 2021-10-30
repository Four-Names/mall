import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const routes = [{
        path: '',
        redirect: '/home'
    },
    {
        path: '/cart',
        name: 'Cart',
        component: () => import("views/cart/Cart")
    },
    {
        path: '/mine',
        name: 'Mine',
        component: () => import("views/mine/Mine")
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
        path: '/history',
        name: 'History',
        component: () => import("views/history/History")
    },
    {
        path: '/collect',
        name: 'Collect',
        component: () => import("views/collect/Collect")
    },

]

const router = new VueRouter({
    mode: "history",
    routes,
})

export default router