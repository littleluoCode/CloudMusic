<template>
  <div class="header">
    <div class="logo">
      <h5><img src="@/assets/logo.png" alt="" width="70%" height="70%" /></h5>
      <h3>网易云音乐</h3>
    </div>
    <div class="nav">
      <div class="l-content">
        <!-- 导航箭头 -->
        <div class="nav_arrow">
          <span><i class="el-icon-arrow-left"></i></span>
          <span><i class="el-icon-arrow-right"></i></span>
        </div>
        <!-- 搜索输入框 -->
        <div class="search">
          <SearchInput />
        </div>
      </div>

      <div class="r-content">
        <!-- 用户信息栏 -->
        <div class="user_info"></div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchInput from "../search/SearchInput.vue";
export default {
  components: { SearchInput },
  name: "",
  data() {
    return {
      input2: "",
      flag: false,
    };
  },
  methods: {},
  mounted() {},
};
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  // 左侧 logo 区域
  .logo {
    width: 200px;
    display: flex;
    align-items: center;
    cursor: pointer;
    h5 {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: #fff;
      text-align: center;
      line-height: 40px;
    }
    h3 {
      color: #fff;
      margin-left: 5px;
    }
  }

  // 右侧导航区域
  .nav {
    width: 70%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .l-content {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .nav_arrow span {
      display: inline-block;
      width: 24px;
      height: 24px;
      line-height: 24px;
      text-align: center;
      background: rgba(0, 0, 0, 0.1);
      border-radius: 50%;
      cursor: pointer;
      margin-right: 5px;
      i {
        color: #fff;
        font-size: 14px;
      }
    }
  }
}
</style>