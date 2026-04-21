import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Products from './views/Products.vue'
import Cart from './views/Cart.vue'
import Profile from './views/Profile.vue'

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/products', name: 'Products', component: Products },
    { path: '/cart', name: 'Cart', component: Cart },
    { path: '/profile', name: 'Profile', component: Profile }
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})