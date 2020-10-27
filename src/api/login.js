import service from '@/utils/request';

/**
 * 获取验证吗
 */
export function GetEmail(data) {
    service.request({
        method: "post",
        url: "/getSms/",
        data //data:data  左边变量data是后台接收的 ， 右边的data是接收参数
    })
}


/**
 * 获取用户角色
 */

/**
 * 登录
 */

/**
 * 注册
 */