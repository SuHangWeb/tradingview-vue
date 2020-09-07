import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';

//移动端调试器  需要使用 直接解开注释
// import Vconsole from 'vconsole'
// const vConsole = new Vconsole()
// Vue.use(vConsole)

// 请求
import http from "@/request/api";
Vue.prototype.$http = http;
//mock数据模拟
import '@/request/mock';
//移动端适配
import 'lib-flexible';
// vant按需引入 & 无需在页面中注册组件 
import { Tab, Tabs, Loading } from 'vant';
Vue.use(Tab).use(Tabs).use(Loading);
//自定义组件无需注册组件
import '@/components/index.js';
// 去除谷歌浏览器 “passive” 警告
// import 'default-passive-events';
//阻止启动生产消息，常用作指令
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
