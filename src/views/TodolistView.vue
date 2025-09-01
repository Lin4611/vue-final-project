<template>
    <div class="bg-half">
  <nav>
    <h1><a href="#">ONLINE TODO LIST</a></h1>
    <ul>
      <li class="todo_sm"><a href="#"><span>{{name}}的代辦</span></a></li>
      <li><a href="#" @click.prevent="logOut">登出</a></li>
    </ul>
  </nav>
  <div class="conatiner todoListPage vhContainer">
    <div class="todoList_Content">
      <div class="inputBox">
        <input type="text" placeholder="請輸入待辦事項" v-model="newTodo">
        <a href="#" @click="addTodo">
          <i class="fa fa-plus"></i>
        </a>
      </div>
      <div class="todoList_list">
        <ul class="todoList_tab">
          <li><a href="#" :class="{active:filterStatus === 'all'}" @click.prevent="filterStatus = 'all'">全部</a></li>
          <li><a href="#" :class="{active:filterStatus === 'not-yet'}" @click.prevent="filterStatus ='not-yet'">待完成</a></li>
          <li><a href="#" :class="{active:filterStatus === 'done'}" @click.prevent="filterStatus = 'done'">已完成</a></li>
        </ul>
        <div class="todoList_items">
        <ul v-if="filteredTodos.length === 0 " class="todoList_item">目前尚無待辦事項</ul>
          <ul class="todoList_item">
            <li v-for="item in filteredTodos" :key="item.id">
              <label class="todoList_label">
                <input class="todoList_input" type="checkbox" :checked="item.status" @change="toggleStatus(item)">
                <span>{{item.content}}</span>
              </label>
              <a href="#" @click="delTodo(item.id)">
                <i class="fa fa-times">🗑️</i>
              </a>
            </li>
          </ul>
          <div class="todoList_statistics">
            <p>{{count}} 個已完成項目</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script setup>
import axios from 'axios';
import { computed, inject, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
onMounted(async()=>{
  await getTodos();
})
const name = localStorage.getItem("myname")
const count = computed(() => todos.value.filter(t => t.status).length);
const todos=ref([]);
const api=inject('api');
const newTodo = ref('');
const token = localStorage.getItem("mytoken");
const filterStatus=ref('all')
const filteredTodos = computed(()=>{
  switch (filterStatus.value) {
    case 'not-yet': return todos.value.filter(t=>!t.status);
    case 'done' : return todos.value.filter(t=>t.status);
    default: return todos.value;
  }
});
const addTodo = async()=>{
  try {
    if(!newTodo.value) return;
    const todo={
      content:newTodo.value,
    };
    await axios.post(`${api}todos/`,todo,{
      headers:{
        Authorization:token,
      },
    });
  newTodo.value='';
  getTodos();
  } catch (e) {
    console.log(e);
    alert('新增失敗')
  }
  
}
const getTodos = async()=>{
  try {
    const res = await axios.get(`${api}todos`,{
    headers:{
      Authorization: token
    },
  });
  todos.value=res.data.data;
  } catch (e) {
    console.log(e)
    alert('取得資料失敗')
  }
  
}
const delTodo = async (id)=>{
  try {
    const res = await axios.delete(`${api}todos/${id}`,{
    headers:{Authorization:token},
  });
    console.log(res);
  getTodos();
  } catch (e) {
    console.log(e)
    alert('刪除失敗')
  }
}
const toggleStatus = async (item) =>{
  const old = item.status
  item.status = !old
  try {
    const res = await axios.patch(`${api}todos/${item.id}/toggle`,{},{
    headers:{Authorization:token},
    });
  console.log(res);
  } catch (e) {
    item.status = old
    console.log(e);
    alert('更新狀態失敗');
  }
}
const router=useRouter();
const logOut = async()=>{
  try {
    const res = await axios.post(`${api}users/sign_out`,{},{
    headers:{Authorization:token},
    });
    console.log(res);
    localStorage.removeItem("mytoken"); 
    localStorage.removeItem("myname");
    router.push('/');
  } catch (e) {
    console.log(e);
    alert('登出失敗')
  }
}
</script>