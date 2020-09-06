# sTradingview 区块链 K线图（tradingview）

[![star](https://gitee.com/SuHangWeb/tradingview-vue/badge/star.svg?theme=dark)](https://gitee.com/SuHangWeb/tradingview-vue/stargazers)
---

<img src="https://gitee.com/SuHangWeb/uPic/raw/master/uPic/HnnCSp.png" width="260">
<img src="https://gitee.com/SuHangWeb/uPic/raw/master/uPic/QBMRz9.png" width="260">
<img src="https://gitee.com/SuHangWeb/uPic/raw/master/uPic/5fnOdH.png" width="260">

## 目录

```
┌─config                    配置目录
│   ├─index.js              中间件
│   ├─disabled_features.js  面板上禁用的功能
│   ├─enabled_features.js   启用的功能
│   ├─overrides.js          主要配置
│   ├─loading_screen.js     设置初始化加载条样式
│   ├─studies_overrides.js  柱状图颜色
│   └─tabs.js               切换配置
├─mixin                     混入抽离
│   └─webSocket.js          抽离webSocket方法
├─static                    主要静态文件
├─sTradingview.vue          视图组件
└─README.md                 说明文档
```

# 使用方法

```
 <s-tradingview wsUrl="ws://xxxx" dom-id="one" class="tradingviewView" />
```

参数

| 名称  | 是否必须 | 说明 | 格式 | 默认 |
| ------ | ---- | ---- | ---- | ---- |
| wsUrl | 是  |  webSocket 请求地址 （也可以直接写死在子组件内） |  String | - |
| dom-id | 否  | 如果一个页面调用多个 需要写不同的id值  |  String | - |


## 数据 返回 注解

1. time: number UTC 时区的毫秒单位时间戳。time对于日K线的时间应为00:00 UTC(而非交易时段的开始时间)。图表库讲根据商品信息中的交易时段调整时间。每个月K线的时间是该月的第一个交易日，且无时间部分。
2. open: number K线开盘价
3. high: number K线最高价
4. low: number K线最低价
5. close: number K线收盘价
6. volume: number K线交易量