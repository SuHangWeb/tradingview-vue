<template>
  <div class="sTradingviewContent">
    <van-tabs
      class="tabsWrap"
      title-active-color="#6394f0"
      title-inactive-color="#7a90ad"
      color="#6394f0"
      background="#2a3041"
      v-model="interval"
      @change="changeTabs"
    >
      <van-tab v-for="(item,index) in tabsArr" :title="item.name" :name="item.value" :key="index" />
    </van-tabs>
    <div :id="domId" class="sTradingviewView"></div>
  </div>
</template>
<script>
import { widget } from "@/common/tradingview/charting_library.min.js";
import datafeeds from "@/common/tradingview/datafees.js";
import config from "./config";
import { webSocketMixin } from "./mixin/webSocket";
export default {
  name: "sTradingview",
  mixins: [webSocketMixin],
  props: {
    //Dom元素id
    domId: {
      type: String,
      default: function () {
        return "tradeView";
      },
    },
    //请求地址
    wsUrl: {
      type: String,
      default: function () {
        return "";
      },
    },
    //是否显示MACD
    is_MACD: {
      type: Boolean,
      default: function () {
        return false;
      },
    },
  },
  data() {
    return {
      tabsArr: [
        // {
        //   name: "分时",
        //   value: "1S",
        //   websockSend: "0",
        // },
        {
          name: "1分钟",
          value: "1min",
          websockSend: "1",
        },
        {
          name: "5分钟",
          value: "5min",
          websockSend: "5",
        },
        {
          name: "15分钟",
          value: "15min",
          websockSend: "15",
        },
        {
          name: "30分钟",
          value: "30min",
          websockSend: "30",
        },
        {
          name: "1小时",
          value: "60min",
          websockSend: "60",
        },
        {
          name: "日线",
          value: "1day",
          websockSend: "1D",
        },
        {
          name: "周线",
          value: "1week",
          websockSend: "1W",
        },
        {
          name: "月线",
          value: "1mon",
          websockSend: "1M",
        },
      ],
      symbol: "LTC_USDT",
      interval: "1min",
      chart: null,
      initdata: {},
      countDate: 0, //累加条数
      startData: 0, //起始条数
      lengsData: 200, //结束长度
      datafeeds: new datafeeds(this),
      onLoadedCallback: null, //初始数据回调
      onRealtimeCallback: null, //websocket数据回调
    };
  },
  mounted() {
    //加载K线图
    this.loadChart();
  },
  methods: {
    /**
     * 切换触发
     * e {string} reset=重置数据
     */
    changeTabs(e) {
      this.interval = e;
      this.setSymbols();
      this.chart
        .chart()
        .setResolution(this.filter(e), function onReadyCallback(e) {});
      this.webSocket("load");
    },
    filter(time) {
      if (time == "1S") return "1S";
      else if (time == "1min") return "1";
      else if (time == "5min") return "5";
      else if (time == "15min") return "15";
      else if (time == "30min") return "30";
      else if (time == "60min") return "60";
      else if (time == "1day") return "1D";
      else if (time == "1week") return "1W";
      else if (time == "1mon") return "1M";
    },

    // 请求数据
    getBars(
      symbolInfo,
      resolution,
      rangeStartDate,
      rangeEndDate,
      onLoadedCallback
    ) {
      this.onLoadedCallback = onLoadedCallback;
      this.webSocket("load");
    },

    //socket
    subscribeBars(
      symbolInfo,
      resolution,
      onRealtimeCallback,
      subscriberUID,
      onResetCacheNeededCallback
    ) {
      this.onRealtimeCallback = onRealtimeCallback;
      this.webSocket("get");
    },

    //获取配置信息
    getSymbol(symbol) {
      return {
        name: symbol,
        full_name: symbol,
        timezone: "Asia/Shanghai",
        minmov: 1,
        minmov2: 0,
        pointvalue: 1,
        fractional: false,
        //设置周期
        session: "24x7",
        has_intraday: true,
        has_no_volume: false,
        //设置是否支持周月线
        has_daily: true,
        //设置是否支持周月线
        // has_weekly_and_monthly: true,
        description: symbol,
        //设置精度  100表示保留两位小数   1000三位   10000四位
        pricescale: 100,
        ticker: symbol,
        //  'supported_resolutions': ['1', '5', '15', '30', '60', '240','1D', '5D', '1W', '1M']
      };
    },

    //设置品信息(重新获取初始数据/推送数据)
    setSymbols() {
      let self = this;
      self.chart.setSymbol(
        self.symbol,
        self.filter(self.interval),
        function () {
          self.chart.chart().setVisibleRange(self.initdata);
          self.chart.chart().executeActionById("timeScaleReset");
        }
      );
    },

    //卸载K线
    removeChart() {
      if (this.chart) {
        this.chart.remove();
        this.chart = null;
      }
    },

    //加载K线图插件
    loadChart() {
      let self = this;
      this.chart = new widget({
        container_id: self.domId,
        symbol: self.symbol,
        interval: self.filter(self.interval),
        locale: "zh",
        autosize: true,
        fullscreen: false, //是否占用视图所有空间
        preset: "mobile",
        toolbar_bg: "#1e2235",
        datafeed: this.datafeeds,
        timezone: "Asia/Shanghai",
        library_path: "/static/charting_library/",
        indicators_file_name: "custom-study(MACD红绿).js",
        drawings_access: {
          type: "black",
          tools: [{ name: "Regression Trend" }],
        },
        //配置项
        ...config,
      });

      this.chart.onChartReady(function () {
        //设置均线种类 均线样式
        // self.chart.chart().createStudy('Moving Average', false, false, [5], null, {'Plot.color': 'rgb(150, 95, 196)'});
        // self.chart.chart().createStudy('Moving Average', false, false, [10], null, {'Plot.color': 'rgb(116,149,187)'});
        // self.chart.chart().createStudy('Moving Average', false, false, [20],null,{"plot.color": "rgb(58,113,74)"});
        // self.chart.chart().createStudy('Moving Average', false, false, [30],null,{"plot.color": "rgb(118,32,99)"});
        try {
          self.chart
            .chart()
            .createStudy("Moving Average", !1, !1, [7], null, {});
          self.chart
            .chart()
            .createStudy("Moving Average", !1, !1, [10], null, {});
          self.chart
            .chart()
            .createStudy("Moving Average", !1, !1, [30], null, {});
          if (self.is_MACD) {
            self.chart.chart().createStudy("MACD", !1, !1, [20], null, {}); //MACD
            self.chart
              .chart()
              .createStudy(
                "指数平滑异同移动平均线(MACD_Custom)",
                false,
                false,
                [20],
                null,
                {}
              ); //自定义MACD
          }
          //每当十字线位置改变时 触发
          // self.chart.chart().crossHairMoved((callback) => {
          //   console.log(callback);
          // });
        } catch (e) {}
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.sTradingviewContent {
  height: 100%;
  width: 100%;
  .tabsWrap {
    height: 88px;
  }
  .sTradingviewView {
    height: calc(100% - 88px);
  }
}
</style>
