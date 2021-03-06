import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

//引入布局组件
import Layout from "@/views/Layout/";


const routes = [{
        path: "/",
        redirect: "login",
        hidden: true,
        meta: {
            name: "主页"
        }
    },
    {
        path: "/login",
        name: "Login",
        hidden: true,
        meta: {
            name: "登录"
        },
        component: () =>
            import ("../views/Login/index.vue"),

    },
    {
        path: "/console",
        name: "Console",
        redirect: "index",
        meta: {
            name: "控制台",
            icon: "el-icon-s-platform"
        },
        component: Layout,
        children: [{
            path: "/index",
            name: "Index",
            meta: {
                name: "首页"
            },
            component: () =>
                import ("../views/Console/index.vue"),
        }]
    },
    {
        path: "/info",
        name: "Info",
        meta: {
            name: "信息管理",
            icon: "el-icon-files"
        },
        component: Layout,
        children: [{
                path: "/infoindex",
                name: "InfoIndex",
                meta: {
                    name: "信息列表"
                },
                component: () =>
                    import ("../views/Info/index.vue"),
            },
            {
                path: "/infocate",
                name: "InfoCate",
                meta: {
                    name: "信息分类"
                },
                component: () =>
                    import ("../views/Info/indexCategory.vue"),
            }
        ]
    },
    {
        path: "/user",
        name: "User",
        meta: {
            name: "用户管理",
            icon: "el-icon-user-solid"
        },
        component: Layout,
        children: [{
            path: "/userIndex",
            name: "UserIndex",
            meta: {
                name: "用户列表"
            },
            component: () =>
                import ("../views/User/index.vue"),
        }, ]
    }
];
const router = new VueRouter({
    routes
});

export default router;