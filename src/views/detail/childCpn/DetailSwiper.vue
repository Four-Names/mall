<template>
  <swiper :options="swiperOption" ref="mySwiper">
    <swiper-slide v-for="(item, index) in img" :key="index" class="swiper-item">
      <img :src="item" alt="" />
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";

export default {
  components: { swiper, swiperSlide },
  props: {
    img: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      imgloaded: false,
      swiperOption: {
        loop: true,
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true, //允许分页点击跳转
        },
        effect: "cube",

      },
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
  },
};
</script>
<style scoped>
.swiper-item {
  display: flex;
  justify-content: center;
  align-items: center;
}
img {
  width: 100%;
  height: 70vh;
  max-width: 45rem;
  max-height: 60rem;
}

</style>