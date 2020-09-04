/**
 * canvas 转换格式
 * author：苏航
 * 思否博客：https://segmentfault.com/u/suhangweb
 * 调用方法如下：
 * 全局调用 main文件
 * import * as canvasFormat from './common/utils/canvasFormat';
 * Vue.prototype.$canvasFormat = canvasFormat;
 * 单页面调用
 * import {getFloatStr,substring} from './common/utils/canvasFormat'
 */

/**
 * canvas 转换为 base64格式
 * @param {*} canvas   canvas dom文件
 * @param {String} format 格式默认png 
 */
export const Base64 = (canvas, format) => {
    return canvas.toDataURL(`image/${format ? format : 'png'}`)
}


/**
 * canvas转为blob对象
 * 将canvas输出为Blob对象，这样就可以像File对象一样操作它了
 * @param {*} canvas   canvas dom文件
 */
export const Blob = (canvas) => {
    // return canvas.toBlob(function (blobObj) {
    //     //blobObj就是blob对象（类文件）
    //     return blobObj
    // })
    return new Promise(function(resolve, reject) {
        canvas.toBlob(function (blobObj) {
            //blobObj就是blob对象（类文件）
            resolve(blobObj); 
        })
    })
}