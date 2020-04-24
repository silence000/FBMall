<template>
  <div>
    <van-nav-bar
      fixed
      title="购物车"
      left-text="返回"
      @click-left="onClickLeft"
    ></van-nav-bar>

    <van-checkbox-group class="card-goods" v-model="checkedGoods">
      <van-checkbox
        class="card-goods__item"
        v-for="item in goods"
        :key="item.productId"
        :name="item.productId"
      >
        <van-swipe-cell>
          <van-card
            :title="item.productName"
            :desc="item.description"
            :num="item.numbers"
            :price="formatPrice(item.price)"
            :thumb="imgPrefix + item.imgsUrl"
          ></van-card>
          <template #right>
            <van-button
              square
              text="删除"
              type="danger"
              class="delete-button"
              @click="onClickDelete(item.productId)"
            ></van-button>
          </template>
        </van-swipe-cell>
      </van-checkbox>
    </van-checkbox-group>

    <van-submit-bar
      :price="totalPrice"
      :disabled="!checkedGoods.length"
      :button-text="submitBarText"
      @submit="onSubmit"
    ></van-submit-bar>

    <div class="cart-style">
      <van-tabbar v-model="active">
        <van-tabbar-item replace to="/main" icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item replace to="/sort" icon="points">分类</van-tabbar-item>
        <van-tabbar-item replace to="/cart" icon="shopping-cart-o"
          >购物车</van-tabbar-item
        >
        <van-tabbar-item replace to="/user" icon="user-o">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>
<script>
import {
  Checkbox,
  CheckboxGroup,
  Card,
  SubmitBar,
  Toast,
  NavBar,
  Tabbar,
  TabbarItem,
  SwipeCell,
  Button,
  Stepper
} from "vant";
export default {
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [NavBar.name]: NavBar,
    [Card.name]: Card,
    [Stepper.name]: Stepper,
    [SwipeCell.name]: SwipeCell,
    [Button.name]: Button,
    [Checkbox.name]: Checkbox,
    [SubmitBar.name]: SubmitBar,
    [CheckboxGroup.name]: CheckboxGroup
  },
  mounted() {
    this.init();
  },
  data() {
    return {
      active: 2,
      checkedGoods: [],
      goods: [],
      total: 0,
      imgPrefix: this.$store.state.IMAGES_SERVER_API_URL
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
        return;
      }
      const data = {
        number: sessionStorage.getItem("userId")
      };
      this.$axios({
        url: this.$store.state.USERS_SERVER_API_URL + "/user/get/cart",
        data: data,
        method: "post",
        header: {
          "Content-Type": "application/json"
        }
      })
        .then(function(response) {
          console.log(response.data);
          if (response.data.code === 1) {
            that.goods = response.data.data;
          } else {
            that.$toast("请求失败! ");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    formatPrice(price) {
      return price.toFixed(2);
    },

    onSubmit() {
      console.log(this.checkedGoods);
      // Toast.success("订单已成功创建, 请耐心等待配送");
      sessionStorage.setItem("checkedGoods", this.checkedGoods);
      console.log("total: " + sessionStorage.getItem("total"));
      this.$router.push("/edit/address");
    },

    onClickLeft() {
      this.$router.push("/list");
    },

    onClickDelete(id) {
      console.log("点击了删除ProductId: " + id);
      const that = this;
      const params = new URLSearchParams();
      params.append("usersId", sessionStorage.getItem("userId"));
      params.append("productId", id);
      this.axios
        .post(
          this.$store.state.USERS_SERVER_API_URL + "/user/delete/cart",
          params
        )
        .then(function(response) {
          console.log(response.data);
          if (response.data.code === 1) {
            that.init();
            Toast.success("删除成功!");
          } else {
            Toast.fail("删除失败!");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  computed: {
    submitBarText() {
      const count = this.checkedGoods.length;
      return "结算" + (count ? `(${count})` : "");
    },

    totalPrice() {
      let total = this.goods.reduce(
        (total, item) =>
          total +
          (this.checkedGoods.indexOf(item.productId) !== -1
            ? item.price * 100 * item.numbers
            : 0),
        0
      );
      sessionStorage.setItem("total", total / 100);
      return total;
    }
  },
  watch: {}
};
</script>
<style lang="less">
.card-goods {
  padding: 46px 0 10px 0;
  background-color: #fff;

  &__item {
    position: relative;
    background-color: #fafafa;

    .van-checkbox__label {
      width: 100%;
      height: auto;
      padding: 0 10px 0 15px;
      box-sizing: border-box;
    }

    .van-checkbox__icon {
      top: 50%;
      left: 10px;
      z-index: 1;
      position: absolute;
      margin-top: -10px;
    }

    .van-card__price {
      color: #f44;
    }
  }
}
.van-submit-bar {
  padding-bottom: 50px;
}
.delete-button {
  height: 100%;
}
.cart-style {
  .van-tabbar {
    z-index: 1000;
  }
}
</style>
