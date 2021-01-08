import Vue from 'vue' //???? Vue
import VueRouter from 'vue-router' //???? Vue ·??

Vue.use(VueRouter); //??????

export const constantRouterMap = [
    //登录界面
    {path: '/', component: () => import('@/views/login')},

    //登录成功界面
    {path: '/success', component: () => import('@/views/success')},

    //登录失败界面
    {path: '/error', component: () => import('@/views/error'), hidden: true},

    //忘记密码界面
    {path: '/forgetpassword', component: () => import('@/views/forgetpassword')},

    //短信找回
    {path: '/messagefind', component: () => import('@/views/messagefind')},

    //注册界面
    {path: '/register', component: () => import('@/views/register')},


]

export default new VueRouter({
    scrollBehavior: () => ({y: 0}),
    routes: constantRouterMap //???·???б?
})