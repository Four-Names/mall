<template>

  <swiper :options="swiperOption" ref="mySwiper">
    <swiper-slide v-for="(item, id) in banners" :key="id">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imgLoad" />
      </a>
    </swiper-slide>

  </swiper>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";

export default {
  components: { swiper, swiperSlide },
  props: {
    banners: {
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
      },
    };
  },
  methods: {
    imgLoad() {
      if (!this.imgloaded) {
        this.imgloaded = true;
        this.$emit("imgLoad");
        this.$emit("loadDone");
      }
    },
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
  },
};
</script>
<style scoped>
img{
  width: 100vw;
}
a{
  
}
</style>