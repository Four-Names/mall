<template>
    <div id="tab-bar">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name:'TabBar',
}
</script>
<style>

#tab-bar{
    height: 6vh;
    width: 100vw;
    display: flex;
    background-color: rgb(255, 255, 255);
    box-shadow: 0 0 15px rgba(160, 160, 160, 0.692);
    position: fixed;
    bottom: 0;
    z-index: 3;
    justify-content: space-evenly;
}

</style>