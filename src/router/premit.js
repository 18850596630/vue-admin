import router from "./index";
import { getToken } from "../utils/app";

const whiteRouter = ['/login'];


//路由守卫
router.beforeEach((to, from, next) => {
    if (getToken()) {
        console.log("存在");
    } else {
        console.log("不存在");
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