import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: ()=>import('../views/HomeView.vue')
        },
       
        {
            path: '/articlecreate',
            name: 'articlecreate',
            component: () => import('../views/ArticleCreate.vue')
        }
        ,
        {
            path: '/article/:id',
            name: 'article',
            props: true,
            component: () => import('../views/ArticleContentView.vue')
        }
    ]
})

export default router
