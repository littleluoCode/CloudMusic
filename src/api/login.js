// 登录接口
import { axios } from '../utils/request'

const loginApi = {
    cellphone: 'login/cellphone',
    code: 'captcha/sent'
}

export function phoneCodeLogin(params) {
    return axios({
        url: loginApi.cellphone,
        method: 'get',
        params: params
    })
}

// 获取验证码
export function getPhoneCode(params) {
    return axios({
        url: loginApi.code,
        method: 'get',
        params: params
    })
}

