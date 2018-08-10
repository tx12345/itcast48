import axios from 'axios';
const MyAxios = {};
MyAxios.install = function (Vue) {
  // 给vue实例添加一个成员 $http
  Vue.prototype.$http = axios;
  // 1. 添加全局方法或属性
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/';
}

export default MyAxios;
