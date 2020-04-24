<template>
  <div>
    <van-nav-bar
      title="地址编辑"
      left-text="返回"
      @click-left="onClickLeft"
    ></van-nav-bar>

    <van-address-edit
      save-button-text="提交订单"
      :show-area="false"
      @save="onSave"
    ></van-address-edit>
  </div>
</template>
<script>
import { Toast, NavBar, AddressEdit } from "vant";
export default {
  components: {
    [NavBar.name]: NavBar,
    [Toast.name]: Toast,
    [AddressEdit.name]: AddressEdit
  },
  mounted() {},
  data() {
    return {
      searchResult: []
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push("/cart");
    },
    onSave(address) {
      Toast.loading({
        message: "正在提交订单...",
        forbidClick: true
      });
      console.log(address);
      console.log(sessionStorage.getItem("checkedGoods"));
      const that = this;
      const data = {
        userId: sessionStorage.getItem("userId"),
        total: sessionStorage.getItem("total"),
        checkedGoods: sessionStorage.getItem("checkedGoods"),
        recName: address.name,
        resPhone: address.tel,
        recAddress: address.addressDetail
      };
      console.log(data);
      this.$axios({
        url: this.$store.state.ORDER_SERVER_API_URL + "/order/insert",
        data: data,
        method: "post",
        header: {
          "Content-Type": "application/json"
        }
      })
        .then(function(response) {
          console.log(response.data);
          if (response.data.code === 1) {
            Toast.success("订单提交成功");
            setTimeout(() => {
              that.$router.push("/cart");
            }, 1000);
          } else {
            Toast.fail("提交失败, 请重试");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  computed: {},
  watch: {}
};
</script>
<style scoped lang="scss"></style>
