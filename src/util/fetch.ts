import 'whatwg-fetch';
import { enCodeChar } from './encodechar';
import {
    message,
} from 'antd';
import * as _ from 'lodash';

/**
 * fetchFn 对window.fetch的封装，方面统一管理
 * @param url {String<URL>} 请求地址 
 * @param data {Object<JSON>} 请求参数
 * @param option {Object<JSON>} 额外的fetch可配置参数
 */
export const fetchFn =  (url, data, option?:any) => {
    let json:any = {
        method: 'get',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*/*'
        },
        body: data,
    };
    if(option) {
        _.assign(json, option)
    }
    return fetch(url, json).then(res => res.json()).then(data => {
        return data;
    }).catch((error) => {
        let msg;
        debugger;
        switch(error.toString()) {
            case 'TypeError: Failed to fetch' :
                msg = '请求失败';
                break;
            default: 
                msg = '请求失败'; 
        }
        message.error(msg);
        return { status: 1,  msg,};
    });
}


