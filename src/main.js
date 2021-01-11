import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router' //引入路由配置
import i18n from './lang'
import store from './store'   //引入VUEX状态管理
import './icons' // icon
import './views/login'
Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    router, //使用路由配置
    i18n,
    store,  //使用VUEX进行状态管理
}).$mount('#app')