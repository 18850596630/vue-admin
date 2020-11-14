<template>
    <div>
        <LayoutHeader />
        <LayoutNav />
        <LayoutMain />
    </div>
</template>

<script>

import LayoutNav from "./Components/Nav";
import LayoutHeader from "./Components/Header";
import LayoutMain from "./Components/Main";
export default {
    name:"Layout",
    components:{
        LayoutNav,
        LayoutHeader,
        LayoutMain
    },
    setup()
    {

    }
}
</script>

<style lang="scss" scoped>

</style>