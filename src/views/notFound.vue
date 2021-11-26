<template>
  <div class="notFound">抱歉，您访问的内容不存在~</div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {
      console.log('404');
  },
};
</script>
<style scoped>
.notFound{
    width: 100vw;
    height: 100vh;
    background-color: white;
}
</style>