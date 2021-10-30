 <template>
  <good-list :goods="goodRecommend" :loadName="loadName"> </good-list>
</template>
 
 <script>
import GoodList from "components/content/Goods/GoodList";
export default {
  name: "goodRecommend",
  props: {
    goodRecommend: {
      type: Array,
      default() {
        return [];
      },
    },
    loadName: {
      type: String,
      default() {
        return "";
      },
    },
  },
  components: {
    GoodList,
  },
};
</script>
 <style scoped>
</style>