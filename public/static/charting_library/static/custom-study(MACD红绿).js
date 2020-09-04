__customIndicators = [{
	name: "MACD Custom",
	metainfo: {
		"_metainfoVersion": 40,
		"id": "macd-custom@tv-basicstudies-1",
		"scriptIdPart": "",
		"name": "macd-custom",
		"description": "指数平滑异同移动平均线(MACD_Custom)",
		"shortDescription": "MACD",
		"is_price_study": false,
		"isCustomIndicator": true,
		defaults: {
			styles: {
				plot_0: {
					linestyle: 0,
					linewidth: 4,//红色
					plottype: 1,
					trackPrice: !1,
					transparency: 35,
					visible: !0,
					color: "#da1155"
				},
				plot_1: {
					linestyle: 0,
					linewidth: 1,
					plottype: 0,
					trackPrice: !1,
					transparency: 0,
					visible: !0,
					color: "#FFFFFF"
				},
				plot_2: {
					linestyle: 0,
					linewidth: 1,
					plottype: 0,
					trackPrice: !1,
					transparency: 0,
					visible: !0,
					color: "#FFFF00"
				},
				plot_3: {
					linestyle: 0,
					linewidth: 4,//绿色
					plottype: 1,
					trackPrice: !1,
					transparency: 35,
					visible: !0,
					color: "#33FF33"
				}
			},
			precision: 4,
			inputs: {
				in_0: 12,
				in_1: 26,
				in_3: "close",
				in_2: 9
			}
		},
		plots: [{
			id: "plot_0",
			type: "line"
		},
		{
			id: "plot_1",
			type: "line"
		},
		{
			id: "plot_2",
			type: "line"
		},
		{
			id: "plot_3",
			type: "line"
		}],
		styles: {
			plot_0: {
				title: "Histogram",
				histogramBase: 0,
				joinPoints: !1
			},
			plot_1: {
				title: "MACD",
				histogramBase: 0,
				joinPoints: !1
			},
			plot_2: {
				title: "Signal",
				histogramBase: 0,
				joinPoints: !1
			},
			plot_3: {
				title: "Histogram",
				histogramBase: 0,
				joinPoints: !1
			}
		},
		inputs: [{
			id: "in_0",
			name: "fastLength",
			defval: 12,
			type: "integer",
			min: 1,
			max: 2e3,
		},
		{
			id: "in_1",
			name: "slowLength",
			defval: 26,
			type: "integer",
			min: 1,
			max: 2e3
		},
		{
			id: "in_3",
			name: "Source",
			defval: "close",
			type: "source",
			options: "open high low close hl2 hlc3 ohlc4".split(" ")
		},
		{
			id: "in_2",
			name: "signalLength",
			defval: 9,
			type: "integer",
			min: 1,
			max: 50
		}],
		id: "Moving Average Convergence Custom/Divergence@tv-basicstudies-1",
		scriptIdPart: "",
		name: "MACDCUSTOM"
	},
	constructor: function() {
		this.f_0 = function(a, b) {
			return a - b
		},
		this.main = function(a, b) {
			var c, k, f, n, r, l, u, p, q, e, g, v, i;
			this._context = a;
			this._input = b;
			c = PineJS.Std[this._input(2)](this._context);
			k = this._input(0);
			f = this._input(1);
			n = this._input(3);
			r = this._context.new_var(c);
			l = PineJS.Std.ema(r, k, this._context);
			u = this._context.new_var(c);
			p = PineJS.Std.ema(u, f, this._context);
			q = this.f_0(l, p);
			e = this._context.new_var(q);
			g = PineJS.Std.sma(e, n, this._context);
			v = this.f_0(q, g);
			if (v >= 0) {
				i = 0;
			} else {
				i = v;
				v = 0
			}
			return [v, q, g, i];
		}
	}
}];