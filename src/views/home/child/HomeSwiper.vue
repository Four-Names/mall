<template>
  <div class="father">
    <div id="swiper">
      <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide v-for="(item, id) in banners" :key="id" class="img">
          <a :href="item.link">
            <img :src="item.image" alt="" @load="imgLoad" />
          </a>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <div class="backgroud"></div>
  </div>
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
        pagination: {
          el: ".swiper-pagination",
          type: "bullets",
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
img {
  width: 100vw;
  height: 25vh;
}

.father {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
}
#swiper {
  width: 90vw;
  border-radius: 10px;
}
.backgroud {
  position: absolute;
  top: 0;
  width: 100vw;
  height: 75%;
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
  background: linear-gradient(#ff1717, #e66465);
}
</style>