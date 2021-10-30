<template>
  <div class="tab-bar-item" @click="itemClick">
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
  methods: {
    itemClick() {
      if (this.$route.path.indexOf(this.path) === -1)
        this.$router.replace(this.path);
    },
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1;
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
  font-size: 1.5vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.tab-bar-text-active {
  color: #ff534d;
}
</style>