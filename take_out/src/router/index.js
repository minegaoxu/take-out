// 引入vue
import Vue from 'vue'
// 引入VueRouter
import VueRouter from 'vue-router'
// 引入页面
import Home from '../pages/Home.vue'
import Eval from '../pages/home/Eval.vue'
// 使用router
Vue.use(VueRouter)

const router = new VueRouter({
    base: process.env.BASE_URL,
    routes: [{
        path: '/',
        name: 'home',
        component: Home,
        // 子路由
        children: [
            {
                path: '/home/eval',
                name: '/home/eval',
                // 懒加载
                component:Eval,
            },
            {
                path: '/home/goods',
                name: '/home/goods',
                // 懒加载
                component: () => import('../pages/home/Goods.vue'),
            },
            {
                path: '/home/shops',
                name: '/home/shops',
                // 懒加载
                component: () => import('../pages/home/Shops.vue'),
            }
        ],redirect:'/home/eval'
    }]
})
export default router