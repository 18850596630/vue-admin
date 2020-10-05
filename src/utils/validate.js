/**
 * 过滤特殊字符
 */
export function Strscript(val) {
    var flag = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？ ]");
    var text = "";
    for (var i = 0; i < val.length; i++) {
        text = text + val.substr(i, 1).replace(flag, '');
    }
    return text;
}

/**
 * 验证邮箱规则
 */
export function ValidateEmail(val){
    var emailReg = /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})$/;
    return emailReg.test(val);
}