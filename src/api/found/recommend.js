import { axios } from '@/utils/request'

// 个性推荐页面 api
const recommendApi = {
    banner: 'banner', // 轮播图
    playlist: 'personalized', // 推荐歌单
}

export function getBanner() {
    return axios({
        url: recommendApi.banner,
        method: 'get',
    })
}

export function getPlayList() {
    return axios({
        url: recommendApi.playlist,
        method: 'get',
        params: { limit: 9 }
    })
}
