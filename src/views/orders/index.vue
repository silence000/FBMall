<template>
  <div>
    <div class="van-nav-style">
      <van-nav-bar
        title="订单中心"
        left-text="返回"
        @click-left="onClickLeft"
      ></van-nav-bar>
    </div>

    <van-tabs v-show="showTabs" @click="onClick" v-model="active">
      <van-tab title="待付款"></van-tab>
      <van-tab title="待发货"></van-tab>
      <van-tab title="已发货"></van-tab>
      <van-tab title="已完成"></van-tab>
    </van-tabs>

    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="getOrders"
    >
      <van-card
        v-for="item in goodsList"
        :num="item.number"
        currency=""
        :key="item.productId"
        :price="formatPrice(item.price * 2)"
        :desc="item.description"
        :title="item.productName"
        :thumb="imgPrefix + item.imgUrl.toString()"
        @click="handleClick(item.productId)"
      >
        <template #footer>
          <van-button size="mini" @click="onClickEvaluate(item.productId)"
            >评价</van-button
          >
          <van-button
            size="mini"
            type="danger"
            @click="onClickBuyAgain(item.productId)"
            >再次购买</van-button
          >
        </template>
      </van-card>
    </van-list>
  </div>
</template>
<script>
import {
  List,
  Card,
  Tabbar,
  TabbarItem,
  NavBar,
  Button,
  Tab,
  Tabs,
  Toast
} from "vant";
export default {
  components: {
    [Toast.name]: Toast,
    [List.name]: List,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Button.name]: Button,
    [NavBar.name]: NavBar,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Card.name]: Card
  },
  mounted() {
    this.init();
  },
  data() {
    return {
      goodsList: [],
      showTabs: true,
      loading: false,
      finished: false,
      error: false,
      imgPrefix: this.$store.state.IMAGES_SERVER_API_URL,
      active: 2,
      current: 1,
      size: 12
    };
  },
  methods: {
    init() {
      console.log(this.active);
      this.active = parseInt(sessionStorage.getItem("QueryOrdersType"));
      if (sessionStorage.getItem("QueryOrdersType") === "0") {
        this.showTabs = false;
      }
    },
    getOrders() {
      const that = this;
      const params = new URLSearchParams();
      params.append("customerId", sessionStorage.getItem("userId"));
      params.append("status", sessionStorage.getItem("QueryOrdersType"));
      this.$axios
        .post(this.$store.state.ORDER_SERVER_API_URL + "/order/get/id", params)
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
        });
    },
    onClick(name) {
      if (name !== 0) {
        sessionStorage.setItem("QueryOrdersType", name);
        this.getOrders();
      } else {
        Toast.fail("暂无后续逻辑");
      }
    },
    handleClick(val) {
      console.log(val);
      sessionStorage.setItem("selectedProductId", val);
      this.$router.push("/goods");
    },
    onClickLeft() {
      this.$router.push("/user");
    },
    onClickEvaluate(id) {
      console.log(id);
      Toast.fail("暂无后续逻辑");
    },
    onClickBuyAgain(id) {
      sessionStorage.setItem("selectedProductId", id);
      this.$router.push("/goods");
    },
    formatPrice(price) {
      return "总价：¥" + price.toFixed(2);
    }
  },
  computed: {},
  watch: {}
};
</script>
<style scoped lang="less">
.van-nav {
  &-style {
    height: 46px;
  }
  &-bar {
    position: fixed;
    width: 100%;
  }
}
.van-card_ {
  &_title {
    font-size: 14px;
  }
  &_price-integer {
    font-size: 14px;
  }
  &_price-decimal {
    font-size: 14px;
  }
  &_footer {
    button + button {
      padding: 0 5px 0 5px;
    }
  }
}
</style>
