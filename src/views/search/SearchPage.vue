<template>
  <div class="">
    <nav-bar>
      <div slot="left" class="btn" @click="$router.go(-1)">
        <img src="~assets/img/common/left-arrow.svg" alt="" />
      </div>
      <div class="searchBar" v-show="imgLoaded" slot="center">
        <img src="~img/search/search.svg" alt="" @load="imgLoaded = true" />
        <input
          name="search"
          type="text"
          class="search"
          :placeholder="preKey"
          v-model="key"
          autocomplete="off"
          ref="input"
        />
      </div>
      <div slot="right" @click="searchGoods">搜索</div>
    </nav-bar>
    <scroll
      ref="scroll"
      v-if="goods.length"
      @loadMore="loadMore"
      @ifBottom="ifBottom"
      :topPot="736"
      :backTimer="450"
      class="scroll"
    >
      <good-list v-if="goods.length" :goods="goods" />
    </scroll>
    <el-empty v-else description="暂无商品"></el-empty>
    <back-top @click.native="$refs.scroll.BackTop" v-show="IsBottom" />
  </div>
</template>

<script>
import NavBar from "components/common/NavBar/NavBar";
import Scroll from "components/common/Scroll/Scroll";
import GoodList from "components/content/Goods/GoodList";
import BackTop from "components/content/BackTop/BackTop";
import { debounce } from "common/utils";

import { searchGood } from "network/search";

export default {
  name: "SearchPage",
  components: { NavBar, GoodList, Scroll, BackTop },
  data() {
    return {
      goods: [],
      imgLoaded: false,
      limit: 0,
      key: "",
      preKey: "",
      IsBottom: false,
    };
  },
  computed: {
    CurrentGoods() {
      return this.goods.slice(-10);
    },
  },
  watch: {
    "$route.query.key"(key) {
      this.goods = [];
      searchGood(this.key.trim(), this.limit).then((res) => {
        for (let data of res.data.data) {
          this.goods.push(JSON.parse(data.data));
        }
        this.refreSher();
        if (this.goods.length < 10) {
          this.limit = 0;
        } else {
          this.limit += 10;
        }
        this.preKey = this.key;
      });
    },
  },
  methods: {
    searchGoods() {
      if (this.key == this.$route.query.key) return;
      if (this.key.trim()) {
        this.$router.replace({ query: { key: this.key.trim() } });
      } else if (this.key.length == 0) {

        searchGood(this.preKey.trim(), this.limit).then((res) => {
          let arr = [];
          for (let data of res.data.data) {
            arr.push(JSON.parse(data.data));
          }
          this.goods.splice(0, 0, ...arr);
          this.refreSher();
          if (arr.length < 10) {
            this.limit = 0;
          } else {
            this.limit += 10;
          }
          this.key = this.preKey;
        });
      } else {
        this.$message.warning("搜索不能为空");
      }
    },

    loadMore() {
      if (this.limit < this.goods.length) return;
      searchGood(this.key.trim(), this.limit).then((res) => {
        let arr = [];
        for (let data of res.data.data) {
          arr.push(JSON.parse(data.data));
        }
        this.goods.push(...arr);

        this.refreSher();
        if (arr.length < 10) {
          this.limit = 0;
        } else {
          this.limit += 10;
        }
      });
    },

    //是否可以显示backtop
    ifBottom(tag = false) {
      this.IsBottom = tag;
    },
  },
  created() {
    this.preKey = this.$route.query.key;
  },
  mounted() {
    this.refreSher = debounce(() => {
      this.$nextTick(() => {
        this.$refs.scroll?.refresh();
      });
    });
  },
};
</script>
<style scoped>
.scroll {
  height: 92.6vh;
  overflow: hidden;
}

.btn {
  display: flex;
  width: 60px;
  justify-content: center;
  align-items: center;
  height: 100%;
  position: relative;
  z-index: 11;
}

.searchBar {
  width: 100%;
  border-radius: 25px;
  background-color: aliceblue;
  height: 80%;
  display: flex;
  flex-direction: row;
  justify-content: left;
}

.searchBar input {
  background-color: aliceblue;
  width: calc(100% - 60px);
  border-radius: 10px;
  outline: none;
}

input::selection {
  background-color: aliceblue;
}
</style>