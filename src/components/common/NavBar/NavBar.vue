<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"/>
    </div>
    <div class="center"><slot name="center"/>
    </div>
    <div class="right"><slot name="right"/>
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
  line-height: 6.7vh;
  text-align: center;
  box-shadow: 0 1px 2px rgba(250, 235, 215, 0.623);
  height: 6.7vh;
  background-color: white;
  font-size: 3vh;
  box-sizing: border-box;
  width: 100vw;
}

.right ,.left{
  width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.right img,.left img{
  width: 26px;
}
.center {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
}
</style>