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
      <van-tab
        v-for="(item,index) in tabsArr"
        :title="item.label"
        :name="item.resolution"
        :key="index"
      />
    </van-tabs>
    <div :id="domId" class="sTradingviewView"></div>
  </div>
</template>
<script>
import { widget } from "./static/charting_library.min.js";
import datafeeds from "./static/datafees.js";
import config from "./config";
import tabsConfig from "./config/tabs";
import { webSocketMixin } from "./mixin/webSocket";
import $lodash from "lodash";
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
    //参数
    marketName: {
      type: String,
      default: function () {
        return "";
      },
    },
    // 请求id
    marketId: {
      type: String | Number,
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
      tabsArr: tabsConfig,
      symbol: "LTC_USDT",
      interval: "1",
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
      let self = this;
      this.interval = e;

      let chartType = e == "1s" ? 3 : 1;

      this.setSymbols();

      // if (this.interval != e) {
      //   this.chart
      //     .chart()
      //     .setResolution(this.filter(e), function onReadyCallback(e) {});
      // }

      this.webSocket("load");

      this.chart.activeChart().setChartType(chartType);
      //MA显示隐藏
      this.toggleStudies(e);
    },

    //过滤 时段
    filter(time) {
      return time == "1s" ? "1" : time;
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
        //设置周期 等于所有时间都是交易时段
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
        supported_resolutions: ["1", "5", "15", "30", "60", "1D", "1W", "1M"],
      };
    },

    //设置品信息(重新获取初始数据/推送数据)
    setSymbols() {
      let self = this;
      self.chart.setSymbol(self.symbol, self.filter(self.interval), function (
        e
      ) {
        self.chart.chart().setVisibleRange(self.initdata);
        self.chart.chart().executeActionById("timeScaleReset");
      });
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
        //检查是否存在MA
        self.toggleStudies(self.interval);
      });
    },
    /**
     * 根据状态 显示隐藏 MA
     * e {string} 时段
     */
    toggleStudies(e) {
      let self = this;
      if (e == "1s") {
        self.chart
          .activeChart()
          .getAllStudies()
          .forEach((e) => {
            if (e.name == "Moving Average") {
              self.chart.activeChart().removeEntity(e.id);
            }
          });
      } else {
        //检查是否存在MA
        this.getAllStudiesFun();
      }
    },
    //检查是否有 指标MA
    getAllStudiesFun() {
      let self = this;
      let strArr = [];
      self.chart
        .activeChart()
        .getAllStudies()
        .forEach((e) => {
          // console.log(e);
          strArr.push(e.name);
        });
      if (JSON.stringify(strArr).indexOf("Moving Average") == -1) {
        //创建指标
        self.createStudyFun();
      }
    },
    //创建显示指标
    createStudyFun() {
      let self = this;
      //设置均线种类 均线样式
      // self.chart.chart().createStudy('Moving Average', false, false, [5], null, {'Plot.color': 'rgb(150, 95, 196)'});
      // self.chart.chart().createStudy('Moving Average', false, false, [10], null, {'Plot.color': 'rgb(116,149,187)'});
      // self.chart.chart().createStudy('Moving Average', false, false, [20],null,{"plot.color": "rgb(58,113,74)"});
      // self.chart.chart().createStudy('Moving Average', false, false, [30],null,{"plot.color": "rgb(118,32,99)"});
      try {
        self.chart.chart().createStudy("Moving Average", !1, !1, [7], null, {});
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
        // https://aitrade.ga/books/tradingview/book/Chart-Methods.html#setcharttypetype
      } catch (e) {}
    },
    //销毁之前
    beforeDestroy() {
      this.removeChart();
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
