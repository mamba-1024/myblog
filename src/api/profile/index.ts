import { fetchFn } from '../../util/fetch';
import { request } from '../../util/request';

let API;
let dev_api = 'http://192.168.4.177:7001';
let prod_api = 'http://120.27.11.104:7001';

if(process.env.NODE_ENV==='development'){
    console.log('dev');
    API = prod_api;
}else if(process.env.NODE_ENV==='production'){
    console.log('prod');
    API = prod_api;
}

const addApi = `${API}/news/add`;
const searchApi = `${API}/news`;
const deleteAPI = `${API}/news/remove`;
const SingleApi = `${API}/news/detail?id=`;
const updateApi = `${API}/news/update`;

const registAPI = `${API}/news/regist`;
const loginAPI = `${API}/news/login`;

export const getArticleList = (params) => {

    // return fetchFn(searchApi, {}).then(data => data);
    return request({
        method: 'get',
        url: searchApi,
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