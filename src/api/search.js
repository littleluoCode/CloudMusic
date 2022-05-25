// 搜索接口
import { axios } from '../utils/request'

const userApi = {
    hotSearch: '/search/hot/detail',
    suggest: '/search/suggest',
    wantSearch: '/search/search',
    default: '/search/default',
}

// 热门搜索接口
export function hotSearch() {
    return axios({
        url: userApi.hotSearch,
        method: 'get'
    })
}

// 猜你想搜接口
export function wantSearch(params) {
    return axios({
        url: userApi.wantSearch,
        method: 'get',
        params: params
    })
}

// 搜索建议接口
export function searchSuggest(params) {
    return axios({
        url: userApi.suggest,
        method: 'get',
        params: params
    })
}

// 默认搜索关键词
export function getDefaultKeyWord() {
    return axios({
        url: userApi.default,
        method: 'get',
    })
}