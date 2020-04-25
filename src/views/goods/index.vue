<template>
  <div class="goods">
    <van-nav-bar
      fixed
      title="商品详情"
      left-text="返回"
      @click-left="onClickLeft"
    ></van-nav-bar>

    <van-swipe class="goods-swipe" :autoplay="3000">
      <van-swipe-item v-for="imgsUrl in goods.imgsUrl" :key="imgsUrl">
        <img :src="imgPrefix + imgsUrl" alt="thumb" />
      </van-swipe-item>
    </van-swipe>

    <van-cell-group>
      <van-cell>
        <div class="goods-title">{{ goods.productName }}</div>
        <div class="goods-price">{{ formatPrice(goods.price) }}</div>
      </van-cell>
      <van-cell class="goods-express">
        <van-col span="14"
          >剩余：{{ formatRepertory(goods.repertory) }}</van-col
        >
      </van-cell>
    </van-cell-group>

    <van-cell-group class="goods-cell-group">
      <van-cell icon="shop-o">
        <template slot="title">
          <span class="van-cell-text">方便商城</span>
          <van-tag class="goods-tag" type="danger">官方</van-tag>
        </template>
      </van-cell>
      <van-cell
        title="线下门店：XX省 XXX市 XXX区 XXX小区方便超市"
        icon="location-o"
      ></van-cell>
    </van-cell-group>

    <van-cell-group class="goods-cell-group">
      <van-panel title="商品分类">
        <div class="goods-desc">{{ goods.type }}</div>
      </van-panel>
      <van-panel title="生产厂商">
        <div class="goods-desc">{{ goods.company }}</div>
      </van-panel>
      <van-panel title="商品详情">
        <div class="goods-desc">{{ goods.description }}</div>
      </van-panel>
    </van-cell-group>

    <van-goods-action>
      <van-goods-action-icon icon="chat-o" @click="sorry">
        客服
      </van-goods-action-icon>
      <van-goods-action-icon icon="cart-o" @click="onClickCart">
        购物车
      </van-goods-action-icon>
      <van-goods-action-button type="warning" @click="onClickAddToCart">
        加入购物车
      </van-goods-action-button>
      <van-goods-action-button type="danger" @click="onClickAddToCart">
        立即购买
      </van-goods-action-button>
    </van-goods-action>

    <van-sku
      v-model="show"
      :sku="sku"
      :goods="goods"
      :hide-stock="sku.hide_stock"
      @buy-clicked="onBuyClicked"
      @add-cart="onAddCartClicked"
    ></van-sku>
  </div>
</template>
<script>
import {
  Tag,
  Col,
  Icon,
  Cell,
  CellGroup,
  Swipe,
  Sku,
  Toast,
  SwipeItem,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Panel,
  NavBar
} from "vant";
export default {
  components: {
    [NavBar.name]: NavBar,
    [Tag.name]: Tag,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [GoodsAction.name]: GoodsAction,
    [GoodsActionIcon.name]: GoodsActionIcon,
    [GoodsActionButton.name]: GoodsActionButton,
    [Panel.name]: Panel,
    [Sku.name]: Sku
  },
  mounted() {
    this.init();
  },
  data() {
    return {
      active: 0,
      show: false, // sku显示
      goods: {},
      imgPrefix: this.$store.state.IMAGES_SERVER_API_URL,
      imgUrl1: "",
      imgUrl2: "",
      sku: {
        tree: [
          {
            k: "包装", // skuKeyName：规格类目名称
            v: [
              {
                id: "1",
                name: "精品包装",
                imgUrl: "",
                previewImgUrl: ""
              }
            ],
            k_s: "s1"
          }
        ],
        list: [
          {
            id: 1, // skuId，下单时后端需要
            price: 100, // 价格（单位分）
            s1: "1", // 规格类目 k_s 为 s1 的对应规格值 id
            s2: "2", // 规格类目 k_s 为 s2 的对应规格值 id
            stock_num: 110 // 当前 sku 组合对应的库存
          }
        ],
        price: 0, // 默认价格（单位元）
        stock_num: 0, // 商品总库存
        collection_id: 2, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        none_sku: false, // 是否无规格商品
        messages: [
          {
            // 商品留言
            datetime: "0", // 留言类型为 time 时，是否含日期。'1' 表示包含
            multiple: "0", // 留言类型为 text 时，是否多行文本。'1' 表示多行
            name: "留言", // 留言名称
            type: "text", // 留言类型，可选: id_no（身份证）, text, tel, date, time, email
            required: "0", // 是否必填 '1' 表示必填
            placeholder: "请输入您的留言" // 可选值，占位文本
          }
        ],
        hide_stock: false // 是否隐藏剩余库存
      }
    };
  },
  methods: {
    init() {
      const that = this;
      const data = {
        number: sessionStorage.getItem("selectedProductId")
      };
      this.axios({
        url: this.$store.state.PRODUCT_SERVER_API_URL + "/product/get/detail",
        data: data,
        method: "post",
        header: {
          "Content-Type": "application/json"
        }
      })
        .then(function(response) {
          console.log(response.data);
          that.goods = response.data.data;
          let url = that.goods.imgsUrl.toString().split(",");
          that.imgUrl1 = that.imgPrefix + url[0];
          that.imgUrl2 = that.imgPrefix + url[1];
          that.sku.tree[0].v[0].imgUrl = that.imgUrl1;
          that.sku.tree[0].v[0].previewImgUrl = that.imgUrl2;
          that.sku.list[0].price = that.goods.price * 100;
          that.sku.list[0].stock_num = that.goods.repertory;
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    formatPrice() {
      return "¥" + " " + this.goods.price + " / " + this.goods.unit;
    },

    formatRepertory() {
      return this.goods.repertory + " " + this.goods.unit;
    },

    onClickCart() {
      this.$router.push("/cart");
    },

    onClickAddToCart() {
      this.show = true;
    },

    onBuyClicked(sku) {
      console.log("点击了立即购买");
      console.log("选中了商品: " + sessionStorage.getItem("selectedProductId"));
      console.log(sku.selectedNum);
      Toast("暂无后续逻辑~");
    },

    onAddCartClicked(sku) {
      console.log("点击了加入购物车");
      console.log(
        "选中了商品ID: " + sessionStorage.getItem("selectedProductId")
      );
      console.log("当前的UserID:" + sessionStorage.getItem("userId"));
      console.log(sku.selectedNum);
      const data = {
        usersId: sessionStorage.getItem("userId"),
        productId: sessionStorage.getItem("selectedProductId"),
        numbers: sku.selectedNum
      };
      this.axios({
        url: this.$store.state.USERS_SERVER_API_URL + "/user/insert/cart",
        data: data,
        method: "post",
        header: {
          "Content-Type": "application/json"
        }
      })
        .then(function(response) {
          console.log(response.data);
          if (response.data.code === 1) {
            Toast.success("已成功添加至购物车");
          } else {
            Toast.fail("添加购物车失败, 请重试");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    onClickLeft() {
      this.$router.push("/main");
    },
    sorry() {
      Toast("暂无后续逻辑~");
    }
  },
  computed: {},
  watch: {}
};
</script>
<style scoped lang="less">
.goods {
  padding-bottom: 50px;

  &-swipe {
    img {
      width: 100%;
      display: block;
    }
  }

  &-title {
    font-size: 16px;
  }

  &-price {
    color: #f44;
  }

  &-express {
    color: #999;
    font-size: 12px;
    padding: 5px 15px;
  }

  &-cell-group {
    margin: 15px 0;

    .van-cell__value {
      color: #999;
    }
  }

  &-tag {
    margin-left: 5px;
  }

  &-desc {
    padding: 10px 16px;
    color: gray;
    font-size: 14px;
  }
}
</style>
