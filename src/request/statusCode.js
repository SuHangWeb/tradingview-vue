import router from '../router';


/** 
 * 请求失败后的错误统一处理 
 * @param {Number} status 请求的状态码
 * @param {Number} other 返回的的提示msg
 * @param {Number} res 返回所有数据
 */
const $errorHandle = (status, other, res) => {
    // 状态码判断
    switch (status) {
        // 1010: 注册成功
        case 1010:
            break;
            // 1011：注册失败
        case 1011:
            break;
            // 1212： 账号已存在
        case 1212:
            break;
            // 1020： 登录成功
        case 1020:
            break;
            // 1021： 登录失败,账号不存在
        case 1021:
            //执行操作
            break;
            //1022： 登录成功,未绑定手机号
        case 1022:
            break;
            // 1023： 登录失败,密码错误
        case 1023:
            break;
            // 1024： '登录失败,账号被冻结
        case 1024:
            break;
            // 1025： 登录失败
        case 1025:
            break;
            // 1030： 发布成功
        case 1030:
            //执行操作
            break;
            // 1031： 发布失败
        case 1031:
            //执行操作
            break;
            // 1040： 验证码发送成功
        case 1040:
            break;
            // 1041： 验证码发送失败
        case 1041:
            break;
            // 1042： 验证码已过期
        case 1042:
            break;
            //1050： 提现成功
        case 1050:
            //执行操作
            break;
            // 1051： 提现失败
        case 1051:
            //执行操作
            break;
            // 1052： 提现账户信息错误
        case 1052:
            //执行操作
            break;
            // 1060 ： 充值成功
        case 1060:
            Toast.success('充值成功');
            break;
            // 1061： 充值失败
        case 1061:
            //执行操作
            break;
            // 1070： 支付成功
        case 1070:
            break;
            // 1071： 支付失败
        case 1071:
            break;
            // 1072： 支付密码未设置
        case 1072:
            //执行操作
            break;
            // 1073： 支付密码错误
        case 1073:
            break;
            // 1074： 取消成功
        case 1074:
            break;
            // 1075： 取消失败
        case 1075:
            break;
            // 1076： 确认成功,交易完成
        case 1076:
            break;
            // 1077： 确认失败
        case 1077:
            break;
            // 1078： 转账成功
        case 1078:
            //执行操作
            break;
            // 1079： 转账失败
        case 1079:
            //执行操作
            break;
            // 2000： 获取成功
        case 2000:
            //执行操作
            break;
            // 2001： 更新成功
        case 2001:
            break;
            // 2004： 更新失败
        case 2004:
            break;
            // 2010： 创建成功
        case 2010:
            //执行操作
            break;
            //2011： 创建失败
        case 2011:
            //执行操作
            break;
            // 2012： 添加成功
        case 2012:
            break;
            // 2013： 添加失败
        case 2013:
            break;
            // 2040： 删除成功
        case 2040:
            break;
            // 2041： 删除失败
        case 2041:
            //执行操作
            break;
            //4010： Token错误或已过期,请重新登录
        case 4010:
            break;
            // 4030： 无此访问权限
        case 4030:
            //执行操作
            break;
            // 4040： 无效的请求
        case 4040:
            break;
            // 4220： 上传的附件无法处理
        case 4220:
            //执行操作
            break;
            // 4241： 请求参数错误
        case 4241:
            //执行操作
            break;
            // 5000： 系统错误,未知服务器消息
        case 5000:
            //执行操作
            break;
            // 5030： 服务器维护中
        case 5030:
            //执行操作
            break;
        default:
            // console.log(other);
    }
};

export default $errorHandle;