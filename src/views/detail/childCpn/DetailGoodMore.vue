<template>
  <div class="goodImages">
    <img
      v-for="(item, index) in goodImages"
      :key="index"
      :src="item"
      alt=""
      @load="load"
    />
  </div>
</template>

<script>
import { debounce } from "common/utils";
export default {
  name: "DetailGoodMore",
  props: {
    goodImages: {
      type: Array,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      load:undefined,
    }
  },
  methods: {
    imgLoad() {
      this.$emit('detailGoodResourceLoad')
    },
  },
  created() {
    this.load = debounce(this.imgLoad)
  },
};
</script>
<style scoped>

.goodImages {
  width: 100vw;
}

.goodImages img {
  width: 100vw;
}
</style>