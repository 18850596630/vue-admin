import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isCollapse: false,
        count: 1,
    },
    getters: { //computed
        count: state => state.count + 1, //ES6    
    },
    mutations: { //修改 state里面的值 必须在这里修改
        SET_COUNT(state, value) {
            state.count = value;
            console.log(state.count);
        },
        SET_isCollapse(state, value) {
            state.isCollapse = !state.isCollapse;
            console.log(state.isCollapse);
        }
    },
    actions: {},
    modules: {}
});