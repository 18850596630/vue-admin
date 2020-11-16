<template>
    <div id="layout" :class="[MenuStatus?'close':'open']">
        <LayoutHeader />
        <LayoutNav />
        <LayoutMain />
    </div>
</template>

<script>

import LayoutNav from "./Components/Nav";
import LayoutHeader from "./Components/Header";
import LayoutMain from "./Components/Main";
import { computed } from '@vue/composition-api';
export default {
    name:"Layout",
    components:{
        LayoutNav,
        LayoutHeader,
        LayoutMain
    },
    setup(props,{root})
    {
        const MenuStatus = computed(()=> root.$store.state.isCollapse);

        return {
            MenuStatus
        }

    }
}
</script>

<style lang="scss" scoped>

</style>