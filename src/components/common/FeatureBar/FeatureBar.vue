<template>
  <item-operation-bar>
    <slot slot="left"> </slot>

    <slot slot="right">
        <span @click="collect">加入关注</span>
        <span @click="remove">删除</span>
    </slot>
  </item-operation-bar>
</template>

<script>
import ItemOperationBar from "../Items/ItemOperationBar.vue";
export default {
  components: { ItemOperationBar },
  
};
</script>
<style scoped>

</style>