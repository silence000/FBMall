<template>
  <div>
    <van-nav-bar
      fixed
      title="注册"
      left-text="返回"
      @click-left="onClickLeft"
    ></van-nav-bar>

    <div class="form">
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
        <van-field
          v-model="confirm"
          type="password"
          name="确认密码"
          label="确认密码"
          placeholder="确认密码"
          :rules="[{ required: true, message: '请填写确认密码' }]"
        ></van-field>
        <van-field
          v-model="phone"
          name="手机"
          label="手机"
          placeholder="手机"
          :rules="[{ required: true, message: '请填写手机' }]"
        ></van-field>
        <van-field
          v-model="nickname"
          name="昵称"
          label="昵称"
          placeholder="昵称"
          :rules="[{ required: true, message: '请填写昵称' }]"
        ></van-field>
        <van-field
          v-model="realname"
          name="真实姓名"
          label="真实姓名"
          placeholder="真实姓名"
          :rules="[{ required: true, message: '请填写真实姓名' }]"
        ></van-field>
        <van-field
          v-model="email"
          name="电子邮箱"
          label="电子邮箱"
          placeholder="电子邮箱"
          :rules="[{ required: true, message: '请填写电子邮箱' }]"
        ></van-field>
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">
            注册账号
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>
<script>
import { NavBar, Form, Field, Button, Toast } from "vant";
export default {
  components: {
    [NavBar.name]: NavBar,
    [Toast.name]: Toast,
    [Button.name]: Button,
    [Field.name]: Field,
    [Form.name]: Form
  },
  mounted() {},
  data() {
    return {
      username: "",
      password: "",
      confirm: "",
      nickname: "",
      realname: "",
      phone: "",
      address: "",
      email: ""
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push("/login");
    },
    onSubmit(values) {
      console.log("submit", values);
      if (this.password !== this.confirm) {
        Toast.fail("两次输入的密码不一致");
        this.password = "";
        this.confirm = "";
        return;
      }
      const that = this;
      const data = {
        username: this.username,
        userpass: this.password,
        nickname: this.nickname,
        realname: this.realname,
        phone: this.phone,
        address: this.address,
        email: this.email
      };
      this.$axios({
        url: this.$store.state.USERS_SERVER_API_URL + "/user/insert",
        data: data,
        method: "post",
        header: {
          "Content-Type": "application/json"
        }
      })
        .then(function(response) {
          console.log(response.data);
          if (response.data.code === 1) {
            Toast.success("注册成功");
            setTimeout(function() {
              that.$router.push("/login");
            }, 2000);
          }
          if (response.data.code === 100) {
            Toast.fail(response.data.msg);
            that.username = "";
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
<style scoped lang="less">
.form {
  margin-top: 46px;
}
</style>
