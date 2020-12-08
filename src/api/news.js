import service from "@/utils/request";

/**
 * 添加一级分类名称
 */
export function AddFirstCate(data) {
    return service.request({
        method: "post",
        url: "/addFirstCate/",
        data
    })
}

/**
 * 删除分类
 */
export function DelCate(data) {
    return service.request({
        method: "post",
        url: "/delCate/",
        data
    })
}

/**
 * 获取分类列表
 */
export function getCateList(data) {
    return service.request({
        method: "post",
        url: "/getCateList/",
        data
    })
}

/**
 * 编辑分类名称
 */
export function editCate(data) {
    return service.request({
        method: "post",
        url: "/editCate/",
        data
    })
}