import axios from 'axios';
import mockConfig from './mock/config';//mock模拟器配置
// import statusCode from './statusCode';

const $http = axios.create({
    baseURL: mockConfig ? '' : process.env.VUE_APP_URL,
    timeout: 1000 * 12
});
// 设置post请求头
$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 请求前拦截器
$http.interceptors.request.use(
    config => {
        // console.log('请求前loading...')
        config.headers = {
            'Authorization': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        };
        return config;
    },
    error => {
        //请求错误时做些事
        return Promise.reject(error);
    }
);

// 请求后拦截
$http.interceptors.response.use(
    response => {
        if (response.status != 200) {
           console.log('啊偶！断网了...')
        }
        //去请求状态码
        // statusCode(response.data.code, response.data.msg, response);
        // console.log('请求结束 关闭loading')
        return response.data;
    },
    error => {
        // console.log('请求结束 关闭loading!')
        console.log('服务出现错误，请稍后再试!')
    }
);

export default $http;