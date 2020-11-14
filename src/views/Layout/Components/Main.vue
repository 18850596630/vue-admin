<template>
    <div id="main-wrap">
         <router-view />
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
@import "@/styles/config.scss";
#main-wrap{
    margin-top: 85px;
    margin-left:$navWidth+20px;
    height: calc(100vh - 95px);
    background-color:#ffffff;
    border-radius: 8px;
    box-shadow: 0 0 15px #eeeeee;
    margin-right: 20px;
}
</style>