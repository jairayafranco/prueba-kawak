import { createRouter, createWebHistory } from 'vue-router';
import Calendar from '../views/Calendar.vue';
import List from '../views/List.vue';

const routes = [
    { path: '/', component: Calendar },
    { path: '/list', component: List },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;