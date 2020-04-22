<template>
  <div>
    <div class="van-nav-style">
      <van-nav-bar
        title="全部订单"
        left-text="返回"
        @click-left="onClickLeft"
      ></van-nav-bar>
    </div>

    <van-tabs v-model="active">
      <van-tab title="待付款">>内容 1</van-tab>
      <van-tab title="待发货">内容 2</van-tab>
      <van-tab title="已发货">内容 3</van-tab>
      <van-tab title="已完成">
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
            num="2"
            currency=""
            :key="item.id"
            :price="formatPrice(item.price * 2)"
            :desc="item.description"
            :title="item.productName"
            :thumb="imgPrefix + item.imgsUrl.toString()"
            @click="handleClick(item.id)"
          >
            <template #footer>
              <van-button size="mini">评价</van-button>
              <van-button size="mini" type="danger">再次购买</van-button>
            </template>
          </van-card>
        </van-list>
      </van-tab>
    </van-tabs>
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
  Tabs
} from "vant";
export default {
  components: {
    [List.name]: List,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Button.name]: Button,
    [NavBar.name]: NavBar,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Card.name]: Card
  },
  mounted() {},
  data() {
    return {
      goodsList: [],
      loading: false,
      finished: false,
      error: false,
      imgPrefix: this.$store.state.IMAGES_SERVER_API_URL,
      active: 3,
      current: 1,
      size: 12
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push("/user");
    },
    formatPrice(price) {
      return "总价：¥" + price.toFixed(2);
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
