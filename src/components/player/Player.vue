<template>
  <div class="player">
    <div class="control">
      <div class="mode">
        <i class="iconfont icon-24gl-repeat2"></i>
      </div>
      <div class="prev"><i class="iconfont icon-shangyishou"></i></div>
      <div class="play"><i class="iconfont icon-bofang"></i></div>
      <div class="next"><i class="iconfont icon-xiayishou"></i></div>
      <div class="lyric">词</div>
    </div>
    <div class="progress_box">
      <div class="start_time">00:00</div>
      <!-- <div class="progress_bar">
        <div class="current_progress"></div>
        <div class="progress_dot"></div>
      </div> -->
      <div class="progress">
        <el-progress
          color="red"
          class="progress_bar"
          style="width: 300px"
          :show-text="false"
          :percentage="50"
        >
        </el-progress>
        <div class="progress_dot"></div>
      </div>
      <div class="end_time">03:05</div>
    </div>
    <audio src="" ref="player"></audio>
  </div>
</template>

<script>
export default {
  name: "player",
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>

<style lang="scss" scoped>
.player {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .control,
  .progress {
    display: flex;
  }

  .control {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    > div {
      margin-right: 30px;

      cursor: pointer;
      &:hover {
        color: #ec4141;
      }
    }
    .play {
      width: 36px;
      height: 36px;
      padding-left: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      > i {
        font-size: 18px;
      }
      &:hover {
        color: #000;
        background: rgba(0, 0, 0, 0.2);
      }
    }
  }
  .progress_box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    font-size: 13px;
    color: #999;
    user-select: none;

    .progress_dot {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: red;
      position: absolute;
      top: -3px;
      left: 48%;
      cursor: pointer;
    }
    .progress {
      position: relative;
    }
    .progress_bar {
      width: 400px;
      height: 3px;
      margin: 0 10px;
    }
  }
}
</style>