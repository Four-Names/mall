<template>
  <div>
    <item-nav-bar :path="path" :text="text" :close="close" />

    <div v-show="hasContent">
      <scroll
        class="item-scroll"
        :class="calcHight"
        ref="scroll"
        @ifBottom="ifBottom"
        :backTimer="300"
      >
        <div class="item-list">
          <item
            v-for="(goodId, index) in ItemObj"
            :goodId="index"
            :goodObj="goodId"
            :isEditing="isEditing"
            :chooseGood="chooseGood"
            :key="index"
            @choosed="choosed"
            @unchoosed="unchoosed"
          />
        </div>
      </scroll>
      <back-top class="backTop" @click.native="backTop" v-show="IsBottom" />
      <item-operation-bar
        :desc="desc"
        :isEditing="isEditing"
        :isAllChoosed="isAllChoosed"
        :hasChoosed="hasChoosed"
        @resolve="resolve"
        @chooseAll="chooseAll"
        @unChooseAll="unChooseAll"
      />
    </div>
    <div v-show="close" class="empty">空空如也</div>
  </div>
</template>

<script>
import Item from "./Item";
import Scroll from "../Scroll/Scroll";
import BackTop from "components/content/BackTop/BackTop";
import ItemOperationBar from "./ItemOperationBar";
import ItemNavBar from "./ItemNavBar";

export default {
  components: { Item, Scroll, BackTop, ItemOperationBar, ItemNavBar },
  props: ["event", "desc", "path", "ItemObj", "text", "num"],
  data() {
    return {
      IsBottom: false,
      isEditing: false,
      goodChoosedList: [],
      isAllChoosed: false,
      chooseGood: false,  
      close: false,
    };
  },
  methods: {

    //backTop是否显示的依据
    ifBottom(tag = false) {
      this.IsBottom = tag;
    },

    //选择商品
    choosed(goodId) {
      this.goodChoosedList.push(goodId);
    },

    //取消选择商品
    unchoosed(goodId) {
      const idx = this.goodChoosedList.indexOf(goodId);
      this.goodChoosedList.splice(idx, 1);
    },

    //返回顶部
    backTop() {
      this.$refs.scroll.BackTop();
    },

    //处理对应的事件
    resolve() {
      this.$emit(this.event, this.goodChoosedList);
      this.goodChoosedList = [];
    },

    //选择所有商品
    chooseAll() {
      this.chooseGood = this.isAllChoosed = true;
    },

    //不选择商品
    unChooseAll() {
      this.chooseGood = this.isAllChoosed = false;
    },
  },

  activated() {

    if (this.ItemObj) {
      this.$refs.scroll.openBackTop();
      this.$refs.scroll.openPullUp();
    }
    this.$refs.scroll?.refresh();

    this.$bus.$on("editing", (isEditing) => {
      this.isEditing = isEditing;
    });

    this.close = this.num == 0;

  },
  computed: {
    calcHight() {
      return this.isEditing ? "editing" : "noEditing";
    },
    hasChoosed() {
      return this.goodChoosedList.length != 0;
    },
    hasContent() {
      return this.ItemObj && !this.close;
    },
  },

  updated() {
    this.$refs?.scroll.refresh();
  },
  watch: {
    goodChoosedList(newV) {
      this.isAllChoosed = newV.length ? newV.length == this.num : false;
    },
    num(newV) {
      if (newV == 0) {
        this.close = true;
        this.isEditing = false;
      }
    },
    isEditing(newV) {
      if (!newV) {
        this.chooseGood = false;
      }
    },
    num(newV) {
      this.close = newV == 0;
    },
  },

};
</script>
<style scoped>
.item-list {
  display: flex;
  flex-direction: column;
  width: 100vw;
}
.item-scroll {
  overflow: hidden;
  z-index: 5;
}

.editing {
  /* height: calc(100vh - 97px); */
  height: 89vh;  

}
.noEditing {
  /* height: calc(100vh - 44px); */
  height: 95vh; 

}

.empty {
  top: 50vh;
  position: fixed;
  width: 100vw;
  text-align: center;
  color: gray;
  font-size: 1.2rem;
}
</style>