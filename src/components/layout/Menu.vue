<template>
  <!-- 左侧菜单 -->
  <div class="menu">
    <!-- 默认菜单 -->
    <div class="default_menu">
      <div
        :class="['menu_item', item.path == active ? 'menu_active' : '']"
        v-for="(item, index) in menu"
        :key="index"
        @click="changeMenu(item)"
      >
        {{ item.label }}
      </div>
    </div>

    <!-- 我的音乐 -->
    <div class="my_music">
      <h3 class="title">我的音乐</h3>
      <div
        v-show="!item.isLogin"
        :class="['menu_item', item.path == active ? 'menu_active' : '']"
        v-for="(item, index) in myMusicList"
        :key="index"
        @click="changeMenu(item)"
      >
        {{ item.label }}
      </div>
    </div>

    <!-- 我的歌单 -->
    <div class="my_playlist">
      <h3 class="title" @click="show = !show">
        <div>创建的歌单<i class="el-icon-caret-bottom"></i></div>
        <span @click.stop="addPlayList()" class="add_playlist"
          ><i class="el-icon-plus"></i
        ></span>
      </h3>

      <el-collapse-transition>
        <div v-show="show">
          <div
            v-show="!item.isLogin"
            :class="['menu_item', item.path == active ? 'menu_active' : '']"
            v-for="(item, index) in myMusicList"
            :key="index"
            @click="changeMenu(item)"
          >
            {{ item.label }}
          </div>
        </div>
      </el-collapse-transition>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: "/found",
      show: true,
      menu: [
        {
          label: "发现音乐",
          path: "/found",
        },
        {
          label: "播客",
          path: "/podcast",
        },
        {
          label: "视频",
          path: "/mv",
        },
        {
          label: "关注",
          path: "/follow",
        },
        {
          label: "直播",
          path: "/live",
        },
        {
          label: "私人FM",
          path: "/fm",
        },
      ],
      myMusicList: [
        {
          label: "本地与下载",
          icon: "",
          isLogin: false,
          path: "/local",
        },
        {
          label: "最近播放",
          icon: "",
          isLogin: false,
          path: "/lately",
        },
        {
          label: "我的音乐云盘",
          icon: "",
          isLogin: true,
          path: "/my/clouddisk",
        },
        {
          label: "我的播客",
          icon: "",
          isLogin: true,
          path: "/my/podcast",
        },
        {
          label: "我的收藏",
          icon: "",
          isLogin: true,
          path: "/my/collect",
        },
      ],
    };
  },
  methods: {
    // 切换菜单
    changeMenu(item) {
      this.active = item.path;
    },

    // 添加歌单
    addPlayList() {},
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.menu {
  padding: 10px 8px 10px 15px;
  user-select: none;
  .title {
    padding: 8px 10px;
    font-size: 13px;
    color: #999;
  }
  .menu_item {
    height: 36px;
    line-height: 36px;
    padding: 0px 10px;
    border-radius: 5px;
    margin-bottom: 5px;
    cursor: pointer;

    &:hover {
      background: rgba(238, 238, 238, 0.8);
    }
  }

  .menu_active {
    background: rgba(238, 238, 238, 0.8);
  }

  .default_menu .menu_active {
    font-size: 18px;
    font-weight: 700;
  }

  .my_music,
  .my_playlist {
    font-size: 15px;
  }

  .my_playlist {
    .title {
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &:hover > div > i {
        color: #000;
      }
      > div {
        display: flex;
        align-items: center;
        > i {
          margin-left: 3px;
        }
      }
    }
  }
}
</style>