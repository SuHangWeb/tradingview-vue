# sTradingview 区块链 K线图（tradingview）

---

![HnnCSp](https://gitee.com/SuHangWeb/uPic/raw/master/uPic/HnnCSp.png)

## 目录

```
┌─config                    配置目录
│   ├─index.js              中间件
│   ├─disabled_features.js  面板上禁用的功能
│   ├─enabled_features.js   启用的功能
│   ├─overrides.js          主要配置
│   ├─loading_screen.js     设置初始化加载条样式
│   └─studies_overrides.js  柱状图颜色
├─mixin                     混入抽离
│   └─webSocket.js          抽离webSocket方法
├─sTradingview.vue          视图组件
└─README.md                 说明文档
```

## 主要文件(根目录)

- public/static/charting_library
- src/common/tradingview

# 使用方法

```
 <s-tradingview wsUrl="ws://api.bhcoin.club/getContractKline" dom-id="one" class="tradingviewView" />
```

参数

| 名称  | 是否必须 | 说明 | 格式 | 默认 |
| ------ | ---- | ---- | ---- | ---- |
| wsUrl | 是  |  webSocket 请求地址 （也可以直接写死在子组件内） |  String | - |
| dom-id | 否  | 如果一个页面调用多个 需要写不同的id值  |  String | - |