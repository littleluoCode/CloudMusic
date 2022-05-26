<template>
  <div class="search_input" ref="searchBoxRef">
    <el-input
      v-model="keyword"
      prefix-icon="el-icon-search"
      :placeholder="defaultKeyWordInfo"
      size="small"
      @focus="showSuggest"
      @input="searchSuggest"
      @keydown.native.enter="goSearch()"
    >
    </el-input>

    <!-- 搜索建议 -->
    <transition name="el-fade-in-linear">
      <div class="suggest" v-show="isHotSearch">
        <el-scrollbar v-loading="loading">
          <el-card body-style="padding:0;">
            <!-- 搜索历史 -->
            <div class="search_history" v-show="searchHistory.length !== 0">
              <div class="history_title">
                搜索历史
                <el-popconfirm
                  class="popconfirm"
                  @confirm="removeSearchHistory"
                  title="您确定要删除历史记录吗？"
                >
                  <i slot="reference" class="el-icon-delete remove_history"></i>
                </el-popconfirm>
              </div>
              <ul class="history_content">
                <li v-for="(v, k) in searchHistory" :key="k">
                  <span
                    >{{ v
                    }}<i
                      @click="delKeyword(v)"
                      class="el-icon-close icon_del"
                    ></i>
                  </span>
                </li>
              </ul>
            </div>

            <!-- 热搜 -->
            <div class="search_hot">
              <div class="hot_title">热搜榜</div>
              <ul class="hot_content">
                <li
                  v-for="(v, k) in hotSearchList"
                  :key="k"
                  @click="goSearch(v.searchWord)"
                >
                  <i :class="['num', { top_num: k < 3 }]">{{ k + 1 }}</i>
                  <div class="search_keyword">{{ v.searchWord }}</div>
                  <span class="count">{{ v.score }}</span>
                </li>
              </ul>
            </div>
          </el-card>
        </el-scrollbar>
      </div>
    </transition>

    <!-- 搜索关键词匹配 -->
    <div class="keyword" v-show="isSuggest" ref="keyword">
      <el-scrollbar v-loading="loading">
        <el-card body-style="padding: 0">
          <!-- 猜你想搜 -->
          <div class="want_search">
            <div class="title">
              <i class="el-icon-search"></i>
              猜你想搜
            </div>
            <ul>
              <li
                v-for="(v, k) in wantSearchList"
                :key="k"
                @click="goSearch(v.name)"
              >
                <div class="name">
                  <KeywordText :text="v.name" :keyword="keyword" />
                </div>
              </li>
            </ul>
          </div>
          <!-- 单曲 -->
          <div class="songs" v-show="suggest.songs">
            <div class="title">
              <i class="iconfont icon-014-music"></i>
              单曲
            </div>
            <ul>
              <li v-for="(v, k) in suggest.songs" :key="k">
                <div class="name">
                  <KeywordText :text="v.name" :keyword="keyword" />
                </div>
                -
                <div class="singer overflow">
                  <span v-for="(singer, index) in v.artists" :key="index">{{
                    singer.name
                  }}</span>
                </div>
              </li>
            </ul>
          </div>

          <!-- 歌手 -->
          <div class="singer" v-show="suggest.artists">
            <div class="title">
              <i class="iconfont icon-flyme_icon-"></i>
              歌手
            </div>
            <ul>
              <li v-for="(v, k) in suggest.artists" :key="k">
                <div class="name">
                  <KeywordText :text="v.name" :keyword="keyword" />
                </div>
              </li>
            </ul>
          </div>

          <!-- 专辑 -->
          <div class="album" v-show="suggest.albums">
            <div class="title">
              <i class="iconfont icon-zhuanji"></i>
              专辑
            </div>
            <ul>
              <li v-for="(v, k) in suggest.albums" :key="k">
                <div class="name">
                  <KeywordText :text="v.name" :keyword="keyword" />
                </div>
              </li>
            </ul>
          </div>

          <!-- 歌单 -->
          <div class="playlist" v-show="suggest.playlists">
            <div class="title">
              <i class="iconfont icon-liebiao"></i>
              歌单
            </div>
            <ul>
              <li v-for="(v, k) in suggest.playlists" :key="k">
                <div class="name">
                  <KeywordText :text="v.name" :keyword="keyword" />
                </div>
              </li>
            </ul>
          </div>
        </el-card>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import {
  hotSearch,
  searchSuggest,
  wantSearch,
  getDefaultKeyWord,
} from "@/api/search";

import KeywordText from "./KeywordText.vue";
export default {
  components: { KeywordText },
  data() {
    return {
      searchHistory: [], // 搜索历史
      hotSearchList: [], // 热搜列表
      suggest: [], // 搜索建议
      wantSearchList: [], // 猜你想搜列表
      keyword: "", // 搜索关键词
      defaultKeyWord: "", // 默认搜索关键词
      defaultKeyWordInfo: "", // 默认搜索关键词信息
      isHotSearch: false, // 是否显示热搜
      isSuggest: false, // 是否显示搜索建议
      loading: true, // 是否显示加载动画
    };
  },
  methods: {
    // 搜索
    goSearch(keyword) {
      if (keyword) {
        this.keyword = keyword;
      }

      // 判断搜索关键字是否为空
      if (this.keyword === "") {
        keyword = this.defaultKeyWord;
      } else {
        keyword = this.keyword;
      }

      // 过滤掉重复搜索关键词
      if (this.searchHistory.includes(keyword)) {
        this.searchHistory = this.searchHistory.filter((v) => {
          return v !== keyword;
        });
      }

      this.searchHistory.push(keyword);
      // 将搜索关键字存储进历史记录
      localStorage.setItem(
        "search_history",
        JSON.stringify(this.searchHistory)
      );
    },
    // 获取热搜
    async getHotSearch() {
      let res = await hotSearch();
      if (res.data.code === 200) {
        this.loading = false;
        this.hotSearchList = res.data.data;
      }
    },

    // 获取搜索建议
    async getSuggest(keywords) {
      let res = await searchSuggest({ keywords });
      if (res.data.code === 200) {
        if (JSON.stringify(res.data.result) == "{}") {
          return;
        }
        this.suggest = res.data.result;
      }
    },

    // 移除相同歌名的数据
    unique(arr) {
      for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
          if (arr[i].name == arr[j].name) {
            arr.splice(j, 1);
            j--;
          }
        }
      }
      return arr;
    },

    // 获取猜你想搜
    async getWantSearch(keywords) {
      let res = await wantSearch({ keywords, limit: 100 });
      if (res.data.code === 200) {
        this.unique(res.data.result.songs).splice(19);
        this.wantSearchList = res.data.result.songs;
      }
    },

    // 获取默认搜索关键词
    async getDefaultKeyWord() {
      let res = await getDefaultKeyWord();
      if (res.data.code === 200) {
        this.defaultKeyWordInfo = res.data.data.showKeyword;
        this.defaultKeyWord = res.data.data.realkeyword;
      }
    },

    // 搜索框的值发生改变时
    searchSuggest() {
      if (this.keyword != "") {
        let keywords = this.keyword;
        this.isSuggest = true;
        this.getSuggest(keywords);
        this.getWantSearch(keywords);
      } else {
        this.isSuggest = false;
      }
    },

    // 显示搜索建议
    showSuggest() {
      this.isHotSearch = true;
      document.addEventListener("click", this.listenClick);
    },

    // 监听全局点击事件  判断用户点击是否在输入框及内部
    listenClick(event) {
      const e = event || window.event;
      // 判断点击的地方在不在输入框盒子内， contains判断dom节点的包含关系
      if (
        this.$refs.searchBoxRef &&
        !this.$refs.searchBoxRef.contains(e.target)
      ) {
        this.isHotSearch = false;
        document.removeEventListener("click", this.listenClick);
      }
    },

    // 是否存在本地历史搜索记录
    isLocalHistory() {
      let history = JSON.parse(localStorage.getItem("search_history"));

      if (history) {
        // 存在历史记录
        this.searchHistory = history;
      }
    },

    // 删除搜索记录关键词
    delKeyword(keyword) {
      this.searchHistory = this.searchHistory.filter((v) => v !== keyword);
      localStorage.setItem(
        "search_history",
        JSON.stringify(this.searchHistory)
      );
    },

    // 清空搜索记录
    removeSearchHistory() {
      this.searchHistory = [];
      localStorage.removeItem("search_history");
    },
  },
  mounted() {
    this.isLocalHistory();
    setTimeout(this.getHotSearch, 1000);
    this.getDefaultKeyWord();
  },
};
</script>

<style lang="scss" scoped>
.search_input {
  box-sizing: border-box;
  position: relative;
  >>> .el-input__inner {
    border-radius: 20px;
    border: none;
  }
}

.keyword,
.suggest {
  position: absolute;
  top: 55px;
  left: -70px;
  width: 300px;
  height: 560px;
  user-select: none;
  z-index: 999;
}

// 搜索建议
.suggest {
  // 搜索历史
  .search_history {
    font-size: 13px;
    padding: 20px;
    .history_title {
      color: #999;
      .popconfirm {
        font-size: 16px;
        vertical-align: middle;
        cursor: pointer;
        &:hover {
          color: #000;
        }
      }
    }
    .history_content {
      margin-top: 10px;
      color: #999;
      display: flex;
      flex-wrap: wrap;

      > li {
        position: relative;
        border: 1px solid #999;
        border-radius: 20px;
        margin-right: 10px;
        margin-bottom: 10px;
        cursor: pointer;

        span {
          display: inline-block;
          margin: 3px 15px;
          font-size: 12px;

          .icon_del {
            position: absolute;
            top: 6px;
            right: 3px;
            cursor: pointer;
            display: none;
          }
        }
        &:hover {
          background: rgba(206 202 202 / 50%);
        }
        &:hover .icon_del {
          display: block;
        }
      }
    }
  }

  // 热搜榜
  .search_hot {
    margin-top: 10px;
    font-size: 12px;
    color: #999;
    .hot_title {
      padding: 0 20px;
      font-size: 14px;
    }
    .hot_content {
      margin-top: 20px;
      width: 100%;

      li {
        padding: 0 20px;
        width: 93%;
        height: 50px;
        display: flex;
        align-items: center;
        font-size: 16px;
        cursor: pointer;
        &:hover {
          background: rgba(206 202 202 / 50%);
        }
        .num {
          margin-right: 20px;
        }
        // 排名前三颜色
        .top_num {
          color: red;
        }
        .search_keyword {
          color: #000;
          font-size: 14px;
        }
        .count {
          font-size: 12px;
          margin-left: 5px;
        }
      }
    }
  }
}

// 搜索关键词匹配
.keyword {
  $keywordWidth: 400px;
  $liPadding: 10px 0px 10px 40px;
  $titlePadding: 10px 15px;
  width: $keywordWidth;
  .songs {
    .singer {
      width: 50%;
    }
  }
  .title {
    padding: $titlePadding;
    font-size: 15px;
    color: #999;
    text-align: left;
    > i {
      margin-right: 5px;
    }
    &:hover {
      color: rgb(54, 54, 54);
    }
  }
  ul {
    > li {
      display: flex;
      width: 98%;
      padding: $liPadding;
      font-size: 13px;
      &:hover {
        background: rgba(206 202 202 / 50%);
      }
    }
  }
}

// 搜索建议滚动条
.el-scrollbar ::v-deep {
  height: 100%;

  .el-scrollbar__wrap {
    overflow-y: scroll;
    overflow-x: hidden;
  }
}
.overflow {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>