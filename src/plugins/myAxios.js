import axios from 'axios';
const MyAxios = {};
MyAxios.install = function (Vue) {
  // 给vue实例添加一个成员 $http
  Vue.prototype.$http = axios;
  // 1. 添加全局方法或属性
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/';
  // 设置请求拦截器，查axios官网
  // 有请求之前必须判断是否携带token（登录请求除外）利用axios的拦截器，登录后给所有请求之前加上token，判断用户的登录状态
  axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    console.log(config)
    if (config.url.toLocaleLowerCase() !== 'login') {
      // 设置请求头
      const token = sessionStorage.getItem('token');
      config.headers.Authorization = token;
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
}

export default MyAxios;
