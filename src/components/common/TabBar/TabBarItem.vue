<template>
  <div class="tab-bar-item" @click="$router.push(path)">
    <div class="icon" v-if="!isActive">
      <slot name="item-icon" />
    </div>
    <div class="icon" v-else>
      <slot name="item-icon-active" />
    </div>
    <div class="tab-bar-text" :class="isActive ? 'tab-bar-text-active' : ''">
      <slot name="item-text" />
    </div>
    <slot />
  </div>
</template>
<script>
export default {
  name: "TabBarItem",
  props: {
    path: {
      tyoe: String,
      default() {
        return "";
      },
    },
  },
  data() {
    return {
      Active: false,
    };
  },
  computed: {
    isActive() {
      return this.$route.path.includes(this.path);
    },
  },
};
</script>
<style scoped>
.tab-bar-item {
  /* width: 90px; */
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.icon {
  display: flex;
  justify-content: center;
  align-items: center;
}

.tab-bar-text {
  color: #8a8a8a;
  font-size: 2vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.tab-bar-text-active {
  color: #ff534d;
}
</style>