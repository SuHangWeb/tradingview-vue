# 请求


## 目录

```
│  ├─request			    请求
│  │   ├─api                接口目录 
│  │   │  └─index           中间件 
│  │   ├─mock               模拟数据 
│  │   │  ├─config          配置（开启/关闭 模拟数据）
│  │   │  └─index           数据列表 
│  │   ├─index              请求拦截器 
│  │   ├─jsencrypt          rsa加密 
│  │   └─index              状态码组合 
└─README.md                 说明文档 
```

### 接口请求 使用方法

> mian.js 全局引用

```
import http from "@/request/api";
Vue.prototype.$http = http;
```

> api 接口新增

```
//get
get: function() {
    return $http.get('/api/test');
}

//post
post: function(data) {
    return $http.post('/api/test', data);
}

//put
put: function(id) {
    return $http.put(`/api/address/${id}`);
}

//delete
delete: function(id) {
    return $http.delete(`/api/address/${id}`);
}
```


### mock 使用方法

1、先开启 `request/mock/config` 中的 isMock 变量 改成 true

2、需要在 `request/mock/index` 目录下创建模拟数据 接口地址需要与 `request/aip` 内的请求地址相同 案例如下

> api 接口案例：

```
 get: function() {
    return $http.get('/api/test');
}
```

> mock 模拟案例

```
Mock.mock('/api/test', {
    "msg":"成功",
    "code":1,
    "data":{
        "mtime": "@datetime",//随机生成日期时间
        "score|1-800": 800,//随机生成1-800的数字
        "rank|1-100":  100,//随机生成1-100的数字
        "stars|1-5": 5,//随机生成1-5的数字
        "nickname": "@cname",//随机生成中文名字
      }
});
```