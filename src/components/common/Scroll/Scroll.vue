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
    scrollBar: {
      type: Boolean,
      default() {
        return true;
      },
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, this.scrollConfig);
  },
  computed: {
    scrollConfig() {
      return this.scrollBar
        ? {
            probeType: 3,
            pullUpLoad: true,
            click: true,
            preventDefault: true,
            stopPropagation: true,
            scrollY: true,
            scrollbar: {
              fade: true,
              minSize: 1,
            },
            bounce: false,
            mouseWheel: {
              speed: 2,
              invert: false,
              easeTime: 300,
            },
          }
        : {
            probeType: 3,
            pullUpLoad: true,
            click: true,
            preventDefault: true,
            stopPropagation: true,
            scrollY: true,
            bounce: false,
            mouseWheel: {
              speed: 2,
              invert: false,
              easeTime: 300,
            },
          };
    },
  },

  methods: {
    //回到顶部
    BackTop() {
      this.scrollTo(0, 0, this.backTimer);
    },
    pullUp() {
      this.$emit("loadMore");
      //重置scroll监听
    },
    //打开pullup监听
    openPullUp() {
      this.scroll.on("pullingUp", this.pullUp);
    },

    //关闭pullup监听
    closePullUp() {
      this.scroll.finishPullUp();
      this.scroll.off("pullingUp", this.pullUp);
    },

    event(pos) {
      this.$emit("ifBottom", -pos.y > this.topPot);
      if (this.extra) this.$emit(this.extra, -pos.y);
    },
    //打开backtop监听
    openBackTop() {
      this.scroll.on("scroll", this.event);
    },
    //关闭backtop监听
    closeBackTop() {
      this.scroll.off("scroll", this.event);
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
  activated() {
    this.openBackTop();
    this.openPullUp();
  },
  deactivated() {
    this.closeBackTop();
    this.closePullUp();
  },
};
</script>
<style scoped>
</style>