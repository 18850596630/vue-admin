<template>
    <div id="header-wrap">
        <div class="fl-left header-icon" @click="NavChange"><i class="el-icon el-icon-s-fold"></i></div>
        <div class="fl-right">
            <div class="user-icon fl-left">管理员</div>
            <div class="header-icon fl-left">
                <i class="el-icon el-icon-switch-button gray"></i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    setup(props,{ root }){
        const NavChange=()=>{
            root.$store.commit('SET_isCollapse');
            // root.$store.dispatch('setStatus');
        }
        return {
            NavChange
        }
    }
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
    @include webkit(transition,all .3s ease 0s);
    .header-icon{
        padding:0 20px;
        margin-top: 15px;
        i{
            font-size: 35px;
            color: $maincolor;
            cursor: pointer;
           
        }
        i.gray{
            color: #666666;
            font-size:30px;
        }
    }
    .user-icon{
        height: 100%;
        line-height: 60px;
        padding: 0 20px;
        font-size: 16px;
        border-right: 1px solid #eeeeee;
    }
}
.open{
    #header-wrap{
        left: $navWidth;
    }
}
.close{
    #header-wrap{
        left:$navMinWidth;
    }
}
</style>