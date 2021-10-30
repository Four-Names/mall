<template>
  <div class="detail_params_main">
    <p>{{ goodParams.rule.disclaimer }}</p>
    <div class="sizes">
      <div
        class="size"
        v-for="(items, index) in goodParams.rule.tables[0]"
        :key="index"
      >
        <span v-for="(item, index) in items" :key="index">{{ item }}</span>
      </div>
    </div>

    <div
      class="params"
      v-for="(item, index) in goodParams.info.set"
      :key="index"
    >
      <span>{{ item.key }}</span>
      <span>{{ item.value }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailParams",
  props: {
    goodParams: {
      type: Object,
      default() {
        return {};
      },
    },

  },
  mounted() {
    this.$emit('detailGoodResourceLoad');
  },
};
</script>
<style scoped>
.detail_params_main {
  font-size: 1rem;
  font-weight: bold;
}
p {
  margin: 10px 10px;
  text-align: center;
  color: red;
}

.params {
  display: flex;
  justify-content: space-around;
  padding: 5px;
  border-bottom: 1px solid rgb(212, 212, 212);
  width: 90%;
  margin: 0 auto;
}

.params span:nth-child(1) {
  width: 20%;
}

.params span:nth-child(2) {
  width: 60%;
  color: brown;
}
.sizes {
  border: 1px solid saddlebrown;
  border-right: none;
  border-left: none;
  text-align: center;
}

.size {
  width: 90%;
  margin: 0 auto;
  display: flex;
  padding:5px;
}

.size span {
  width: 25%;
}

.size > span:not(:nth-child(1)) {
  color: brown;
}
</style>