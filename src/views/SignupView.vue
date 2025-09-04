<template>
    <div class="bg-yellow">
        <div class="conatiner signUpPage vhContainer">
            <div class="side">
            <a href="#"><img class="logoImg" src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/logo.png" alt=""></a>
            <img class="d-m-n" src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/img.png" alt="workImg">
            </div>
            <div>
            <form class="formControls" @submit.prevent="Signup">
                <h2 class="formControls_txt">註冊帳號</h2>
                <label class="formControls_label">Email</label>
                <input class="formControls_input" type="email" placeholder="請輸入 email" v-model="signupFields.email" @blur="validateEmail" required>
                <p v-if="emailError" class="text-danger">{{emailError}}</p>
                <label class="formControls_label">您的暱稱</label>
                <input class="formControls_input" type="text"  placeholder="請輸入您的暱稱" v-model="signupFields.nickname" required>
                <label class="formControls_label">密碼</label>
                <input class="formControls_input" type="password" placeholder="請輸入密碼" v-model="signupFields.password" required>
                <label class="formControls_label">再次輸入密碼</label>
                <input class="formControls_input" type="password" placeholder="請再次輸入密碼"  v-model="passwdcheck" required>
                <span v-if="signupFields.password !== passwdcheck">密碼不同，請重新輸入</span>
                <input class="formControls_btnSubmit" type="submit" value="註冊帳號">
                <RouterLink class="formControls_btnLink" to="/">登入</RouterLink>
            </form>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref,reactive, inject } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
const signupFields=reactive({
    email:'',
    password:'',
    nickname:''
});
const emailError=ref('');
const validateEmail=()=>{
    const regex =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(signupFields.email)) {
        emailError.value = "請輸入正確的 Email 格式";
    } else {
        emailError.value = "";
    }
};
const passwdcheck = ref('');
const api=inject('api');
const router =useRouter();
const Signup = async ()=>{
    if(signupFields.password !== passwdcheck.value){
        alert('密碼不一致，請檢查');
        return;
    }else{
        try{
        const res = await axios.post(`${api}users/sign_up`,signupFields);
        alert('註冊成功');
        console.log(res);
        router.push('/');
        }catch(e){
            if(e.status === 400){
                alert('用戶已存在，請重新更換一個註冊');
            }else{
                console.log(e)
                alert("註冊失敗，請檢查輸入的資料是否正確");
            }
        }
    }  
}
</script>