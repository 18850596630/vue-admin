<template>
  <div>
      <svg :class="ClassName" aria-hidden="true">
         <use :xlink:href="SvgIncon"></use>
      </svg>
  </div>
</template>

<script>
import { computed, ref } from '@vue/composition-api'
export default {
   name:"svgIcon",
   props:["iconClass","className"],
   setup(props,{})
   {
     console.log(props.iconClass);
     const msg=ref("图标Svg");

     const SvgIncon=computed(()=>{
        return `#icon-${props.iconClass}`;
     });
     const ClassName=computed(()=>{
       if(props.className)
       {
          return `svg-icon ${props.className}`;
       }else{
         return 'svg-icon';
       }
     })

     return {
       SvgIncon,
       ClassName
     }
   }
}
</script>

<style>

</style>