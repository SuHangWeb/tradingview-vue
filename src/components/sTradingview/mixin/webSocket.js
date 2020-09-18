import $lodash from 'lodash';
export const webSocketMixin = {
    data() {
        return {
            isWebsock: false,
            websockTime: "", //心跳
        }
    },
    created() {

    },
    methods: {
        /**
             * 获取推送数据 （取一个值就好）
             * e {string} load=加载 get=获取
             */
        webSocket(e) {
            const self = this;
            if (e == "load") {
                if (typeof WebSocket === "undefined") {
                    alert("您的浏览器不支持socket");
                } else {
                    try {
                        self.websock.close();
                        this.isWebsock = false;
                    } catch (e) { }
                    // 实例化socket
                    self.websock = new WebSocket(self.wsUrl);
                    // 监听socket连接
                    self.websock.onopen = self.websockOpen;
                    // 监听socket错误信息
                    self.websock.onerror = self.websockError;
                    // 监听socket消息
                    self.websock.onmessage = self.websockMessage;
                }
            }

        },
        //链接状态
        websockOpen(e) {
            const self = this;
            // console.log("socket连接成功");
            if (this.websockTime) {
                clearInterval(this.websockTime);
            }
            this.isWebsock = true;
            this.websockSend();
            setTimeout(function () {
                self.websockHeartbeat();
            }, 1000);
        },
        //发送消息
        websockSend(msg) {
            const self = this;
            if (msg) {
                if (this.isWebsock) {
                    self.websock.send(msg);
                }
            } else {
                self.websock.send(
                    // JSON.stringify({
                    //     req: "contractkline",
                    //     sub: `contract:KLineData:${self.marketName}:kline_${$lodash.find(self.tabsArr, { resolution: self.interval }).websockSend}_${self.marketId}`,
                    // })
                    JSON.stringify({
                        req: "currency",
                        sub: `trade:kline:KLineData_kline_${$lodash.find(self.tabsArr, { resolution: self.interval }).websockSend}_${self.marketId}`,
                    })
                );
            }
        },
        //错误
        websockError(e) {
            // console.log(e)
            //   console.log("连接错误");
            this.websockClose();
        },
        //监听返回消息
        websockMessage(msg) {
            const self = this;
            let res = JSON.parse(msg.data);
            if (Array.isArray(res)) {
                let arrayData = [];
                res.map((item) => {
                    arrayData.push({
                        time: Number(item.Date * 1000),
                        close: Number(item.Close),
                        open: Number(item.Open),
                        high: Number(item.High),
                        low: Number(item.Low),
                        volume: Number(item.Volume),
                    });
                });
                self.onLoadedCallback(arrayData);
            } else {
                if (!res.hasOwnProperty("pong")) {
                    try {
                        self.onRealtimeCallback({
                            time: Number(res.Date * 1000),
                            close: Number(res.Close),
                            open: Number(res.Open),
                            high: Number(res.High),
                            low: Number(res.Low),
                            volume: Number(res.Volume),
                        });
                    } catch (e) { }
                }
            }
        },
        //心跳
        websockHeartbeat() {
            const self = this;
            self.websockTime = setInterval(function () {
                self.websockSend(JSON.stringify({ ping: new Date().getTime() }));
            }, 3000);
        },
        //连接关闭
        websockClose() {
            // console.log("socket已经关闭");
            clearInterval(this.websockTime);
            this.isWebsock = false;
        },
    }
}