/**
 * Mock 模拟接口
 * data里的属性看不懂，需要详细看语法规范,博客链接:https://www.jianshu.com/p/4579f40e6108
 */ 

let Mock = require('mockjs');

/**
 *  测试
 */
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





