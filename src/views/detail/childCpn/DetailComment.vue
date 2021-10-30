<template>
  <div>
    <div class="comment-bar">
      <span>用户评价</span><span @click="load">更多</span>
    </div>
    <div v-if="goodComment.length">
      <div class="detail_comment_main" v-for="(item, index) in goodComment" :key="index">
        <div class="user-info">
          <img :src="item.user.avatar" alt="" /><span>{{ item.user.uname}}</span>
        </div>
        <p>{{ item.content }}</p>
        <div class="comment-info">
          <span>{{ formatDate(item.created) }}</span>{{ item.style }}<span></span>
        </div>
        <div class="comment-img">
          <img
            v-for="(img, index) in item.images"
            :key="index"
            :src="img"
            alt=""
            @load="load"
          />
        </div>
      </div>
    </div>
    <div v-else class="none">
      <p>当前暂无评论，期待亲贡献第一条评论哦~</p>
    </div>
  </div>
</template>

<script>
import { debounce } from "common/utils";
export default {
  name: "DetailComment",
  props: {
    goodComment: {
      type: Array,
      default() {
        return [];
      },
    },

  },
  data() {
    return {
      load: undefined,
    };
  },
  methods: {
    formatDate(num) {
      const date = new Date(num * 1000);
      return date.toLocaleDateString().replace(/\//g, "-");
    },
    loadComments() {
      this.$emit('detailGoodResourceLoad')
    },
  },
  created() {
    this.load = debounce(this.loadComments);
  },
};
</script>
<style scoped>

.detail_comment_main {
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
  padding: 0 20px 20px 20px;
}

.comment-bar {
  display: flex;
  justify-content: space-between;

  height: 40px;
  align-items: center;
  border-bottom: 1px solid rgb(236, 236, 236);
  border-top: 3px solid rgb(238, 238, 238);
  margin-top: 5px;
  padding-left: 20px;
  padding-right: 20px;
}

.user-info {
  align-items: center;
  display: flex;
  font-size: 1.1rem;

  gap: 10px;
  height: 70px;
}

.user-info > img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.comment-info {
  font-size: 0.8rem;
  color: grey;
  height: 1.5rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
}
.comment-img {
  display: flex;
  gap: 5px;
}

.comment-img img {
  width: 75px;
  height: 70px;
}

.none {
  height: 30px;
  line-height: 30px;
  color: red;
  font-size: 1rem;
  text-align: center;
}
</style>