import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/Home'),
        children: [
            {
                path: 'found',
                name: 'Found',
                component: () => import('@/views/found/Found'),
                children: [
                    {
                        path: 'recommend',
                        name: 'Recommend',
                        component: () => import('@/views/found/Recommend'),
                    }
                ]
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login')
    }
]

const router = new VueRouter({
    routes
})

export default router

