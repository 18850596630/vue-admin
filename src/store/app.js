import Cookie from "cookie_js";
import { Login } from "@/api/login.js";


const state = {
    isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false,
    to_ken: "",
    username: "",
};

const getters = { //computed
    count: state => state.count + 1, //ES6    
};

const mutations = {
    SET_isCollapse(state) {
        state.isCollapse = !state.isCollapse;
        //html5 本地存储
        sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse));
        // Cookie.set('isCollapse', JSON.stringify(state.isCollapse))
    },
    SET_TOKEN(state, value) {
        state.to_ken = value;
    },
    SET_USERNAME(state, value) {
        state.username = value;
    }
};

const actions = {
    setLogin(content, data) {
        return new Promise((resolve, reject) => {
            Login(data).then((response) => {
                let data = response.data.data;
                content.commit('SET_TOKEN', data.username);
                console.log(response);
                resolve(response);
            }).catch((error) => {
                reject(error);
            })
        })
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};