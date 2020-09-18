//自定义默认样式
const defaults = {
    style: {
        up: "#178025",
        down: "#a31449",
        bg: "#1d1d29",
        grid: "#1e2235",
        cross: "#9194A3",
        border: "#4e5b85",
        borderUpColor: "rgba(21,195,34,0.9)",
        borderDownColor: "rgba(255, 15, 93,0.9)",
        text: "#61688A",
        areatop: "rgba(122, 152, 247, .2)",
        areadown: "rgba(122, 152, 247, .02)",
    },
    obj: function () {
        return {
            volumePaneSize: "medium", //指标区域大小（large, medium, small, tiny）
            "scalesProperties.lineColor": this.style.text,
            "scalesProperties.textColor": this.style.text,
            "paneProperties.background": this.style.bg, //整体背景颜色
            "paneProperties.vertGridProperties.color": this.style.grid, //竖直网格线颜色
            "paneProperties.horzGridProperties.color": this.style.grid, //水平网格线颜色
            "paneProperties.crossHairProperties.color": this.style.cross,
            "paneProperties.legendProperties.showLegend": false, //收起左上角指标
            "paneProperties.legendProperties.showStudyArguments": true,
            "paneProperties.legendProperties.showStudyTitles": true,
            "paneProperties.legendProperties.showStudyValues": true,
            "paneProperties.legendProperties.showSeriesTitle": true, //工具栏目title
            "paneProperties.legendProperties.showSeriesOHLC": true,//开高低收
            "mainSeriesProperties.showPriceLine": false, //最新价格线
            "mainSeriesProperties.candleStyle.upColor": this.style.up,
            "mainSeriesProperties.candleStyle.downColor": this.style.down,
            "mainSeriesProperties.candleStyle.drawWick": true,
            "mainSeriesProperties.candleStyle.drawBorder": true,
            "mainSeriesProperties.candleStyle.borderColor": this.style.border,
            "mainSeriesProperties.candleStyle.borderUpColor": this.style.borderUpColor,
            "mainSeriesProperties.candleStyle.borderDownColor": this.style.borderDownColor,
            "mainSeriesProperties.candleStyle.wickUpColor": this.style.up,
            "mainSeriesProperties.candleStyle.wickDownColor": this.style.down,
            "mainSeriesProperties.candleStyle.barColorsOnPrevClose": false,
            "mainSeriesProperties.hollowCandleStyle.upColor": this.style.up,
            "mainSeriesProperties.hollowCandleStyle.downColor": this.style.down,
            "mainSeriesProperties.hollowCandleStyle.drawWick": true,
            "mainSeriesProperties.hollowCandleStyle.drawBorder": true,
            "mainSeriesProperties.hollowCandleStyle.borderColor": this.style.border,
            "mainSeriesProperties.hollowCandleStyle.borderUpColor": this.style.borderUpColor,
            "mainSeriesProperties.hollowCandleStyle.borderDownColor": this.style.borderDownColor,
            "mainSeriesProperties.hollowCandleStyle.wickColor": this.style.line,
            "mainSeriesProperties.haStyle.upColor": this.style.up,
            "mainSeriesProperties.haStyle.downColor": this.style.down,
            "mainSeriesProperties.haStyle.drawWick": true,
            "mainSeriesProperties.haStyle.drawBorder": true,
            "mainSeriesProperties.haStyle.borderColor": this.style.border,
            "mainSeriesProperties.haStyle.borderUpColor": this.style.borderUpColor,
            "mainSeriesProperties.haStyle.borderDownColor": this.style.borderDownColor,
            "mainSeriesProperties.haStyle.wickColor": this.style.border,
            "mainSeriesProperties.haStyle.barColorsOnPrevClose": false,
            "mainSeriesProperties.barStyle.upColor": this.style.up,
            "mainSeriesProperties.barStyle.downColor": this.style.down,
            "mainSeriesProperties.barStyle.barColorsOnPrevClose": false,
            "mainSeriesProperties.barStyle.dontDrawOpen": false,
            "mainSeriesProperties.lineStyle.color": this.style.border,
            "mainSeriesProperties.lineStyle.linewidth": 1,
            "mainSeriesProperties.lineStyle.priceSource": "close",
            "mainSeriesProperties.areaStyle.color1": this.style.areatop,
            "mainSeriesProperties.areaStyle.color2": this.style.areadown,
            "mainSeriesProperties.areaStyle.linecolor": this.style.border,
            "mainSeriesProperties.areaStyle.linewidth": 1,
            "mainSeriesProperties.areaStyle.priceSource": "close",
            // 数据列风格。 请参阅下面的支持的值
            //  Bars = 0            #美国线
            //  Candles = 1         #K线图
            //  Line = 2            #线形图
            //  Area = 3            #面积图
            //  Heiken Ashi = 8     #平均K线图
            //  Hollow Candles = 9  #空心K线图
            //  Renko = 4           #转形图
            //  Kagi = 5            #卡吉图
            //  Point&Figure = 6    #点数图
            //  Line Break = 7      #新价图
            "mainSeriesProperties.style": 1
        }
    }
}
//自定义样式
const data = {
    // style: {
    //     up: "#178025",
    //     down: "#a31449",
    //     bg: "#1d1d29",
    //     grid: "#1e2235",
    //     cross: "#9194A3",
    //     border: "#4e5b85",
    //     borderUpColor: "rgba(21,195,34,0.9)",
    //     borderDownColor: "rgba(255, 15, 93,0.9)",
    //     text: "#61688A",
    //     areatop: "rgba(122, 152, 247, .2)",
    //     areadown: "rgba(122, 152, 247, .02)",
    // },
    obj: function () {
        return {
            "symbolWatermarkProperties.color": "rgba(0,0,0, 0)",
            "paneProperties.background": "#20334d",
            "paneProperties.vertGridProperties.color": "#344568",
            "paneProperties.horzGridProperties.color": "#344568",
            "paneProperties.crossHairProperties.color": "#58637a",
            "paneProperties.crossHairProperties.style": 2,
            // 数据列风格。 请参阅下面的支持的值
            //  Bars = 0            #美国线
            //  Candles = 1         #K线图
            //  Line = 2            #线形图
            //  Area = 3            #面积图
            //  Heiken Ashi = 8     #平均K线图
            //  Hollow Candles = 9  #空心K线图
            //  Renko = 4           #转形图
            //  Kagi = 5            #卡吉图
            //  Point&Figure = 6    #点数图
            //  Line Break = 7      #新价图
            "mainSeriesProperties.style": 1,
            "mainSeriesProperties.showCountdown": false,
            "scalesProperties.showSeriesLastValue": true,
            "mainSeriesProperties.visible": false,
            "mainSeriesProperties.showPriceLine": false,
            "mainSeriesProperties.priceLineWidth": 1,
            "mainSeriesProperties.lockScale": false,
            "mainSeriesProperties.minTick": "default",
            "mainSeriesProperties.extendedHours": false,
            "volumePaneSize": "tiny",//底部视图大小 支持的值: large, medium, small, tiny
            editorFontsList: ["Lato", "Arial", "Verdana", "Courier New", "Times New Roman"],
            "paneProperties.topMargin": 5,
            "paneProperties.bottomMargin": 5,
            "paneProperties.legendProperties.showLegend": true, //收起左上角指标
            "paneProperties.leftAxisProperties.autoScale": true,
            "paneProperties.leftAxisProperties.autoScaleDisabled": false,
            "paneProperties.leftAxisProperties.percentage": false,
            "paneProperties.leftAxisProperties.percentageDisabled": false,
            "paneProperties.leftAxisProperties.log": false,
            "paneProperties.leftAxisProperties.logDisabled": false,
            "paneProperties.leftAxisProperties.alignLabels": true,
            // "paneProperties.legendProperties.showStudyArguments": true,
            "paneProperties.legendProperties.showStudyTitles": true,
            "paneProperties.legendProperties.showStudyValues": true,
            "paneProperties.legendProperties.showSeriesTitle": false,
            "paneProperties.legendProperties.showSeriesOHLC": true,//开高低
            "scalesProperties.showLeftScale": false,
            "scalesProperties.showRightScale": true,
            "scalesProperties.backgroundColor": "#20334d",
            "scalesProperties.lineColor": "#46587b",
            "scalesProperties.textColor": "#8f98ad",
            "scalesProperties.scaleSeriesOnly": false,
            "mainSeriesProperties.priceAxisProperties.autoScale": true,
            "mainSeriesProperties.priceAxisProperties.autoScaleDisabled": false,
            "mainSeriesProperties.priceAxisProperties.percentage": false,
            "mainSeriesProperties.priceAxisProperties.percentageDisabled": false,
            "mainSeriesProperties.priceAxisProperties.log": false,
            "mainSeriesProperties.priceAxisProperties.logDisabled": false,
            "mainSeriesProperties.candleStyle.upColor": "#3fcfb4",
            "mainSeriesProperties.candleStyle.downColor": "#fe4761",
            "mainSeriesProperties.candleStyle.drawWick": true,
            "mainSeriesProperties.candleStyle.drawBorder": true,
            "mainSeriesProperties.candleStyle.borderColor": "#3fcfb4",
            "mainSeriesProperties.candleStyle.borderUpColor": "#3fcfb4",
            "mainSeriesProperties.candleStyle.borderDownColor": "#fe4761",
            "mainSeriesProperties.candleStyle.wickColor": "#737375",
            "mainSeriesProperties.candleStyle.wickUpColor": "#3fcfb4",
            "mainSeriesProperties.candleStyle.wickDownColor": "#fe4761",
            "mainSeriesProperties.candleStyle.barColorsOnPrevClose": false,
            "mainSeriesProperties.hollowCandleStyle.upColor": "#3fcfb4",
            "mainSeriesProperties.hollowCandleStyle.downColor": "#fe4761",
            "mainSeriesProperties.hollowCandleStyle.drawWick": true,
            "mainSeriesProperties.hollowCandleStyle.drawBorder": true,
            "mainSeriesProperties.hollowCandleStyle.borderColor": "#3fcfb4",
            "mainSeriesProperties.hollowCandleStyle.borderUpColor": "#3fcfb4",
            "mainSeriesProperties.hollowCandleStyle.borderDownColor": "#fe4761",
            "mainSeriesProperties.hollowCandleStyle.wickColor": "#737375",
            "mainSeriesProperties.hollowCandleStyle.wickUpColor": "#3fcfb4",
            "mainSeriesProperties.hollowCandleStyle.wickDownColor": "#fe4761",
            "mainSeriesProperties.haStyle.upColor": "#3fcfb4",
            "mainSeriesProperties.haStyle.downColor": "#fe4761",
            "mainSeriesProperties.haStyle.drawWick": true,
            "mainSeriesProperties.haStyle.drawBorder": true,
            "mainSeriesProperties.haStyle.borderColor": "#3fcfb4",
            "mainSeriesProperties.haStyle.borderUpColor": "#3fcfb4",
            "mainSeriesProperties.haStyle.borderDownColor": "#fe4761",
            "mainSeriesProperties.haStyle.wickColor": "#737375",
            "mainSeriesProperties.haStyle.wickUpColor": "#3fcfb4",
            "mainSeriesProperties.haStyle.wickDownColor": "#fe4761",
            "mainSeriesProperties.haStyle.barColorsOnPrevClose": false,
            "mainSeriesProperties.barStyle.upColor": "#3fcfb4",
            "mainSeriesProperties.barStyle.downColor": "#fe4761",
            "mainSeriesProperties.barStyle.barColorsOnPrevClose": false,
            "mainSeriesProperties.barStyle.dontDrawOpen": false,
            "mainSeriesProperties.lineStyle.color": "#0cbef3",
            "mainSeriesProperties.lineStyle.linestyle": 0,
            "mainSeriesProperties.lineStyle.linewidth": 1,
            "mainSeriesProperties.lineStyle.priceSource": "close",
            "mainSeriesProperties.areaStyle.color1": "#0cbef3",
            "mainSeriesProperties.areaStyle.color2": "#0098c4",
            "mainSeriesProperties.areaStyle.linecolor": "#0cbef3",
            "mainSeriesProperties.areaStyle.linestyle": 0,
            "mainSeriesProperties.areaStyle.linewidth": 1,
            "mainSeriesProperties.areaStyle.priceSource": "close",
            "mainSeriesProperties.areaStyle.transparency": 80,
        }
    }
}
export default data.obj();