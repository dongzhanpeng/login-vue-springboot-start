import request from '@/utils/request'       //引入封装好的axios请求

export function getCaptcha(email) {    //获取邮箱验证码接口
    return request({
        url: 'admin/getCaptcha',
        method: 'post',
        data: {
            //提交的数据
            email
        }
    })
}