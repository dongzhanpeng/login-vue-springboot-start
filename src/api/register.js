import request from '@/utils/request'       //引入封装好的axios请求

export function register(username,emailoriphonenumber,password) {
    return request({
        url: 'admin/register',
        method: 'post',
        data: {
            //提交的数据
            username,
            emailoriphonenumber,
            password,
        }
    })
}