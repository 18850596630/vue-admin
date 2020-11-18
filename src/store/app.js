import Cookie from "cookie_js";
import { Login } from "@/api/login.js";
const app = {
    state: {
        isCollapse: JSON.parse(Cookie.get('isCollapse')) || false,
    },
    getters: { //computed
        count: state => state.count + 1, //ES6    
    },
    mutations: { //修改 state里面的值 必须在这里修改
        SET_isCollapse(state) {
            state.isCollapse = !state.isCollapse;
            //html5 本地存储
            // sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse));
            Cookie.set('isCollapse', JSON.stringify(state.isCollapse))
        }
    },
    actions: {
        setLogin(content, data) {
            return new Promise((resolve, reject) => {
                Login(data).then((response) => {
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                })
            })
        }
    },
}

export default app;