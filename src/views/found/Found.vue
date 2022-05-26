<template>
  <div class="found">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane
        v-for="(item, index) in navList"
        :key="index"
        :label="item.label"
        :name="item.path"
      ></el-tab-pane>
    </el-tabs>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      navList: [
        { label: "个性推荐", path: "/found/recommend" },
        { label: "专属定制", path: "/found/custom" },
        { label: "歌单", path: "/found/playlist" },
        { label: "排行榜", path: "/found/top" },
        { label: "歌手", path: "/found/singer" },
        { label: "最新音乐", path: "/found/new" },
      ],
      activeName: "/found/recommend",
    };
  },
  methods: {
    handleClick(tab, event) {
      this.$router.push(tab.name);
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.found ::v-deep .el-tabs {
  .is-active {
    font-size: 18px;
    font-weight: 700;
  }
  .el-tabs__active-bar {
    background: red;
  }
  .el-tabs__nav-wrap::after {
    width: 0;
  }
}
</style>