import {login} from '@/api/login'//引入登录 api 接口
import {getCaptcha} from '@/api/getCaptcha';    //引入忘记密码接口
import {register} from '@/api/register'     //引入注册接口

const user = {
    actions: {
        // 登录
        Login({commit}, userInfo) { //定义 Login 方法，在组件中使用 this.$store.dispatch("Login") 调用
            const username = userInfo.username.trim()
            return new Promise((resolve, reject) => { //封装一个 Promise
                login(username, userInfo.password).then(response => { //使用 login 接口进行网络请求
                    commit('') //提交一个 mutation，通知状态改变
                    resolve(response) //将结果封装进 Promise
                }).catch(error => {
                    reject(error)
                })
            })
        },
        //获取验证码
        GetCaptcha({commit}, userInfo){
            const email = userInfo.email.trim()
            return new Promise((resolve, reject) => { //封装一个 Promise
                getCaptcha(email).then(response => { //使用 login 接口进行网络请求
                    commit('') //提交一个 mutation，通知状态改变
                    resolve(response) //将结果封装进 Promise
                }).catch(error => {
                    reject(error)
                })
            })
        },
        //注册
        Register({commit}, userInfo){
            const username = userInfo.username.trim()
            const emailoriphonenumber = userInfo.emailoriphonenumber.trim()
            const password = userInfo.confirmpassword.trim()
            return new Promise((resolve, reject) => { //封装一个 Promise
                register(username,emailoriphonenumber,password).then(response => { //使用 register 接口进行网络请求
                    commit('') //提交一个 mutation，通知状态改变
                    resolve(response) //将结果封装进 Promise
                }).catch(error => {
                    reject(error)
                })
            })
        },
    }
}
export default user