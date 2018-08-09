import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/login';
// 在components文件中删除了helloworld.vue文件，此行代码可以删除了
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router);

export default new Router({
  routes: [
    { name : 'login', path : '/login',component : Login}
  ]
})
