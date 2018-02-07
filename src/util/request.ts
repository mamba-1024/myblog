import axios from 'axios';
const _ = require('lodash');
import { message } from 'antd';
import { browserHistory } from 'react-router';

/**
 * 请求函数
 */
export const request = ({ method, url, data, headers }) => {
    //调用下面封装的fetch函数
    return fetch(method, url, data, headers).then((response) => {
        const { statusText, status } = response;
        let data = response.data;
        
        if (Number(status) == 200) {
            return {
                success: true,
                message: statusText,
                statusCode: status,
                data: data
            }
        } else {
            message.error(statusText)
        }

    }).catch((error) => {

        const { response } = error;

        let msg;
        let statusCode;

        if (response && response instanceof Object) {
            const { data, statusText } = response;
            statusCode = response.status;
            msg = data.msg || statusText;
            if (Number(statusCode) == 401) {
                msg = '登录过期，请重新登录...';
                sessionStorage.clear();
                message.error(msg, 1.5, () => {
                    browserHistory.push('login');
                })
            }
        } else {
            // 没有返回
            statusCode = 600;
            msg = error.msg || 'Network Error';
        }

        return { success: false, statusCode, message: msg }
    })
}

/**
 * 请求
 * url 请求地址
 * method get post put delete patch
 * data 进行
 */
const fetch = (method, url, data, headers) => {
    method = method || 'get';
    const cloneData = _.cloneDeep(data);

    axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
    /***
     * 设置请求token 
     * ***/
    // const AUTH_TOKEN = localStorage.getItem('token');

    // axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
    if (headers) {
        if (JSON.stringify(headers) !== "{}") {
            for (let key in headers) {
                axios.defaults.headers.common[key] = headers[key];
            }
        }
    }
    switch (method.toLowerCase()) {
        case 'get':
            return axios.get(url, {
                params: cloneData
            })
        case 'delete':
            return axios.delete(url, {
                data: cloneData
            })
        case 'post':
            return axios.post(url, cloneData)
        case 'put':
            return axios.put(url, cloneData)
        case 'patch':
            return axios.patch(url, cloneData)
    }
}
