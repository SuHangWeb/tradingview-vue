# 前端js工作集合

## 使用方法

### 全局调用 main文件

```
import * as utils from './common/index';
Vue.prototype.$utils = utils;
```

### 单页面调用

```
//根据自己配置的路径 和 所需要的工具调用
import {getFloatStr,substring} from './utils/index'
```

### 调用名称

 > 找到集合中所需 查看参数说明

 * 整数添加小数点后两位 getFloatStr
 * 取数字后几位  substring
 * 控制 输入浮点数限制  noFixed
 * 检查是否有这个字符  indexOf
 * 截取参数  getQueryString
 * 处理文字 多余省略  txtHandle
 * 添加千位分隔符  milliFormat
 * 验证判断类型集合 checkStr
 * 严格的身份证校验 isCardID
 * 判断邮箱 isEmail
 * 判断手机号码 isMobile
 * 判断电话号码 isPhone
 * 是否url地址 isURL
 * 是否是字符串 isString
 * 是否是数字  isNumber
 * 是否是布尔值  isBoolean
 * 是否是函数  isFunction
 * 是否为null  isNull
 * 是否为undefined isFunction
 * 是否对象  isObj
 * 是否数组  isArray
 * 是否时间  isDate
 * 是否正则  isRegExp
 * 是否错误对象  isError
 * 是否Symbol函数  isSymbol
 * 是否Promise对象  isPromise
 * 是否Set对象  isSet
 * 是否是微信浏览器  isWeiXin
 * 是否是移动端  isDeviceMobile
 * 是否是QQ浏览器  isQQBrowser
 * 是否是爬虫  isSpider
 * 是否ios  isIos
 * 是否为PC端  isPC
 * 去除html标签 removeHtmltag
 * 追加url参数 appendQuery
 * 动态引入js  injectScript
 * 根据url地址下载 download
 * el是否包含某个class  hasClass
 * el添加某个class  addClass
 * el去除某个class  removeClass
 * 获取滚动的坐标  getScrollPosition
 * 滚动到顶部  scrollToTop
 * el是否在视口范围内  elementIsVisibleInViewport
 * 洗牌算法随机  shuffle
 * 劫持粘贴板  copyTextToClipboard
 * 随机数范围  random
 * 将阿拉伯数字翻译成中文的大写数字  numberToChinese
 * 将数字转换为大写金额  changeToChinese
 * 判断一个元素是否在数组中  contains
 * 数组排序 sort
 * 去重 unique
 * 求两个集合的并集（合并两个数组）  union
 * 求两个集合的交集  intersect
 * 删除数组其中一个元素  remove
 * 将类数组转换为数组  formArray
 * 数组最大值  max
 * 数组最小值  min
 * 数组求和  sum
 * 数组平均值  average
 * 去除空格  trim
 * 字符串各种类型大小写转换  changeCase
 * 检测密码强度  checkPwd
 * 函数截流器  debouncer
 * 在字符串中插入新字符串  insertStr
 * 判断两个对象是否键值相同  isObjectEqual
 * 16进制颜色转RGBRGBA字符串  colorToRGB