import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/login';
import Home from '@/views/home';
import Users from '@/views/users/users'
import Rights from '@/views/rights/rights'
// 在components文件中删除了helloworld.vue文件，此行代码可以删除了
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router);

export default new Router({
  routes: [
    { name : 'login', path : '/login',component : Login},
    { name : 'home', path : '/',component : Home, children : [
      { name : 'users', path : '/users', component : Users},
      { name: 'rights', path: '/rights', component: Rights }
    ]}
  ]
})
