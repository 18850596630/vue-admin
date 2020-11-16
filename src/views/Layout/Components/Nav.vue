<template>
  <div id="nav-warp">
    <h1 class="logo"><img src="@/assets/logo.png" /></h1>
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      background-color="#f5c994"
      text-color="#ffffff"
      active-text-color="#ffffff"
      router
    >
      <template v-for="(item, index) in routers">
        <el-submenu v-if="!item.hidden" :key="item.id" :index="index + ' '">
          <template slot="title">
            <i :class="item.meta.icon"></i>
            <span slot="title">{{ item.meta.name }}</span>
          </template>
          <el-menu-item
            v-for="it in item.children"
            :key="it.id"
            :index="it.path"
            >{{ it.meta.name }}</el-menu-item
          >
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { computed, reactive, ref } from "@vue/composition-api";
export default {
  name: "NavMenu",
  setup(props, { root }) {
    const routers = reactive(root.$router.options.routes);
    /**
     * computed  监听
     */
    const isCollapse = computed(()=>root.$store.state.isCollapse);  //监听 直接返回 ES6
    return {
      routers,
      isCollapse,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/config.scss";
#nav-warp {
  position: fixed;
  left: 0;
  top: 0;
  width: $navWidth;
  height: 100vh;
  background-color: rgb(245, 201, 148);
  @include webkit(transition,all .3s ease 0s)
}
.open{
  #nav-warp{
    width:$navWidth;
  }
}
.close{
  #nav-warp{
    width:$navMinWidth;
  }
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu-item i {
  color: #ffffff;
}
.logo {
  text-align: center;
  height: 60px;
  margin: 20px 0;
  img {
    height: 100%;
  }
}
</style>