<script setup>
import { ref,reactive, inject } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
const api = inject('api');
const signinFields=reactive({
  email:'',
  password:''
});
const emailError=ref('');
const validateEmail=()=>{
    const regex =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(signinFields.email)) {
        emailError.value = "請輸入正確的 Email 格式";
    } else {
        emailError.value = "";
    }
};
const router = useRouter();
const Signin = async () =>{
  try {
    const res = await axios.post(`${api}users/sign_in`,signinFields);
    localStorage.setItem("mytoken", res.data.token);
    localStorage.setItem("myname",res.data["nickname"]);
    console.log(res);
    router.push('/todolist');
  } catch (e) {
    console.log(e)
    alert('登入失敗');
  }
} 
</script>
<template>
  <div class="bg-yellow">
    <div class="conatiner loginPage vhContainer ">
      <div class="side">
        <a href="#"><img class="logoImg" src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/logo.png" alt=""></a>
        <img class="d-m-n" src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/img.png" alt="workImg">
      </div>
      <div>
        <form class="formControls" @submit.prevent="Signin">
          <h2 class="formControls_txt">最實用的線上代辦事項服務</h2>
          <label class="formControls_label">Email</label>
          <input class="formControls_input" type="email" placeholder="請輸入 email" v-model="signinFields.email" @blur="validateEmail" required>
          {{signinFields.email}}
          <span v-if="emailError">{{ emailError }}</span>
          <label class="formControls_label">密碼</label>
          <input class="formControls_input" type="password" placeholder="請輸入密碼" v-model="signinFields.password" required>
          {{signinFields.password}}
          <input class="formControls_btnSubmit" type="submit" value="登入">
          <RouterLink class="formControls_btnLink" to="/signup" >註冊帳號</RouterLink>
        </form>
      </div>
    </div>
  </div>
</template>
