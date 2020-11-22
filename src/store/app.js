import { Login } from "@/api/login";
import { setToken, setUserName, getUserName, removeToken, removeUserName } from "@/utils/app";

const state = {
    isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false,
    to_ken: "",
    username: getUserName() || '',
};

const getters = { //computed
    isCollapse: state => state.isCollapse, //ES6   
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
    },
    REMOVE_TOKEN(state) {
        state.to_ken = "";
    }
};

const actions = {
    setLogin(content, data) {
        return new Promise((resolve, reject) => {
            Login(data).then((response) => {
                let data = response.data.data;
                content.commit('SET_TOKEN', data.token);
                content.commit('SET_USERNAME', data.username);
                setToken(data.token);
                setUserName(data.username);
                resolve(response);
            }).catch((error) => {
                reject(error);
            })
        })
    },
    exit({ commit }) {
        return new Promise((resolve, reject) => {
            removeToken();
            removeUserName();
            commit('SET_TOKEN', "");
            commit('SET_USERNAME', "");
            resolve();

        });

    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};