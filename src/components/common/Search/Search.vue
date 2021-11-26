<template>
  <div class="serach_main">
    <div class="mid">
      <img src="~img/search/search.svg" alt="" />
      <input
        name="search"
        type="text"
        class="search"
        :placeholder="message"
        @click="$toast.todo"
      />
    </div>
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
  height: 5vh;
  border: none;
  outline: none;
  font-size: 2vh;
  text-align: left;
  background-color: rgb(245, 245, 245);
  width: calc(100% - 40px);
}
.mid {
  width: 100%;
  height: 6vh;
  display: flex;
  justify-content: left;
  align-items: center;
  border-radius: 18px;
  background-color: rgb(245, 245, 245);
}
</style>