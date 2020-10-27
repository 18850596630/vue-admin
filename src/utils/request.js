import axios from 'axios';


//前端api地址 http://www.web-jshtml.cn/productApi

const BASEURL = process.env.NODE_ENV === "production" ? "111" : "/api";

const service = axios.create({
    baseURL: BASEURL,
    timeout: 1000,
});

service.interceptors.request.use(function(config) {
    return config;
}, function(error) {
    return Promise.reject(error);
});

service.interceptors.response.use(function(response) {
    return response;
}, function(error) {
    return Promise.reject(error);
});



export default service;