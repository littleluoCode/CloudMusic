<template>
  <div class="home">
    <el-container class="container">
      <el-header style="height: 10%">
        <Header />
      </el-header>
      <el-container style="height: 90%">
        <el-aside width="200px">
          <Menu />
        </el-aside>
        <el-container>
          <el-scrollbar style="height: 100%">
            <el-main>
              <router-view></router-view>
            </el-main>
          </el-scrollbar>
        </el-container>
      </el-container>
    </el-container>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/layout/Header.vue";
import Menu from "@/components/layout/Menu.vue";
import Footer from "@/components/layout/Footer.vue";
export default {
  components: { Header, Menu, Footer },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>

<style lang="scss" scoped>
.container {
  width: 80%;
  height: 85vh;
  margin: 0 auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 1);

  .el-header {
    background: linear-gradient(135deg, #d31027, #ea384d);
  }
  .el-footer {
    color: #333;
    background-color: #d3dce6;
  }

  .el-aside {
    background-color: #fff;
    color: #333;
  }

  .el-main {
    background-color: #e9eef3;
    color: #333;
  }
}
/* element滚动条组件 隐藏水平滚动条 */
.container ::v-deep .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
