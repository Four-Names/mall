<template>
  <div>
    <item-nav-bar :path="path" :text="text" :close="close" @editing="edit" />
    <div class="item-list" v-show="hasContent">
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
    <item-operation-bar
      v-show="isEditing"
      :desc="desc"
      :isAllChoosed="isAllChoosed"
      :hasChoosed="hasChoosed"
      @resolve="resolve"
      @chooseAll="chooseAll"
      @unChooseAll="unChooseAll"
    />
    <el-empty
      style="background-color: rgb(242, 242, 242)"
      v-show="close"
      description="空空如也"
    ></el-empty>
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
    };
  },
  methods: {
    //选择商品
    choosed(goodId) {
      this.goodChoosedList.push(goodId);
    },

    //取消选择商品
    unchoosed(goodId) {
      const idx = this.goodChoosedList.indexOf(goodId);
      this.goodChoosedList.splice(idx, 1);
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

    edit(editing) {
      this.isEditing = editing;
    },
  },

  mounted() {},
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
    close() {
      return this.num == 0;
    },
  },


  watch: {
    goodChoosedList(newV) {
      this.isAllChoosed = newV.length ? newV.length == this.num : false;
    },
    num(newV) {
      if (newV == 0) {
        this.isEditing = false;
      }
    },
    isEditing(newV) {
      if (!newV) {
        this.chooseGood = false;
      }
    },
  },
  deactivated() {
    this.isEditing = false;
  },
};
</script>
<style scoped>
.item-list {
  display: flex;
  flex-direction: column;
  width: 100vw;
  padding-bottom: 7vh;
  background-color: rgb(242, 242, 242);
}

.editing {
  height: 85.9vh;
}
.noEditing {
  height: 94.3vh;
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