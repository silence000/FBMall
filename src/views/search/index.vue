<template>
  <div>
    <div class="van-search-style">
      <van-search
        v-model="search"
        show-action
        placeholder="请输入搜索关键词"
        background="#39a9ed"
        shape="round"
        @search="onSearch"
        @cancel="onCancel"
      ></van-search>
    </div>

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
  </div>
</template>
<script>
import { Search, Toast, List, Card } from "vant";
export default {
  components: {
    [Search.name]: Search,
    [List.name]: List,
    [Card.name]: Card,
    [Toast.name]: Toast
  },
  mounted() {},
  data() {
    return {
      imgPrefix: this.$store.state.IMAGES_SERVER_API_URL,
      search: "",
      goodsList: [],
      loading: false,
      finished: false,
      error: false,
      current: 1,
      size: 12
    };
  },
  methods: {
    onSearch(val) {
      const that = this;
      const params = new URLSearchParams();
      params.append("keyword", val);
      this.$axios
        .post(
          this.$store.state.PRODUCT_SERVER_API_URL + "/product/search",
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
    onCancel() {
      this.$router.push("/main");
    },
    formatPrice(price) {
      return price.toFixed(2);
    },
    handleClick(id) {
      console.log("点击了卡片" + id);
      sessionStorage.setItem("selectedProductId", id);
      this.$router.push("/goods");
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
  .van-search__action {
    color: white;
  }
}
</style>
