<template>
    <div id="main-wrap">
        <div class="content">
            <router-view />
        </div>
    </div>
</template>

<script>
export default {
    name:"LayoutMain",
    setup(props,{root})
    {
        // JSON.stringify()  JSON 对象转化 字符串格式
        // JSON.parse()    字符串 转化 JSON 对象
       
    }
    
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
     @include webkit(transition,all .3s ease 0s);
    .content{
        width: 100%;
        height: 100%;
        padding: 20px;
        box-sizing: border-box;
        background-color: #ffffff;
    }
}
.open{
    #main-wrap{
         margin-left:$navWidth+20px;
    }
}
.close{
    #main-wrap{
         margin-left:$navMinWidth+20px;
    }
}
</style>