<template>
  <div>
    <div class="img">
      <img
        class="user-poster"
        src="http://localhost:8890/img/user/user-bg.jpg"
        alt="userImg"
      />
      <p>{{ username }}</p>
    </div>
    <van-row class="user-links">
      <van-col span="6">
        <van-icon name="pending-payment"></van-icon>
        待付款
      </van-col>
      <van-col span="6">
        <van-icon name="records"></van-icon>
        待发货
      </van-col>
      <van-col span="6">
        <van-icon name="logistics"></van-icon>
        已发货
      </van-col>
      <van-col span="6">
        <van-icon name="completed"></van-icon>
        已完成
      </van-col>
    </van-row>

    <van-cell-group class="user-group">
      <van-cell icon="records" title="全部订单" is-link @click="onClickAllOrders"></van-cell>
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
      <!--      <van-cell icon="gift-o" title="我收到的礼物" is-link></van-cell>-->
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
  mounted() {},
  data() {
    return {
      active: 3,
      imgPrefix: this.$store.state.IMAGES_SERVER_API_URL,
      username: sessionStorage.getItem("nickname"),
    };
  },
  methods: {
    onClickAllOrders() {
      this.$router.push("/orders");
    },
    onClickMyPoints() {
      Toast.fail("暂无后续逻辑");
    },
    onClickMyTicket() {
      Toast.fail("暂无后续逻辑");
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
