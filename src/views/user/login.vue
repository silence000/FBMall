<template>
  <div>
    <van-panel>
      <div class="title">
        <br />
        <br />
        FBMall<br />
        <div class="content">
          用户登录
          <br />
          <br />
          <br />
        </div>
      </div>
    </van-panel>
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      ></van-field>
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      ></van-field>
      <div style="margin: 16px;">
        <van-button round block type="info" @click="login">
          登录
        </van-button>
        <br />
        <van-button round block type="warning" @click="register">
          注册
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import { Form, Field, Button, Panel, Toast } from "vant";
export default {
  components: {
    [Form.name]: Form,
    [Button.name]: Button,
    [Panel.name]: Panel,
    [Toast.name]: Toast,
    [Field.name]: Field
  },
  mounted() {},
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    onSubmit() {
      console.log("执行了onSubmit");
    },
    login() {
      console.log("点击了登录");
      Toast.loading({
        message: "正在登陆...",
        forbidClick: true
      });
      const that = this;
      const data = {
        data: this.username,
        extra: this.password
      };
      this.axios({
        url: this.$store.state.USERS_SERVER_API_URL + "/user/login",
        data: data,
        method: "post",
        header: {
          "Content-Type": "application/json"
        }
      })
        .then(function(response) {
          console.log(response.data);
          if (response.data.code === 1) {
            sessionStorage.setItem("userId", response.data.data.id);
            sessionStorage.setItem("nickname", response.data.data.nickname);
            sessionStorage.setItem("username", response.data.data.username);
            sessionStorage.setItem("realname", response.data.data.realname);
            Toast.clear();
            that.$router.push("/main");
          } else {
            console.log("登录失败");
            Toast.fail("登录失败, 账号或密码错误! ");
            this.username = "";
            this.password = "";
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    register() {
      console.log("点击了注册");
      this.$router.push("/register");
    }
  },
  computed: {},
  watch: {}
};
</script>
<style scoped lang="scss">
.title {
  font-size: 40px;
  text-align: center;
}
.content {
  text-align: center;
  font-size: 30px;
  color: #999999;
}
</style>
