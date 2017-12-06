import lodash from 'lodash';

class String {

}
interface String {
    hyphenToHump(): string,
    humpToHyphen(): string,
    Trim(): string
}

class Number {

}
interface Number {
    toPercent()
}

// 连字符转驼峰
String.prototype.hyphenToHump = function () {
    return this.replace(/-(\w)/g, (...args) => {
        return args[1].toUpperCase()
    })
}

// 驼峰转连字符
String.prototype.humpToHyphen = function () {
    return this.replace(/([A-Z])/g, '-$1').toLowerCase()
}

// 日期格式化
// 把时间戳转换为时间格式
const formatDate = (time) => {
    let now = new Date(Number(time));
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let date = now.getDate();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();
    return `${year}-${month}-${date} ${hour}:${minute}:${second}`;
}
const GetDateStr = (AddDayCount) => {
    const dd = new Date();
    if (AddDayCount === 10) {
        dd.setDate(dd.getDate()); // 获取AddDayCount天后的日期
    } else {
        dd.setDate(dd.getDate() + AddDayCount); // 获取AddDayCount天后的日期
    }

    const y = dd.getFullYear();
    const M = dd.getMonth() + 1; // 获取当前月份的日期
    const d = dd.getDate();
    const h = dd.getHours();
    const m = dd.getMinutes();
    if (AddDayCount == 0) {
        return y + "-" + M + "-" + d + " " + "00" + ":" + "00" + ":" + "00";
    } else if (AddDayCount == 10) {
        return y + "-" + M + "-" + d + " " + h + ":" + m + ":" + "00";
    } else {
        return y + "-" + M + "-" + d + " " + h + ":" + m + ":" + "00";
    }
}
const getNowFormatDate = () => {
    const date = new Date();
    const seperator1 = "-";
    const seperator2 = ":";
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    const currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
    return currentdate;
}
/**
 * @param   {String}
 * @return  {String}
 */
const queryURL = (name) => {
    let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
    let r = window.location.search.substr(1).match(reg)
    if (r != null) return decodeURI(r[2])
    return null
}

/**
 * 数组内查询
 * @param   {array}      array
 * @param   {String}    id
 * @param   {String}    keyAlias
 * @return  {Array}
 */
const queryArray = (array, key, keyAlias = 'key') => {
    if (!(array instanceof Array)) {
        return null
    }
    const item = array.filter(_ => _[keyAlias] === key)
    if (item.length) {
        return item[0]
    }
    return null
}
/***
 * 用于自动拼接URL参数
 * @param {String} url
 * @param {Object} params
 * @return {String} 
 * ***/
const setUrlParams = (url, parmas) => {
    let _str = "";
    for (let o in parmas) {
        if (parmas[o]) {
            _str += o + "=" + parmas[o] + "&";
        }
    }
    _str = _str.substring(0, _str.length - 1);
    return `${url}?${_str}`;
}
//判断数据是否属于某个数组
const aryContains = function (arr, obj) {
    let i = arr && arr.length ? arr.length : 0
    while (i--) {
        if (arr[i].resource_code === obj) {
            return true
        }
    }
    return false
}

const checkPercentageValue = function (value) {
    let reg = /^[0-9.%]{1,}$/;
    if (!reg.exec(value)) {
        message.error("输入百分数值！")
        return false
    }
    return true
}

// 把小数四舍五百保留2位转为百分数 return String
Number.prototype.toPercent = function () {
    return (Math.round(this * 10000) / 100).toFixed(2) + '%';
}

// 手机号验证
const VERIFY_PHONE_REG = /^[1][3,4,5,7,8][0-9]{9}$/;
// 6位手机验证码
const VERIFY_REG_CODE = /^[0-9]{6}$/;
// 身份证号码验证
const VERIFY_IDCARD_REG = /(^[1-9]\d{5}(19|20)\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/;
// 真实姓名验证
const VERIFY_TRUENAME_REG = /^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$/;
// 去掉空格
String.prototype.Trim = function () {
    return this.replace(/\s/g, "");
}

module.exports = {
    String,
    GetDateStr,
    getNowFormatDate,
    formatDate,
    queryURL,
    queryArray,
    setUrlParams,
    aryContains,
    checkPercentageValue,
    Number,
    VERIFY_PHONE_REG,
    VERIFY_REG_CODE,
    VERIFY_IDCARD_REG,
    VERIFY_TRUENAME_REG,
}