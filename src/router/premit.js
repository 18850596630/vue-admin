import router from "./index";
import { getToken, removeToken, removeUserName } from "../utils/app";
import state from "../store/index";

const whiteRouter = ['/login'];


//路由守卫
router.beforeEach((to, from, next) => {
    if (getToken()) {
        if (to.path === "/login") {
            removeToken();
            removeUserName();
            state.commit('app/SET_TOKEN', "");
            state.commit('app/SET_USERNAME', "");
            next();
        } else {
            // 获取角色
            // 获取动态路由权限
            next();
        }
        // console.log("存在");
    } else {
        // console.log("不存在");
        if (whiteRouter.indexOf(to.path) !== -1) {
            next();
        } else {
            next('/login'); //路由指向
        }
    }
    // console.log(to); //下一页面
    // console.log(from); //之前页面
    // next()
})