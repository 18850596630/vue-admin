<template>
    <div id="nav-warp">
          菜单
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
@import "@/styles/config.scss";
#nav-warp{
    position: fixed;
    left: 0;
    top: 0;
    width: $navWidth;
    height: 100vh;
    background-color: rgb(245, 201, 148);
}
</style>