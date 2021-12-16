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
  },
  data() {
    return {
      scroll: null,
      bottom: false,
      scrollConfig: {
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
      },
    };
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, this.scrollConfig);
    this.openBackTop();
    this.openPullUp();
  },

  methods: {
    //回到顶部
    BackTop() {
      this.scrollTo(0);
    },
    //准备好下一次的 pullingUp 钩子
    finishPullUp() {
      this.scroll.finishPullUp();
    },

    pullUp() {
      this.$emit("loadMore");
      this.finishPullUp();
      //重置scroll监听
    },
    //打开pullup监听
    openPullUp() {
      this.scroll.on("pullingUp", this.pullUp);
    },

    //关闭pullup监听
    closePullUp() {
      this.scroll.off("pullingUp", this.pullUp);
    },

    event(pos) {
      this.bottom = -pos.y > this.topPot;
    },

    //打开backtop监听
    openBackTop() {
      this.scroll.on("scroll", this.event);
    },

    //关闭backtop监听
    closeBackTop() {
      this.scroll.off("scroll", this.event);
    },

    scrollTo(y, time = this.backTimer) {
      this.scroll.scrollTo(0, y, time);
    },

    refresh() {
      this.scroll.refresh();
    },

    getY() {
      return -this.scroll.y;
    },
  },
  watch: {
    bottom(newV) {
      this.$emit("ifBottom", newV);
    },
  },
  deactivated() {
    this.closeBackTop();
    this.closePullUp();
  },
  activated() {
    this.openBackTop();
    this.openPullUp();
    this.refresh();
  },
};
</script>
<style scoped>
</style>