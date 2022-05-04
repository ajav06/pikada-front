import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Waiter from '@/views/Waiter.vue';
import Cashier from '@/views/Cashier.vue';
import Product from '@/views/Product.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/waiter',
    name: 'Waiter',
    component: Waiter,
  },
  {
    path: '/cashier',
    name: 'Cashier',
    component: Cashier,
  },
  {
    path: '/product',
    name: 'Product',
    component: Product,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
