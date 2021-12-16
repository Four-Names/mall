<template>
  <div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>

    <scroll
      class="Mine_Main"
      ref="scroll"
      @ifBottom="ifBottom"
      :backTimer="300"
      :topPot="480"
      v-show="main"
    >
      <common-nav-bar
        :home="true"
        :category="true"
        :cart="true"
        :setting="true"
      >
        <div slot="content">个人中心</div>
      </common-nav-bar>
      <my-header />
      <recommend ref="recommend" @loadGood="refreSher" />
    </scroll>
    <back-top @click.native="backTop" v-show="IsBottom" />
  </div>
</template>
<script>
import MyHeader from "./childCpn/MyHeader";
import CommonNavBar from "components/common/NavBar/CommonNavBar";

import Recommend from "components/common/Recommend/Recommend";
import Scroll from "components/common/Scroll/Scroll";

import BackTop from "components/content/BackTop/BackTop";

import { debounce } from "common/utils";

export default {
  name: "My",
  data() {
    return {
      IsBottom: false,
      goodRecommend: null,
      RecommendLoad: "RecommendLoad",
      refreSher:{},
    };
  },
  components: {
    MyHeader,
    Recommend,
    Scroll,
    BackTop,
    CommonNavBar,
  },
  mounted() {
    this.refreSher = debounce(() => {
      this.$nextTick(() => {
        this.$refs.scroll?.refresh();
      });
    });
  },
  computed: {
    loadif() {
      return this.loadDone < 3;
    },
    main() {
      return this.$route.name == "My";
    },
  },
  methods: {
    ifBottom(tag = false) {
      this.IsBottom = tag;
    },
    backTop() {
      this.$refs.scroll.BackTop();
    },
  },
};
</script>
<style scoped>
.Mine_Main {
  background-color: rgb(240, 240, 240);
  width: 100vw;
  height: 92.6vh;
  overflow: hidden;
}
</style>