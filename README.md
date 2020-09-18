# vue-cli 3.0 模版 vue2.0 & tradingview K线图

[![star](https://gitee.com/SuHangWeb/tradingview-vue/badge/star.svg?theme=dark)](https://gitee.com/SuHangWeb/tradingview-vue/stargazers)
---
## 移动端

<img src="https://gitee.com/SuHangWeb/uPic/raw/master/uPic/HnnCSp.png" width="260">
<img src="https://gitee.com/SuHangWeb/uPic/raw/master/uPic/QBMRz9.png" width="260">
<img src="https://gitee.com/SuHangWeb/uPic/raw/master/uPic/5fnOdH.png" width="260">

## PC端

![yhucSp](https://gitee.com/SuHangWeb/uPic/raw/master/uPic/yhucSp.png)

## 目录

```
┌─public
│  ├─static  			    静态文件
│  │   └─charting_library   sTradingview 组件主要文件
│  ├─favicon.ico  			icon图标
│  └─index.html             入口页面
├─src
│  ├─assets			        资源 存放一些不可变动的文件
│  │   ├─style              样式
│  │   │  └─common.scss     全局公用样式
│  │   ├─images             静态图片存放
│  │   └─font               字体
│  ├─common                 共用
│  │   ├─utils              小工具
│  │   │  ├─canvasFormat.js canvas转换文件工具
│  │   │  └─index.js        前端js工作集合
│  ├─components 	        组件目录
│  │   ├─sTradingview       tradingview K线图组件 （移动端）
│  │   ├─sTradingviewPc     tradingview K线图组件 （PC端）
│  │   └─index.js           配置页面无需注册自定义组件
│  ├─request			    请求
│  │   ├─api                接口目录
│  │   │  └─index           中间件
│  │   ├─mock               模拟数据
│  │   │  ├─config          配置（开启/关闭 模拟数据）
│  │   │  └─index           数据列表
│  │   ├─index              请求拦截器
│  │   ├─jsencrypt          rsa加密
│  │   ├─statusCode         状态码组合
│  │   └─README.md          说明文档
│  ├─router			        路由
│  │   └─index              路由配置&路由守卫
│  ├─store			        状态管理工具
│  ├─views			        页面
│  ├─App.vue			    根组件
│  └─main.js                入口js文件
├─vue.config.js             vue 配置 例如 跨域配置等
├─.env                      本地环境 请求地址配置
├─.env.development          测试环境 请求地址配置
├─.env.production           生产环境 请求地址配置
├─.gitignore                git禁止上传配置文件
├─babel.config.js           按需引入组件
├─package.json              依赖版本管理器
├─package-lock.json         锁定依赖版本管理器
├─yarn-lock.json            yarn依赖版本管理器
└─README.md                 说明文档
```

---

## 安装

> 关于旧版本
> Vue CLI 的包名称由 vue-cli 改成了 @vue/cli。 如果你已经全局安装了旧版本的 vue-cli (1.x 或 2.x)，你需要先通过 npm uninstall vue-cli -g 或 yarn global remove vue-cli 卸载它。

> Node 版本要求
> Vue CLI 需要 Node.js 8.9 或更高版本 (推荐 8.11.0+)。你可以使用 nvm 或 nvm-windows 在同一台电脑中管理多个 Node 版本。

> 安装命令

```
npm install -g @vue/cli
# OR
yarn global add @vue/cli
```

检查其版本是否正确 (3.x)：

```
vue --version
```

创建项目可以采用 图形化 创建 也可以采用命令创建 以下介绍 开启图形化创建界面 命令如下

```
vue ui
```

---

### 安装依赖

```
yarn install
# OR
npm install
```

### 启动

```
yarn serve
# OR
npm run serve
```

### 打包

```
yarn build  //本地环境打包
yarn build:dev  //测试环境打包
yarn build:pro  //开发环境打包
# OR
npm run build  //本地环境打包
npm run build:dev  //测试环境打包
npm run build:pro  //开发环境打包
```

---

### 接口请求

> 使用方法 看 `request/README.md`

---

### 工具集合调用

> 使用方法 看 `common/utils/README.md`

---

### 组件

> 所有组件使用方法 看 说明文档 `components/*/README.md`

---

### 如果运行项目 产生报错 `nprogress` 相关 解决办法如下

```
手动删除 `node_modules` 文件 并 重新下载依赖
# OR
命令：`rm -rf node_modules` 成功以后 重新下载依赖
```

---

