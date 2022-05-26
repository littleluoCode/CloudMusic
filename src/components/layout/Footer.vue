<template>
  <div class="footer">
    <div class="music_info">
      <div class="music_img"></div>
      <div class="info">
        <div class="music_name">
          <div class="name">来不及(Live)</div>
          <i class="iconfont icon-xihuan1"></i>
        </div>
        <div class="singer">
          <span>沈以诚</span>
          <em> / </em>
          <span>杜宣达</span>
        </div>
      </div>
    </div>
    <!-- 播放器 -->
    <div class="player">
      <Player />
    </div>

    <!-- 右侧控件 -->
    <div class="control">
      <div class="tone">标准</div>

      <!-- 音量 -->
      <div class="voice" @click="mute" ref="popover" @mouseover="showPopover">
        <i
          slot="reference"
          :class="[
            'iconfont',
            voiceDisable ? 'icon-volumeDisable' : 'icon-volumeMiddle',
          ]"
        ></i>
        <transition name="el-fade-in-linear">
          <div v-show="isShowPopover" class="popover">
            <el-slider
              :show-tooltip="false"
              height="100px"
              vertical
              v-model="voice"
              @change="volume"
            ></el-slider>
            <div class="popper_arrow"></div>
          </div>
        </transition>
      </div>
      <div class="play_list"><i class="iconfont icon-playlist"></i></div>
    </div>
  </div>
</template>

<script>
import Player from "@/components/player/Player";
export default {
  name: "",
  components: { Player },
  data() {
    return {
      isShowPopover: false, // 是否显示音量控制
      voiceDisable: false, // 静音
      voice: 50, // 默认音量
      currentVoice: 50, // 当前音量
    };
  },
  methods: {
    // 显示音量调节
    showPopover() {
      document.addEventListener("mouseover", this.listenMouse);
    },

    // 监听全局鼠标移入事件  判断用户移入是否在内部
    listenMouse(event) {
      const e = event || window.event;
      // 判断移入的地方在不在输入框盒子内， contains判断dom节点的包含关系
      if (this.$refs.popover && !this.$refs.popover.contains(e.target)) {
        this.isShowPopover = false;
        document.removeEventListener("mouseover", this.listenMouse);
      } else {
        this.isShowPopover = true;
      }
    },
    // 静音
    mute(e) {
      e.target.nodeName == "I" ? (this.voiceDisable = !this.voiceDisable) : "";
    },
    // 音量调节
    volume(value) {
      this.currentVoice = value;
      value == 0 ? (this.voiceDisable = true) : (this.voiceDisable = false);
    },
  },
  watch: {
    // 监听音量是否静音
    voiceDisable(newVal) {
      newVal ? (this.voice = 0) : (this.voice = this.currentVoice);
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.footer {
  width: 90%;
  height: 12vh;
  margin: 0 auto;
  padding: 10px 20px;
  background: #12c2e9; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #f64f59,
    #c471ed,
    #12c2e9
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #f64f59,
    #c471ed,
    #12c2e9
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  box-shadow: 20px 20px 60px #cda7a7;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;

  .music_info {
    display: flex;
    align-items: center;
    .music_img {
      width: 60px;
      height: 60px;
      background: pink;
      border-radius: 6px;
    }
    .info {
      color: #555;
      margin-left: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .music_name {
        display: flex;
        align-items: center;
        cursor: pointer;
        .name,
        .iconfont {
          &:hover {
            color: #000;
          }
        }

        .iconfont {
          margin-left: 5px;
          font-size: 20px;
          cursor: pointer;
        }
      }
      .singer {
        cursor: default;
        margin-top: 5px;
        span {
          cursor: pointer;
          &:hover {
            color: #000;
          }
        }
      }
    }
  }

  .control {
    display: flex;
    align-items: center;

    > div {
      margin-right: 20px;
      cursor: pointer;
      .iconfont {
        font-size: 18px;
        font-weight: 500;
      }
    }

    .tone {
      width: 40px;
      height: 20px;
      text-align: center;
      line-height: 20px;
      font-size: 14px;
      border: 1px solid #000;
    }

    .voice {
      position: relative;
      .popover {
        position: absolute;
        height: 130px;
        top: -140px;
        left: -13px;
        padding-top: 10px;
        background: #fff;
        border-radius: 4px;
        border: 1px solid #ebeef5;
        z-index: 2000;
        color: #606266;
        box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);

        .popper_arrow {
          position: absolute;
          display: block;
          border-color: transparent;
          border-style: solid;
          bottom: -13px;
          left: 36%;
          margin-right: 3px;
          border-top-color: #ebeef5;
          border-bottom-width: 0;
          border-width: 6px;
          filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.03));

          &::after {
            content: "";
            bottom: 1px;
            margin-left: -6px;
            border-top-color: #fff;
            position: absolute;
            display: block;
            border-width: 6px;
            width: 0;
            height: 0;
            border-color: transparent;
            border-style: solid;
          }
        }
      }
    }
  }
}
</style>