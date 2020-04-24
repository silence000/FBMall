<template>
  <div>
    <div class="van-search-style">
      <van-search
        placeholder="请输入搜索关键词"
        background="#39a9ed"
        shape="round"
        disabled
        class=""
        @click="onClickSearchBar"
      ></van-search>
    </div>

    <van-row>
      <van-col span="6">
        <van-sidebar v-model="activeKey">
          <van-sidebar-item
            v-for="item in goodsSort"
            :key="item.id"
            :title="item.type"
            @click="onClickSidebar(item.type)"
          ></van-sidebar-item>
        </van-sidebar>
      </van-col>

      <van-col span="18">
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
      </van-col>
    </van-row>

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
import {
  List,
  Card,
  Tabbar,
  TabbarItem,
  Search,
  Sidebar,
  SidebarItem,
  Col,
  Row
} from "vant";
export default {
  components: {
    [Search.name]: Search,
    [Col.name]: Col,
    [Row.name]: Row,
    [Search.name]: Search,
    [Sidebar.name]: Sidebar,
    [SidebarItem.name]: SidebarItem,
    [List.name]: List,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Card.name]: Card
  },
  mounted() {
    this.init();
  },
  data() {
    return {
      activeKey: 0,
      goodsList: [],
      goodsSort: [],
      loading: false,
      finished: false,
      error: false,
      imgPrefix: this.$store.state.IMAGES_SERVER_API_URL,
      current: 1,
      size: 12,
      active: 1
    };
  },
  methods: {
    init() {
      const that = this;
      this.$axios
        .post(this.$store.state.PRODUCT_SERVER_API_URL + "/product/get/sort")
        .then(function(response) {
          console.log(response.data);
          that.goodsSort = response.data.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    onClickSidebar(type) {
      console.log(type);
      const that = this;
      const params = new URLSearchParams();
      params.append("type", type);
      this.$axios
        .post(
          this.$store.state.PRODUCT_SERVER_API_URL + "/product/get/cart",
          params
        )
        .then(function(response) {
          console.log(response.data);
          that.goodsList = response.data.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    onClickSearchBar() {
      console.log("点击了search");
      this.$router.push("/search");
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
<style scoped lang="scss">
.van-sidebar-item--select {
  border-color: #39a9ed;
}
.van-sidebar {
  position: fixed;
  width: 100%;
}
.van-search-style {
  height: 54px;
  .van-search {
    position: fixed;
    width: 100%;
    z-index: 1000;
  }
}
</style>
