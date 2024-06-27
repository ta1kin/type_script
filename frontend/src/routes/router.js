import { createRouter, createWebHashHistory } from 'vue-router';
import MainPage from '../pages/MainPage.vue';
import RegLog from '../pages/RegLog.vue';


const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/home', name: 'home' , component: MainPage, meta: { title: 'Главная' }, alias: '/' },
        { path: '/authorization', name: 'authorization', component: RegLog, meta: { title: 'Авторизация' } }
    ]
});

router.beforeEach( (to, from, next) => {
    document.title = to.meta.title || 'Ошибка!';
    next();
} )

export default router;