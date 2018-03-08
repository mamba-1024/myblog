import { fetchFn } from '../../util/fetch';
import { request } from '../../util/request';

const api = 'http://localhost:3000/getArticle';
const Api = 'http://120.55.189.241:7830/xb-integration/api/v1/weekly/list'
const addApi = 'http://127.0.0.1:7001/news/add';
const testApi = 'http://127.0.0.1:7001/news';
const deleteAPI = 'http://127.0.0.1:7001/news/remove';
const SingleApi = 'http://127.0.0.1:7001/news/detail?id=';
const updateApi = 'http://127.0.0.1:7001/news/update';

const registAPI = 'http://127.0.0.1:7001/news/regist';
const loginAPI = 'http://127.0.0.1:7001/news/login'

export const getArticleList = (params) => {

    // return fetchFn(testApi, {}).then(data => data);
    return request({
        method: 'get',
        url: testApi,
        data: params,
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

export const deleteRecordApi = (params) => {
    return request({
        method: 'put',
        url: deleteAPI,
        data: params,
        headers: {}
    })
}

export const getArticleSingleApi = (params) => {
    return request({
        method: 'get',
        url: `${SingleApi}${params.id}`,
        data: params,
        headers: {}
    })
}

export const updateRecordApi =  (params) => {
    return request({
        method: 'put',
        url: updateApi,
        data: params,
        headers: {}
    })
}

export const registApi = (params)=>{
    return request({
        method: 'post',
        url: registAPI,
        data: params,
        headers: {}
    })
}

export const loginApi = (params)=>{
    return request({
        method: 'post',
        url: loginAPI,
        data: params,
        headers: {}
    })
}