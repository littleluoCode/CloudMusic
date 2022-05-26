<template>
  <div class="bg">
    <div class="login">
      <el-card class="box-card">
        <div slot="header" class="clearfix" style="text-align: center">
          <span>登录</span>
        </div>
        <Phone />
      </el-card>
    </div>
  </div>
</template>

<script>
import Phone from "@/components/login/Phone";
export default {
  components: { Phone },
  data() {
    let checkPhone = (rule, value, callback) => {
      console.log(value);
      if (!value) {
        return callback(new Error("手机号不能为空"));
      }

      if (!Number.isInteger(value)) {
        callback(new Error("请输入数字值"));
      } else {
        console.log(value.length);
        if (String(value).length > 11 || String(value).length < 11) {
          callback(new Error("请正确输入手机号"));
        } else {
          callback();
        }
      }
    };

    let checkCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("验证码不能为空"));
      }
      if (!Number.isInteger(value)) {
        callback(new Error("请输入数字值"));
      } else {
        if (value < 18) {
          callback(new Error("必须年满18岁"));
        } else {
          callback();
        }
      }
    };
    return {
      phoneForm: {
        phone: "",
        code: "",
      },
      rules: {
        phone: [{ validator: checkPhone, trigger: "blur" }],
        code: [{ validator: checkCode, trigger: "blur" }],
      },
    };
  },
  methods: {},
  mounted() {},
};
</script>

<style lang="scss" scoped>
.bg {
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, #f54ea2, #ff7676);
}

.login {
  width: 60%;
  height: 60%;
  margin: 0 auto;
  transform: translateY(50%);
}
</style>