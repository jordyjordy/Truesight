import Vue from 'vue'
import Router from 'vue-router'
//import Login from './components/Login'
import Home from './components/HelloWorld'
Vue.use(Router)

const routes = [
    {
        path: '/home',
        name: 'home',
        component: Home,
        meta: { requiresAuth: true}
    } ,
    { path: '/',
      name: 'login',
      component: () => import('./components/Login.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('./components/Register.vue')
    }
]

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
        console.log(to)
        if(localStorage.getItem("token") == null) {
            next({
                path: '/'
            })
        } else {
            next()
        }
    } else {
        if(localStorage.getItem("token") != null) {
            if(to.path === '/') {
                next({path:'/home'})
            }else{
                next()
            }
        }
        next()
    }
})

export default router