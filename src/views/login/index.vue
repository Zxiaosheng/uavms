<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">
          {{ $t('login.title') }}
        </h3>
        <lang-select class="set-language" />
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          :placeholder="$t('login.username')"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            :placeholder="$t('login.password')"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>
  <div class="verify">
      <el-form-item  class="leftVerify" prop="verifycode" style="width: 66%">

         <el-input v-model="loginForm.verifycode" :placeholder="$t('login.verifycode')" class="identifyinput" >

         </el-input>
      </el-form-item>
      <el-form-item class="rightVerify" >
        <div class="identifybox">
          <div @click="refreshCode">
            <s-identify :identifyCode="identifyCode">

            </s-identify>
          </div>
          <el-button @click="refreshCode" type='text' class="textbtn">看不清，换一张</el-button>
        </div>
      </el-form-item>
  </div>
      <!--<el-checkbox v-model="checked">记住账号</el-checkbox>-->

<div class="btn">
      <el-button :loading="loading" type="primary" style="width:100%;margin:30px 0;" @click.native.prevent="handleLogin" >
        {{ $t('login.logIn') }}
      </el-button>
      <el-button class='reg' :loading="loading"  style="width:100%;margin-bottom:30px;" @click="handleRegiest" >
        {{ $t('login.register') }}
      </el-button>
  </div>
      <el-dialog
        title='注册'
        :visible.sync="dialogVisible"
        :before-close="handleClose">
        <el-form ref="dataForm"  :model="temp"  label-position="left" label-width="150px" style="width: 500px; margin-left:50px;">
          <div class="diaInput">


          <!--<el-form-item  prop="username">-->
            <!--<el-input v-model="temp.username" :placeholder="$t('login.username')" type="text"></el-input>-->
            <input type="text" v-model="temp.username" :placeholder="$t('login.username')" >
          <!--</el-form-item>-->

          <!--<el-form-item >-->
          <input type="password" v-model="temp.password" :placeholder="$t('login.password')"  >
            <!--<el-input type="password" v-model="temp.password" placeholder="密码" ></el-input>-->
          <!--</el-form-item>-->

          <!--<el-form-item >-->
          <input type="password" v-model="temp.repassword" :placeholder="$t('login.repassword')">
            <!--<el-input type="password" v-model="temp.repassword" placeholder="请再次输入密码"></el-input>-->
          <!--</el-form-item>-->
          </div>
        </el-form>

        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">{{ $t('login.cancel') }}</el-button>
    <el-button type="primary" @click="regiest">{{ $t('login.register') }}</el-button>
  </span>
      </el-dialog>
      <!--<div style="position:relative">-->
        <!--<div class="tips">-->
          <!--<span>{{ $t('login.username') }} : admin</span>-->
          <!--<span>{{ $t('login.password') }} : {{ $t('login.any') }}</span>-->
        <!--</div>-->
        <!--<div class="tips">-->
          <!--<span style="margin-right:18px;">-->
            <!--{{ $t('login.username') }} : editor-->
          <!--</span>-->
          <!--<span>{{ $t('login.password') }} : {{ $t('login.any') }}</span>-->
        <!--</div>-->

        <!--<el-button class="thirdparty-button" type="primary" @click="showDialog=true">-->
          <!--{{ $t('login.thirdparty') }}-->
        <!--</el-button>-->
      <!--</div>-->
    </el-form>

    <el-dialog :title="$t('login.thirdparty')" :visible.sync="showDialog">
      {{ $t('login.thirdpartyTips') }}
      <br>
      <br>
      <br>
      <social-sign />
    </el-dialog>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import LangSelect from '@/components/LangSelect'
import SocialSign from './components/SocialSignin'
import SIdentify from '@/components/Identify/identify.vue'
export default {
  name: 'Login',
  components: { LangSelect, SocialSign, SIdentify },

  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
//     验证码自定义验证规则
     const validateVerifycode = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请输入验证码'))
        } else if (value !== this.identifyCode) {
            console.log('validateVerifycode:', value)
             callback(new Error('验证码不正确!'))
        } else {
              callback()
             }
     }

    return {
      loginForm: {
//        username: 'admin',
//        password: '111111'
        username: '',
        password: '',
        repassword: '',
        verifycode:''
      },
      temp: {
        username: '',
        password: '',
        repassword: '',
        verifycode:''
      },
      identifyCodes: '1234567890',

      identifyCode: '',
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        verifycode: [
          { required: true, trigger: 'blur', validator: validateVerifycode }
        ]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      dialogVisible : false,
//      checked: false,
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
    // 验证码初始化

    this.identifyCode = ''

    this.makeCode(this.identifyCodes, 4)
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if (shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')) {
          this.capsTooltip = true
        } else {
          this.capsTooltip = false
        }
      }
      if (key === 'CapsLock' && this.capsTooltip === true) {
        this.capsTooltip = false
      }
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/' })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // afterQRScan() {
    //   if (e.key === 'x-admin-oauth-code') {
    //     const code = getQueryObject(e.newValue)
    //     const codeMap = {
    //       wechat: 'code',
    //       tencent: 'code'
    //     }
    //     const type = codeMap[this.auth_type]
    //     const codeName = code[type]
    //     if (codeName) {
    //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //       })
    //     } else {
    //       alert('第三方登录失败')
    //     }
    //   }
    // }
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    // 生成随机数
     randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min) ;
     },
    // 切换验证码
     refreshCode() {
         this.identifyCode = '' ;
         this.makeCode(this.identifyCodes, 4) ;
      },
    // 生成四位随机验证码
     makeCode(o, l) {
        for (let i = 0; i < l; i++) {
            this.identifyCode += this.identifyCodes[
            this.randomNum(0, this.identifyCodes.length)

             ]
        }
       console.log(this.identifyCode)
     },
    resetForm(){
      this.temp= {
        username: '',
          password: '',
          repassword: '',
          verifycode:''
      }
    },
    handleRegiest(){
      this.resetForm();
      this.dialogVisible=true;

    },
    regiest(){
      let {username,password,repassword} = this.temp;
      if (username === '') {
        this.$message.error('用户名不能为空');
        return
      }
      if (password === '') {
        this.$message.error('密码不能为空');
        return
      }
      if (password !== repassword) {
        this.$message.error('两次输入的密码不一致');
        return
      }

      this.$message({
        message: '恭喜你，注册成功',
        type: 'success'
      });
      this.dialogVisible=false;

    }


  }
}
</script>

<style>
  .login-container{
    width:100%;
    height:100%;
    background-image: url('img/center.jpg');
    background-repeat:no-repeat;
    background-position: center center;
    background-attachment: fixed;
    background-size: cover;
  }
  .diaInput{
    /*border: solid red;*/
    display: flex;
    flex-flow: column;
  }
  .diaInput input{
    margin-bottom: 10px;
    border: solid #ccc 1px;
    border-radius: 0px;
    padding: 12px 5px 12px 15px;
    height: 47px;
    caret-color: $cursor;
  }
  .verify{
    display: flex;
  }
  .leftVerify{
    height: 47px;
  }
  .identifybox{
    height: 47px;
  }
  .btn{
    width: 450px;
    /*border: solid red;*/
    display: flex;
    flex-direction: column;
    align-items: center;

  }
  .btn .reg{
    margin-left: -1px;
  }


</style>

<style lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg:#283443;
  $light_gray:#fff;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $cursor;
    }
  }

  /* reset element-ui css */
  .login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

  input {
    background: transparent;
    border: 0px;
    -webkit-appearance: none;
    border-radius: 0px;
    padding: 12px 5px 12px 15px;
    color: $light_gray;

    height: 47px;
    caret-color: $cursor;

  &:-webkit-autofill {
     box-shadow: 0 0 0px 1000px $bg inset !important;
     -webkit-text-fill-color: $cursor !important;
   }
  }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.4);
    border-radius: 5px;
    color: #454545;
  }
  }
</style>

<style lang="scss" scoped>
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

  span {
  &:first-of-type {
     margin-right: 16px;
   }
  }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

  .title {
    font-size: 26px;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }

  .set-language {
    color: #fff;
    position: absolute;
    top: 3px;
    font-size: 18px;
    right: 0px;
    cursor: pointer;
  }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
  }
</style>


