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
        <input type="text" placeholder="請輸入待辦事項" v-model="newTodo" :disabled="isAdding">
        <button
          class="addBtn"
          type="button"
          @click.prevent="addTodo"
          :disabled="isAdding"
          :aria-busy="isAdding"
          title="新增待辦"
        >
        <template v-if="!isAdding">
          <i class="fa fa-plus" aria-hidden="true"></i>
          <span class="sr-only">新增</span>
        </template>
        <template v-else>
          <span class="spinner" aria-hidden="true"></span>
          <span class="sr-only">新增中</span>
        </template>
      </button>
      </div>
      <div class="todoList_list">
        <ul class="todoList_tab">
          <li><a href="#" :class="{active:filterStatus === 'all'}" @click.prevent="filterStatus = 'all'">全部</a></li>
          <li><a href="#" :class="{active:filterStatus === 'not-yet'}" @click.prevent="filterStatus ='not-yet'">待完成</a></li>
          <li><a href="#" :class="{active:filterStatus === 'done'}" @click.prevent="filterStatus = 'done'">已完成</a></li>
        </ul>
        <div class="todoList_items">
        <ul v-if="filteredTodos.length === 0 " class="todoList_item">目前尚無待辦事項</ul>
          <ul class="todoList_item" v-else>
            <li v-for="item in filteredTodos" :key="item.id">
              <label class="todoList_label">
                <input class="todoList_input" type="checkbox" :checked="item.status" @change="toggleStatus(item)">
                <span>{{item.content}}</span>
              </label>
              <button @click.prevent="delTodo(item.id)" class="iconBtn" :disabled="rowLoading[item.id]">
                <i class="fa fa-times">🗑️</i>
              </button>
            </li>
          </ul>
          <div class="todoList_statistics">
            <p>{{count}} 個待完成項目</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script setup>
import axios from 'axios';
import { computed, inject, onMounted, ref,reactive } from 'vue';
import { useRouter } from 'vue-router';
const name = localStorage.getItem("myname")
const count = computed(() => todos.value.filter(t => !t.status).length);
const todos=ref([]);
const api=inject('api');
const newTodo = ref('');
const token = localStorage.getItem("mytoken");
const isAdding = ref(false) 
const rowLoading = reactive({})
const filterStatus=ref('all')
const filteredTodos = computed(()=>{
  switch (filterStatus.value) {
    case 'not-yet': return todos.value.filter(t=>!t.status);
    case 'done' : return todos.value.filter(t=>t.status);
    default: return todos.value;
  }
});
onMounted(async()=>{
  if (!token) {
    router.push('/');
    return;
  }
  await getTodos();
})
const addTodo = async()=>{
  const content=newTodo.value.trim();
  if (!content) {
    alert('請輸入待辦內容');
    return;
  }
  if (isAdding.value) return
  isAdding.value = true;
  try {
    const res=await axios.post(`${api}todos/`,{
      content:content,
    },{
      headers:{
        Authorization:token,
      },
    });
    todos.value.push(res.data.newTodo);
    newTodo.value='';
  } catch (e) {
    console.log(e);
    alert('新增失敗')
  }finally{
    isAdding.value = false;
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
  if (rowLoading[id]) return
  rowLoading[id] = true
  try {
    const res = await axios.delete(`${api}todos/${id}`,{
    headers:{Authorization:token},
  });
    console.log(res);
    todos.value=todos.value.filter(t=>t.id !== id);
  } catch (e) {
    console.log(e)
    alert('刪除失敗')
  }finally{
    rowLoading[id] = false;
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