<template>
  <!-- 个性推荐 -->
  <div class="recommend">
    <!-- 轮播图 -->
    <div class="swiper">
      <el-carousel :autoplay="true" :interval="5000" type="card" height="185px">
        <el-carousel-item v-for="(item, index) in bannerList" :key="index">
          <div class="img">
            <img
              style="width: 100%; border-radius: 10px"
              :src="item.imageUrl"
            />
            <span class="tag" :style="{ background: item.titleColor }">{{
              item.typeTitle
            }}</span>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>

    <!-- 推荐歌单 -->
    <div class="playlist">
      <h3 class="title">
        推荐歌单
        <i class="el-icon-arrow-right"></i>
      </h3>
      <ul class="content">
        <li class="playlist_item">
          <div class="img">
            <img
              src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
              alt=""
            />
            <div class="play_icon">
              <i class="iconfont icon-bofang"></i>
            </div>
          </div>
          <div class="playlist_title">每日歌曲推荐</div>
        </li>
        <li
          v-for="(item, index) in playlist"
          :key="index"
          class="playlist_item"
        >
          <div class="img">
            <img :src="item.picUrl" alt="" />
            <div class="play_count">
              <i class="iconfont icon-24gl-play"></i
              >{{ item.playCount | numberFormat }}
            </div>
            <div class="play_icon">
              <i class="iconfont icon-bofang"></i>
            </div>
          </div>
          <div class="playlist_title">{{ item.name }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getBanner, getPlayList } from "@/api/found/recommend";
export default {
  name: "",
  data() {
    return {
      bannerList: [], // 轮播图
      playlist: [], // 推荐歌单
    };
  },
  methods: {
    async getBanner() {
      let res = await getBanner();
      if (res.data.code == 200) {
        this.bannerList = res.data.banners;
      }
    },
    async getPlayList() {
      let res = await getPlayList();
      if (res.data.code == 200) {
        this.playlist = res.data.result;
      }
      console.log(this.playlist);
    },
  },
  filters: {
    numberFormat(value) {
      let unit = "";
      var k = 10000,
        sizes = ["", "万", "亿", "万亿"],
        i;
      if (value < k) {
        value = value;
      } else {
        i = Math.floor(Math.log(value) / Math.log(k));
        value = (value / Math.pow(k, i)).toFixed(2);
        unit = sizes[i];
      }
      return value + unit;
    },
  },
  mounted() {
    this.getBanner();
    this.getPlayList();
  },
};
</script>

<style lang="scss" scoped>
// 轮播图
.swiper ::v-deep .el-carousel {
  .el-carousel__item {
    border-radius: 10px;
    .img {
      position: relative;
      .tag {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 80px;
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        text-align: center;
        color: #fff;
        border-top-left-radius: 10px;
      }
    }
  }
}

// 推荐歌单
.playlist {
  .title {
    font-weight: 700;
    cursor: pointer;
  }

  .content {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    .playlist_item {
      width: 18%;
      height: 200px;
      margin-right: 20px;
      margin-bottom: 50px;
      cursor: pointer;
      .img {
        position: relative;
        img {
          width: 100%;
          border-radius: 10px;
        }
        &:hover .play_icon {
          opacity: 1;
        }
      }
      .playlist_title {
        font-size: 14px;
        margin-top: 10px;
        color: #555;
        &:hover {
          color: #000;
        }
      }

      .play_count {
        position: absolute;
        top: 5px;
        right: 10px;
        font-size: 12px;
        color: #fff;
        display: flex;
        align-items: center;
        .iconfont {
          margin-right: 2px;
          font-size: 12px;
        }
      }
      .play_icon {
        position: absolute;
        bottom: 15px;
        right: 10px;
        width: 36px;
        height: 36px;
        text-align: center;
        line-height: 36px;
        border-radius: 50%;
        background: #fff;
        opacity: 0;
        transition: all linear 0.5s;
        .iconfont {
          color: red;
          margin-left: 3px;
        }
      }
    }
  }
}
</style>