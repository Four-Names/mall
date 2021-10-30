<template>
  <div ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  props: {
    topPot: {
      type: Number,
      default() {
        return window.screen.availHeight;
      },
    },
    backTimer: {
      type: Number,
      default() {
        return 300;
      },
    },
    extra: {
      type: String,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
      scroll: null,
      scrollConfig: {
        probeType: 3,
        pullUpLoad: true,
        click: true,
        preventDefault: true,
        stopPropagation: true,
        scrollY: true,
        mouseWheel: {
          speed: 2,
          invert: false,
          easeTime: 300,
        },
      },
    };
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, this.scrollConfig);
  },

  methods: {
    //回到顶部
    BackTop() {
      this.scrollTo(0, 0, this.backTimer);
    },

    //重置scroll监听
    finishPullUp() {
      this.scroll.finishPullUp();
    },

    //打开pullup监听
    openPullUp() {
      this.scroll.on("pullingUp", () => {
        this.$emit("loadMore");
        this.finishPullUp();
      });
    },

    //打开backtop监听
    openBackTop() {
      this.scroll.on("scroll", (pos) => {
        this.$emit("ifBottom", -pos.y > this.topPot);
        if (this.extra) this.$emit(this.extra, -pos.y);
      });
    },

    scrollTo(x, y, time) {
      this.scroll.scrollTo(x, y, time);
    },
  
    getY() {
      return this.scroll.y;
    },

    refresh() {
      this.scroll.refresh();
    },
  },
};
</script>
<style scoped>
</style>