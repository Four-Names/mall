<template>
  <div class="left-bar">
    <p
      class="category"
      @click="$emit('loadCategory', index)"
      :class="choosed ? 'choosed' : ''"
    >
      {{ category.title }}
    </p>
  </div>
</template>

<script>
export default {
  name: "CategoryLeftBar",
  props: {
    category: {
      type: Object,
      default() {
        return {};
      },
    },
    index: {
      type: Number,
      default() {
        return null;
      },
    },
    isEnd: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },

  data() {
    return {
      choosed: false,
    };
  },
  created() {
    if (this.isEnd) {
      this.$emit("doneCategory");
    }
  },
};
</script>
<style scoped>
.category {
  height: 50px;
  background-color: rgb(240, 240, 240);
  display: flex;
  justify-content: center;
  align-items: center;
}

.choosed {
  background-color: white;
  color: #ff534d;
  border-left: 3px solid #ff534d;
}
</style>