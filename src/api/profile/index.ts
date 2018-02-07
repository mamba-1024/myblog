import { fetchFn } from '../../util/fetch';
import { request } from '../../util/request';

const api = 'http://localhost:3000/getArticle';
const Api = 'http://120.55.189.241:7830/xb-integration/api/v1/weekly/list'
const addApi = 'http://127.0.0.1:7001/news/add';
const testApi = 'http://127.0.0.1:7001/news';

export const getArticleList = (params) => {

    // return fetchFn(testApi, {}).then(data => data);
    return request({
        method: 'get',
        url: testApi,
        data: {},
        headers: {}
    });
}
export const addArticleApi = (params) => {
    // return fetchFn(addApi, params).then(data => data);
    return request({
        method: 'post',
        url: addApi,
        data: params,
        headers: {}
    })
}

export const approveRejectAPI = (params) => {
    let data = {
        errcode: '0',
        errmsg: 'ok',
        msg: 'ok',
        status: 0,
        records: '123456'
    }
    return data
}
