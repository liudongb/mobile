<template>
  <div id="app">
    <!-- <router-view v-if="!cachedViews" /> -->
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  computed: {
    cachedViews() {
      return this.$route.meta.keepAlive;
    },
  },
};
</script>
<style lang="less" scoped>
</style>