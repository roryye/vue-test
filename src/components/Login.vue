<template>
  <div class="card" v-loading.fullscreen.lock="fullscreenLoading">
    <!--flex弹性盒子模型，justify-content：主抽 -->
    <div style="display: flex;justify-content: center;margin-top: 18%">
      <el-card style="width: 20%; background-color:rgba(255,255,255,0.85)">
        <el-form :label-position="labelPosition" label-width="40px" :model="user">
          <el-form-item label="账号">
            <el-input v-model="user.username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="user.password" type="password"></el-input>
          </el-form-item>
          <el-form-item style="margin-bottom:0px">
            <el-button style="width:100%" type="primary" @click="doLogin" round>登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  //单页面中不支持前面的data:{}方式
  data() {
    //相当于以前的function data(){},这是es5之前的写法，新版本可以省略掉function
    return {
      labelPosition: "left",
      //之前是在里面直接写username，password等等，但是这里要写return
      //因为一个组件不管要不要被其他组件用，只要这样定义了，它就会认为可能这个组件会在其他的组件中使用
      //比如说在这里定义了一个变量，然后把这个组件引入到A组件中，A组件中修改了这个变量
      //同时这个组件也在B组件中引用了，这时候A里面一修改，B里面也变了，它们用的是一个值
      //可是一般来说可能希望在不同的组件中引用的时候，使用不同的值，所以这里要用return
      //这样在A组件和B组件分别引用这个变量的时候是不会互相影响的
      user: {
        username: "zhangsan",
        password: "123"
        //为了登录方便，可以直接在这里写好用户名和密码的值
      },
      fullscreenLoading: false
    };
  },
  methods: {
    doLogin() {
      //一点击登录按钮，这个方法就会执行
      this.fullscreenLoading = true;
      // alert(JSON.stringify(this.user))//可以直接把this.user对象传给后端进行校验用户名和密码
      this.axios
        .post("/api/user/login", {
          username: this.user.username,
          password: this.user.password
        })
        .then(successResponse => {
          if (successResponse.data.success === true) {
            console.log(successResponse.data.data)
            console.log(typeof(successResponse.data.data))
            localStorage.setItem("user", JSON.stringify(successResponse.data.data))
            this.$router.replace({ path: "/score" });
          } else {
            this.fullscreenLoading = false;
            this.$message.error("账号或者密码错误，请重试！");
            this.user.username = "";
            this.user.password = "";
          }
        })
        .catch(failResponse => {
          this.fullscreenLoading = false;
          this.$message.error("发生未知错误，请重试！");
        });
    }
  }
};
</script>

<style scoped>
.card {
  height: 100%;
  width: 100%;
  position: absolute;
  background: url("~@/assets/img/background.jpg");
  background-size: cover;
}
</style>


