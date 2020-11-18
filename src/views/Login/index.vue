<template>
  <div id="login">
    <div style="height: 150px"></div>
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          :class="{ current: item.current }"
          v-for="item in tabs"
          :key="item.id"
          @click="TabToggle(item)"
        >
          {{ item.txt }}
        </li>
      </ul>
      <!-- 表单开始 -->
      <div class="login-form">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          class="demo-ruleForm"
          size="small "
          label-position="top"
        >
          <el-form-item prop="username" label="邮箱">
            <el-input
              type="text"
              v-model="ruleForm.username"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item prop="password" label="密码">
            <el-input
              type="password"
              v-model="ruleForm.password"
              autocomplete="off"
              maxlength="20"
              minlength="6"
            ></el-input>
          </el-form-item>

          <el-form-item
            prop="passwords"
            label="重复密码"
            v-if="model == 'register'"
          >
            <el-input
              type="password"
              v-model="ruleForm.passwords"
              autocomplete="off"
              maxlength="20"
              minlength="6"
            ></el-input>
          </el-form-item>

          <el-form-item prop="code" label="验证码">
            <el-row :gutter="10">
              <el-col :span="15"
                ><div class="grid-content bg-purple">
                  <el-input
                    v-model="ruleForm.code"
                    maxlength="6"
                    minlength="6"
                  ></el-input></div
              ></el-col>
              <el-col :span="9"
                ><div class="grid-content bg-purple">
                  <el-button
                    type="success"
                    size="small"
                    @click="getSms()"
                    class="block_buttom"
                    :disabled="codeStatus.status"
                    >{{ codeStatus.text }}</el-button
                  >
                </div></el-col
              >
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-button
              type="danger"
              :disabled="isdisabled"
              @click="submitForm('ruleForm')"
              class="block_buttom login-btn"
              >{{ model == "login" ? "登录" : "注册" }}</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import sha1 from "js-sha1";
import { Message } from "element-ui";
import { onMounted, reactive, ref } from "@vue/composition-api";
import { Strscript, ValidateEmail } from "@/utils/validate";
import { GetEmail, Register, Login } from "@/api/login";
export default {
  name: "login",
  setup(props, context) {
    //这里放置data数据，生命周期，自定义的函数

    //验证吗
    let checkCode = (rule, value, callback) => {
      let codecheck = /^[a-z0-9]{6}$/;
      if (!value) {
        return callback(new Error("验证码不能为空"));
      } else if (!codecheck.test(value)) {
        return callback(new Error("验证码格式错误"));
      } else {
        callback();
      }
    };
    //验证邮箱
    let validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else if (!ValidateEmail(value)) {
        callback(new Error("邮箱格式错误"));
      } else {
        callback(); //
      }
    };
    //密码
    let validatePass2 = (rule, value, callback) => {
      ruleForm.password = Strscript(value);
      value = ruleForm.password;
      let passcheck = /^(\w){5,20}$/;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!passcheck.test(value)) {
        callback(new Error("密码长度>6且<20"));
      } else {
        callback();
      }
    };
    //验证密码
    let validatePass3 = (rule, value, callback) => {
      ruleForm.passwords = Strscript(value);
      value = ruleForm.passwords;
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value != ruleForm.password) {
        callback(new Error("重复密码不正确"));
      } else {
        callback();
      }
    };

    /**
     * 声明数据
     */
    const tabs = reactive([
      //对象数据类型用 reactive
      { txt: "登录", current: true, eng: "login" },
      { txt: "注册", current: false, eng: "register" },
    ]);
    const model = ref("login"); //基础数据用 ref
    const isdisabled = ref(true);
    const ruleForm = reactive({
      username: "",
      password: "",
      passwords: "",
      code: "",
    });
    const isActive = true;
    const rules = reactive({
      username: [{ validator: validateUsername, trigger: "blur" }],
      password: [{ validator: validatePass2, trigger: "blur" }],
      passwords: [{ validator: validatePass3, trigger: "blur" }],
      code: [{ validator: checkCode, trigger: "blur" }],
    });

    const codeStatus = reactive({
      text: "获取验证码",
      status: false,
    });

    let timer;

    /**
     * 声明函数
     */
    const TabToggle = (data) => {
      tabs.forEach((elem) => {
        elem.current = false;
      });
      data.current = true;
      model.value = data.eng;
      resetForm();
      // console.log(data);
    };

    //重置表单
    const resetForm = () => {
      context.refs.ruleForm.resetFields();
    };
    //倒计时
    const countDown = (number) => {
      let time = number;
      timer = setInterval(() => {
        time--;
        if (time === 0) {
          clearInterval(timer);
          updateCodeStatus("重新获取",false);
        } else {
          updateCodeStatus(`倒计时${time}秒`,true);
        }
      }, 1000);
    };

    //清除倒计时
    const clearDown = () => {
      //还原验证状态
      updateCodeStatus("获取验证码",false);
      clearInterval(timer);
    };

    const updateCodeStatus=((text,istrue)=>{
      codeStatus.status = istrue;
      codeStatus.text = text;
    })

    /**
     * 生命周期
     */
    onMounted(() => {});

    /**
     * 获取验证码
     */
    const getSms = () => {
      //先进行提示
      if (!ruleForm.username) {
        context.root.$message.error("邮箱不能为空的哦~");
        return;
      }
      if (!ValidateEmail(ruleForm.username)) {
        context.root.$message.error("邮箱格式是错误的哦~");
        return;
      }
      let data = {
        username: ruleForm.username,
        module: model.value,
      };
      updateCodeStatus("发送中");
      setTimeout(() => {
        GetEmail(data)
          .then((response) => {
            let data = response.data;
            context.root.$message.success(data.message);
            countDown(60);
            isdisabled.value = false;
          })
          .catch((error) => {
            console.log(error);
          });
      }, 3000);
    };

    const submitForm = (formName) => {
      context.refs[formName].validate((valid) => {
        if (valid) {
          model.value === "login" ? login() : register();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };
    //注册
    const register = () => {
      let data = {
        username: ruleForm.username,
        password: sha1(ruleForm.password),
        passwords: ruleForm.passwords,
        code: ruleForm.code,
        model: model.value,
      };
      Register(data)
        .then((response) => {
          let data = response.data;
          context.root.$message.success(data.message);
          // model.value="login";
          TabToggle(tabs[0]);
          clearDown();
          isdisabled.value = true;
        })
        .catch((error) => {
          console.log(error);
        });
    };
    //登录
    const login = () => {
      let data = {
        username: ruleForm.username,
        password: sha1(ruleForm.password),
        code: ruleForm.code,
      };
      context.root.$store.dispatch('setLogin',data)
      .then((response) => {
        let data = response.data;
        context.root.$message.success(data.message);
        context.root.$router.push({
          name:"Console"
        });
      })
      .then((error) => {
        console.log(error);
      });
      // Login(data)

    };

    /**
     * 提交表单
     */
    return {
      tabs,
      model,
      TabToggle,
      submitForm,
      ruleForm,
      isActive,
      rules,
      getSms,
      isdisabled,
      codeStatus,
    };
  },
};
</script>

<style lang="scss">
#login {
  background-color: rgb(245, 201, 148);
  height: 100vh;
}
.login-wrap {
  width: 330px;
  margin: auto;
}
.menu-tab {
  text-align: center;
  display: flex;
  justify-content: center;
  li {
    display: block;
    width: 88px;
    color: #ffffff;
    line-height: 36px;
    border-radius: 2px;
    cursor: pointer;
  }
  .current {
    background-color: #ebb136;
  }
}
.login-form {
  width: 100%;
  margin-top: 25px;
}
.el-form--label-top .el-form-item__label {
  padding: 0 0 0 0;
  color: #ffffff;
}
.el-form-item--small.el-form-item {
  margin-bottom: 10px;
}
.block_buttom {
  display: block;
  width: 100%;
}
.login-btn {
  margin-top: 19px;
}
</style>