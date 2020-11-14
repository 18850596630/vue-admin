<template>
    <div id="header-wrap">
        头部
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
@import "@/styles/config.scss";
#header-wrap{
    position: fixed;
    top: 0;
    left: $navWidth;
    right: 0;
    height: 60px;
    background-color: #ffffff;
    box-shadow: 0 4px 15px #eeeeee;
}
</style>