import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';


const routes = [{
        path: '/',
        name: 'home',
        component:  () =>
        import ('../views/Home.vue'),
        meta: {
            name: "home",
            title: "2.0模版",
            requireLogin: true
        }
    },
    {
        path: '/test',
        name: 'test',
        component: () =>
        import ('../views/Test.vue'),
        meta: {
            name: "test",
            title: "2.0模版",
            requireLogin: false
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
        import ('../views/Login.vue'),
        meta: {
            name: "login",
            title: "2.0模版",
            requireLogin: false
        }
    }
]

const router = new VueRouter({
    // mode: 'history',
    // base: process.env.BASE_URL, //默认值: "/" , 应用的基路径。例如，如果整个单页应用服务在 /app/ 下，然后 base 就应该设为 "/app/" https://router.vuejs.org/zh/api/#base
    routes
})

//路由守卫
// router.beforeEach((to, from, next) => {
//      // 进度条
//      NProgress.start() // 显示进度条
//      NProgress.set(0.4) // 设置百分比
//      NProgress.inc() // 稍微增加

//     if (to.matched.some(record => record.meta.requireLogin)) {
//         if (!to.meta.requireLogin) {
//             next();
//         } else {
//             let token = localStorage.getItem('token');
//             if (!token) {
//                 next({ path: '/login', query: { redirect: to.fullPath } });
//             } else {
//                 next();
//             }
//         }
//     } else {
//         next()
//     }
   
// })
// router.afterEach(() => {
//     NProgress.done();//完成进度(进度条消失)
// });

export default router