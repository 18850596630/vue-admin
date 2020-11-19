import Vue from "vue";
import VueComposition from "@vue/composition-api";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import "./router/premit.js";

//自定义全局组件
Vue.use(VueComposition);
Vue.config.productionTip = false;


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");