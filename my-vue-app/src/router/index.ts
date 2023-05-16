import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import App from '@/App.vue'
import He from '@/components/HelloWorld.vue'
import Logoin from '@/components/Logoin.vue'
import bianji from '@/components/bianji.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: He,
        meta: {
            requiresAuth: true,
            roles: ['admin', 'user']
        }
    },
    {
        path: '/bianji',
        name: 'Bianji',
        component: bianji,
        meta: {
            requiresAuth: true,
            roles: ['admin',]
        }
    },
    {
        path: '/Login',
        name: 'Login',
        component: Logoin
    }
]

const admin = {
    name: 'admin',
    email: 'admin@admin.com',
    roles: ['admin']
}

const user = {
    name: 'user',
    email: 'user@user.com',
    roles: ['user']
}

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    console.log(to);
    // 判断当前路由是否需要鉴权
    if (to.meta.requiresAuth) {
        // 判断是否存在令牌
        const token = localStorage.getItem('token')
        if (token) {
            // 获取当前用户信息
            const currentUser = token === 'admin-token' ? admin : user
            // 判断当前用户是否具备访问该路由的权限
            if (to.meta.roles.includes(currentUser.roles[0])) {
                //to.meta.roles.includes(currentUser.roles[0]) 的意思是判断当前用户的角色是否在路由元信息（to.meta.roles）的角色列表中。
                next()
            } else {
                // 如果不具备权限，则跳转到 403 页面
                next({ path: '/Login', query: { redirect: to.fullPath } })
            }
        } else {
            // 如果不存在令牌，则跳转到登录页面，并携带重定向的路由信息
            next({ path: '/Login', query: { redirect: to.fullPath } })
        }
    } else {
        // 不需要鉴权的路由，直接放行
        next()
    }
})

export default router
