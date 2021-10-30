<template>
  <div class="serach_main">
    <label for="search" class="mid">
      <input name="search" type="text" class="search" :placeholder="message" @click="$toast.todo"/>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default() {
        return "";
      },
    },
  },
};
</script>
<style scoped>
.serach_main {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.search {
  height: 3.5vh;
  border-radius: 18px;
  background-color: rgb(245, 245, 245);
  border: none;
  outline: none;
  font-size: 2vh;
  text-align: center;
}
.mid {
  width: 90%;
  height: 4.5vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>