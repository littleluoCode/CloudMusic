// 手机号登录
<template>
  <div class="">
    <el-form :model="phoneForm" status-icon :rules="phoneRules" ref="phoneForm">
      <el-form-item prop="phone">
        <el-input
          type="phone"
          placeholder="请输入手机号"
          class="input-with-select"
          v-model="phoneForm.phone"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="captcha">
        <el-input
          type="text"
          placeholder="请输入验证码"
          class="input-with-select"
          v-model="phoneForm.captcha"
        >
          <el-button
            slot="append"
            :loading="codeStatus"
            :disabled="isSendCode"
            @click="getCode()"
            >{{ sendCodeText }}</el-button
          >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login()">登录</el-button>
        <el-button>注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { phoneCodeLogin, getPhoneCode } from "@/api/login";
export default {
  data() {
    return {
      isSendCode: true, // 是否禁用发送验证码按钮
      codeStatus: false, // 验证码状态  是否显示发送中
      sendCodeText: "获取验证码",
      phoneForm: {
        phone: "",
        captcha: "",
      },
      phoneRules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "change" },
          {
            pattern: /^1[3|5|7|8|9]\d{9}$/,
            message: "请输入正确的号码格式",
            trigger: "change",
          },
        ],
        captcha: [
          {
            pattern: /^\d\d\d\d$/,
            message: "请输入正确的验证码格式",
            trigger: "change",
          },
          { required: true, message: "请输入验证码", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    async phoneLogin(params) {
      let res = await phoneCodeLogin(params);
      console.log(res);
    },

    // 获取验证码
    async getCode() {
      this.codeStatus = true;

      // loading 加载时间
      setTimeout(async () => {
        let res = await getPhoneCode({
          phone: this.phoneForm.phone,
        });
        if (res.data.code === 200) {
          this.codeStatus = false;
          console.log("发送验证码成功");

          this.isSendCode = true;

          // 设置倒计时秒数
          this.count = 60;
          this.sendCodeText = `请${this.count}秒后重试`;
          // 倒计时
          let countDown = setInterval(() => {
            this.sendCodeText = `请${this.count}秒后重试`;
            this.count--;

            if (this.count <= 0) {
              this.sendCodeText = `获取验证码`;
              this.isSendCode = false;
              clearInterval(countDown);
            }
          }, 1000);
        }
      }, 1000);
    },

    // 登录
    login() {
      this.$refs["phoneForm"].validate((valid) => {
        if (valid) {
          console.log(this.phoneForm);
          this.phoneLogin(this.phoneForm);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  watch: {
    // 监听手机号输入，判断是否禁用获取验证码按钮
    "phoneForm.phone": {
      handler(newVal) {
        let phoneRule = /^1[3|5|7|8|9]\d{9}$/;
        if (newVal && phoneRule.test(newVal)) {
          this.isSendCode = false;
        } else {
          this.isSendCode = true;
        }
      },
      deep: true,
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
</style>