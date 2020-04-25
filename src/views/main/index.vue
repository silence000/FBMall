<template>
  <div>
    <div class="van-search-style">
      <van-search
        placeholder="请输入搜索关键词"
        background="#39a9ed"
        shape="round"
        disabled
        @click="onClickSearchBar"
      ></van-search>
    </div>

    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img
          style="height: 150px"
          v-lazy="image"
          alt="images"
          @click="onClickClassify"
        />
      </van-swipe-item>
    </van-swipe>

    <van-grid>
      <van-grid-item
        icon="shopping-cart-o"
        text="方便超市"
        @click="onClickClassify"
      ></van-grid-item>
      <van-grid-item
        icon="good-job-o"
        text="个护清洁"
        @click="onClickClassify"
      ></van-grid-item>
      <van-grid-item
        icon="desktop-o"
        text="电脑办公"
        @click="onClickClassify"
      ></van-grid-item>
      <van-grid-item
        icon="wap-home-o"
        text="家用电器"
        @click="onClickClassify"
      ></van-grid-item>
      <van-grid-item
        icon="shop-o"
        text="食品生鲜"
        @click="onClickClassify"
      ></van-grid-item>
      <van-grid-item
        icon="point-gift-o"
        text="酒水饮料"
        @click="onClickClassify"
      ></van-grid-item>
      <van-grid-item
        icon="flower-o"
        text="医药保健"
        @click="onClickClassify"
      ></van-grid-item>
      <van-grid-item
        icon="logistics"
        text="户外运动"
        @click="onClickClassify"
      ></van-grid-item>
    </van-grid>

    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="getGoodsList"
    >
      <van-card
        v-for="item in goodsList"
        :key="item.id"
        :price="formatPrice(item.price)"
        :desc="item.description"
        :title="item.productName"
        :thumb="imgPrefix + item.imgsUrl.toString()"
        @click="handleClick(item.id)"
      ></van-card>
    </van-list>

    <van-tabbar v-model="active">
      <van-tabbar-item replace to="/main" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/sort" icon="points">分类</van-tabbar-item>
      <van-tabbar-item replace to="/cart" icon="shopping-cart-o"
        >购物车</van-tabbar-item
      >
      <van-tabbar-item replace to="/user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import Vue from "vue";
import {
  List,
  Card,
  Tabbar,
  TabbarItem,
  Search,
  Swipe,
  SwipeItem,
  Lazyload,
  Grid,
  GridItem
} from "vant";
Vue.use(Lazyload);
export default {
  components: {
    [Search.name]: Search,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [List.name]: List,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Card.name]: Card
  },
  mounted() {},
  data() {
    return {
      imgPrefix: this.$store.state.IMAGES_SERVER_API_URL,
      images: [
        "http://localhost:8898/fbmall-images/img/banner/banner1.jpg",
        "http://localhost:8898/fbmall-images/img/banner/banner2.jpg"
      ],
      goodsList: [],
      loading: false,
      finished: false,
      error: false,
      current: 1,
      size: 12,
      active: 0
    };
  },
  methods: {
    onClickSearchBar() {
      console.log("点击了search");
      this.$router.push("/search");
    },
    onClickClassify() {
      this.$router.push("/sort");
    },
    handleClick(id) {
      console.log("点击了卡片" + id);
      sessionStorage.setItem("selectedProductId", id);
      this.$router.push("/goods");
    },
    formatPrice(price) {
      return price.toFixed(2);
    },
    getGoodsList() {
      const that = this;
      const data = {
        current: this.current,
        size: this.size
      };
      this.axios({
        url: this.$store.state.PRODUCT_SERVER_API_URL + "/product/get/list",
        data: data,
        method: "post",
        header: {
          "Content-Type": "application/json"
        }
      })
        .then(function(response) {
          console.log(response.data);
          that.goodsList = response.data.data;
          // 加载状态结束
          that.loading = false;
          // 数据全部加载完成
          that.finished = true;
        })
        .catch(function(error) {
          console.log(error);
          // 出现错误
          that.error = true;
        });
    }
  },
  computed: {},
  watch: {}
};
</script>
<style scoped lang="less">
.van-search-style {
  height: 54px;
  .van-search {
    position: fixed;
    width: 100%;
    z-index: 1000;
  }
}
</style>
