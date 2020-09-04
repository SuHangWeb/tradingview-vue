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
        }
    }
}
//自定义样式
const data = {
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
            "paneProperties.legendProperties.showSeriesOHLC": true, //开高低收
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
        }
    }
}
export default data.obj();