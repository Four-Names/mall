<template>
  <div class="nav-bar">
    <div class="left"><slot name="left">
      </slot>
    </div>
    <div class="center"><slot name="center">
      </slot>
    </div>
    <div class="right"><slot name="right">
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
};
</script>
<style scoped>

.nav-bar {
  display: flex;
  line-height: 5vh;
  text-align: center;
  box-shadow: 0 1px 2px rgba(250, 235, 215, 0.623);
  height: 5vh;
  background-color: antiquewhite;
  font-size: 2vh;
}



.center {
  flex: 1;
  font-weight: 600;
}
</style>