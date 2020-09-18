/**
 * JS API
 */

class datafeeds {

	/**
	 * JS API
	 * @param {*Object} vue vue实例
	 */
	constructor(vue) {
		this.self = vue
		//this.barsUpdater = new dataUpdater(this)
	}

	/**
	 * @param {*Function} callback  回调函数
	 * `onReady` should return result asynchronously.
	 */
	onReady(callback) {
		return new Promise((resolve, reject) => {
			let configuration = this.defaultConfiguration()
			if (this.self.getConfig) {
				configuration = Object.assign(this.defaultConfiguration(), this.self.getConfig())
			}
			resolve(configuration)
		}).then(data => callback(data))
	}

	/**
	 * 搜索商品
	 * @param {*String} userInput  用户在商品搜索框中输入的文字。
	 * @param {*String} exchange 请求的交易所（由用户选择）。空值表示没有指定
	 * @param {*String} symbolType  请求的商品类型：指数、股票、外汇等等（由用户选择）。空值表示没有指定。
	 * @param {*Function} onResultReadyCallback 提供一个匹配用户搜索的商品列表
	 */
	searchSymbols(userInput, exchange, symbolType, onResultReadyCallback) {

	}

	/**
	 * @param {*String} symbolName  商品名称或ticker
	 * @param {*Function} onSymbolResolvedCallback 成功回调 
	 * @param {*Function} onResolveErrorCallback   失败回调
	 * `resolveSymbol` should return result asynchronously.
	 */
	resolveSymbol(symbolName, onSymbolResolvedCallback, onResolveErrorCallback) {
		return new Promise((resolve, reject) => {
			let symbolInfo = this.defaultSymbol()
			if (this.self.getSymbol) {
				symbolInfo = Object.assign(this.defaultSymbol(), this.self.getSymbol(symbolName))
			}
			resolve(symbolInfo)
		}).then(data => onSymbolResolvedCallback(data)).catch(err => onResolveErrorCallback(err))
	}

	/**
	 * @param {*Object} symbolInfo  商品信息对象
	 * @param {*String} resolution  分辨率
	 * @param {*Number} rangeStartDate  时间戳、最左边请求的K线时间
	 * @param {*Number} rangeEndDate  时间戳、最右边请求的K线时间
	 * @param {*Function} onDataCallback  回调函数
	 * @param {*Function} onErrorCallback  回调函数
	 */
	getBars(symbolInfo, resolution, rangeStartDate, rangeEndDate, onDataCallback, onErrorCallback) {
		const onLoadedCallback = data => {
			data && data.length ? onDataCallback(data, {
				noData: false
			}) : onDataCallback([], {
				noData: true
			})
		}
		this.self.getBars(symbolInfo, resolution, rangeStartDate, rangeEndDate, onLoadedCallback)
	}

	/**
	 * 订阅K线数据。图表库将调用onRealtimeCallback方法以更新实时数据
	 * @param {*Object} symbolInfo 商品信息
	 * @param {*String} resolution 分辨率
	 * @param {*Function} onRealtimeCallback 回调函数 
	 * @param {*String} subscriberUID 监听的唯一标识符
	 * @param {*Function} onResetCacheNeededCallback (从1.7开始): 将在bars数据发生变化时执行
	 */
	subscribeBars(symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback) {
		//this.barsUpdater.subscribeBars(symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback)
		this.self.subscribeBars(symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback)
	}

	/**
	 * 取消订阅K线数据
	 * @param {*String} subscriberUID 监听的唯一标识符
	 */
	unsubscribeBars(subscriberUID) {
		//this.barsUpdater.unsubscribeBars(subscriberUID)
	}

	/**
	 * 默认配置
	 */
	defaultConfiguration() {
		return {
			supports_search: true,
			supports_group_request: false,
			supported_resolutions: ['1', '5', '15', '30', '60', '1D', '2D', '3D', '1W', '1M'],
			supports_marks: true,
			supports_timescale_marks: true,
			supports_time: true
		}
	}

	/**
	 * 默认商品信息
	 */
	defaultSymbol() {
		return {
			'name': 'BTCUSDT',
			'full_name': 'BTCUSDT',
			'timezone': 'Asia/Shanghai',
			'minmov': 1,
			'minmov2': 0,
			'pointvalue': 1,
			'fractional': false,
			'session': '24x7',
			'has_intraday': true,
			'has_no_volume': false,
			'description': 'BTCUSDT',
			'pricescale': 100000000,
			'ticker': 'BTCUSDT',
			'intraday_multipliers': ['1', '5', '15', '30', '60'],
			'supported_resolutions': ['1', '5', '15', '30', '60', '1D', '2D', '3D', '1W', '1M']
		}
	}
}

export default datafeeds