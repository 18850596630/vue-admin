import axios from 'axios';
import { Message } from 'element-ui';


//前端api地址 http://www.web-jshtml.cn/productApi

const BASEURL = process.env.NODE_ENV === "production" ? "" : "/api";

const service = axios.create({
    baseURL: BASEURL,
    timeout: 1000,
});
//添加请求拦截器
/**
 * 请求接口前 做一些数据处理
 */
service.interceptors.request.use(function(config) {
    //请求之前  做些什么
    //后台需要前端 传相关参数
    config.headers['token'] = '121212';
    return config;
}, function(error) {
    return Promise.reject(error);
});


//添加响应拦截器
service.interceptors.response.use(function(response) {
    //对响应数据做点什么
    let data = response.data;
    if (data.resCode !== 0) {
        Message.error(data.message);
        return Promise.reject(data);
    } else {
        return response;
    }
    console.log(response);
}, function(error) {
    return Promise.reject(error);
});
export default service;