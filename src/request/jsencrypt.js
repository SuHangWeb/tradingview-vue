/**
 * rsa 加密
 */
import { JSEncrypt } from 'jsencrypt';

// 公钥
const publickey = '-----BEGIN PUBLIC KEY-----\MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAv30lXbfQWFsmlyYQwZmdbcRX6nhtyCqRutxgt+iT5ddjKdl0kVUtJCh78/0THgSCj0sHu0JxXqX2N51Re4VSMMVYYYCx0PUVhrtAGhzlD+qZ60CqPa7dDDSTdivHF9zIlXYnSZ59jTL5SNyLGKMsuqn3VGJk/oo2NJptjAIMAGEyPlSNsV4Qr6l7RcXTQTDaa6FA6I3PARXIU6nRh1NelwekWFyQZHwVs+TNwPDBJhnqWpNDb5njWQZzSQrfymU3WW27q8GEYUT2N+UvaQq1Xuf/EQa7jcJVNLLXmAI2t7JCQCpIs+5n/fk1Fy03D3tDotyfdix9vhRNtUfPyt/hqQIDAQAB\-----END PUBLIC KEY-----';
// 新建JSEncrypt对象
let encryptor = new JSEncrypt();
// 设置公钥
encryptor.setPublicKey(publickey);


// 对密码进行加密
let $encryption = function(data) {
    return encryptor.encrypt(data);
};

export default $encryption