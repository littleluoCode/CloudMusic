import axios from 'axios'
import showStatus from './errorHandler';
import { BASE_URL, TIMEOUT } from "./config";

const service = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT, // 请求超时uploadBuildExcel
    responseType: 'json',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
})

// 请求拦截器
service.interceptors.request.use((config) => {
    // 让每个请求携带自定义 token
    config.headers['Authorization'] = 'token'
    return config
}, (error) => {
    // 错误抛到业务代码
    error.data = {}
    error.data.msg = '服务器异常，请联系管理员！'
    return Promise.resolve(error)
})

// 响应拦截器
service.interceptors.response.use((response) => {
    const status = response.status
    let msg = ''
    if (status < 200 || status >= 300) {
        // 处理http错误，抛到业务代码
        msg = showStatus(status)
        if (typeof response.data === 'string') {
            response.data = { msg }
        } else {
            response.data.msg = msg
        }
        //拦截异常（通知）
        Notification({
            title: '提示',
            message: msg,
            type: 'error'
        })
    }
    return response
}, (error) => {
    // 错误抛到业务代码
    error.data = {}
    error.data.msg = '请求超时或服务器异常，请检查网络或联系管理员！'
    return Promise.resolve(error)
})



export { service as axios }