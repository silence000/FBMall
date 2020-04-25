<template>
  <div>
    <div class="img">
      <img
        class="user-poster"
        src="http://localhost:8898/fbmall-images/img/user/user-bg.jpg"
        alt="userImg"
      />
      <p>{{ username }}</p>
    </div>
    <van-row class="user-links">
      <van-col span="6">
        <van-icon name="pending-payment" @click="onClickMyPoints"></van-icon>
        待付款
      </van-col>
      <van-col span="6">
        <van-icon name="records" @click="onClickCheckOrders(1)"></van-icon>
        待发货
      </van-col>
      <van-col span="6">
        <van-icon name="logistics" @click="onClickCheckOrders(2)"></van-icon>
        已发货
      </van-col>
      <van-col span="6">
        <van-icon name="completed" @click="onClickCheckOrders(3)"></van-icon>
        已完成
      </van-col>
    </van-row>

    <van-cell-group class="user-group">
      <van-cell
        icon="records"
        title="全部订单"
        is-link
        @click="onClickCheckOrders(0)"
      ></van-cell>
    </van-cell-group>

    <van-cell-group>
      <van-cell
        icon="points"
        title="我的积分"
        is-link
        @click="onClickMyPoints"
      ></van-cell>
      <van-cell
        icon="gold-coin-o"
        title="我的优惠券"
        is-link
        @click="onClickMyTicket"
      ></van-cell>
      <van-cell
        icon="friends-o"
        title="退出登录"
        is-link
        @click="onClickLogOut"
      ></van-cell>
    </van-cell-group>

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
  Row,
  Col,
  Icon,
  Cell,
  CellGroup,
  Tabbar,
  TabbarItem,
  Toast,
  Panel
} from "vant";
export default {
  components: {
    [Tabbar.name]: Tabbar,
    [Toast.name]: Toast,
    [Panel.name]: Panel,
    [TabbarItem.name]: TabbarItem,
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  },
  mounted() {
    this.init();
  },
  data() {
    return {
      active: 3,
      imgPrefix: this.$store.state.IMAGES_SERVER_API_URL,
      username: sessionStorage.getItem("nickname")
    };
  },
  methods: {
    init() {
      const that = this;
      if (sessionStorage.getItem("userId") === null) {
        Toast.fail("请先登录");
        setTimeout(function() {
          Toast.clear();
          that.$router.push("/login");
        }, 1500);
      }
    },
    onClickCheckOrders(val) {
      sessionStorage.setItem("QueryOrdersType", val);
      this.$router.push("/orders");
    },
    onClickMyPoints() {
      Toast.fail("暂无后续逻辑");
    },
    onClickMyTicket() {
      Toast.fail("暂无后续逻辑");
    },
    onClickLogOut() {
      sessionStorage.clear();
      this.$router.push("/login");
    }
  },
  computed: {},
  watch: {}
};
</script>
<style scoped lang="less">
.img {
  p {
    position: absolute;
    top: 145px;
    width: 100%;
    text-align: center;
    font-size: 18px;
  }
}
.user {
  &-poster {
    width: 100%;
    height: 53vw;
    display: block;
  }

  &-group {
    margin-bottom: 15px;
  }

  &-links {
    padding: 15px 0;
    font-size: 12px;
    text-align: center;
    background-color: #fff;

    .van-icon {
      display: block;
      font-size: 24px;
    }
  }
}
</style>
