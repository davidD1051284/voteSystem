<template>
  <div class="auth-container">

    <h2>登入</h2>

    <input v-model="username" placeholder="帳號" class="form-control" />
    <input v-model="password" type="password" placeholder="密碼" class="form-control" />

    <select v-model="role" class="form-control">
      <option value="visitor">訪客</option>
      <option value="admin">管理員</option>
    </select>

    <button class="btn btn-primary" @click="login">
      登入
    </button>

    <p>
      沒帳號？
      <router-link to="/register">註冊</router-link>
    </p>

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { Login } from '@/api/voteApi';
import Swal from 'sweetalert2';

const username = ref('');
const password = ref('');
const role = ref('visitor')
const router = useRouter('');

const login = async () => {
  try {

    const data = {
      username: username.value,
      password: password.value,
      role: role.value
    };

    const res = await Login(data);

    console.log(res)

    const user = res.data;

    console.log(user.role);

    localStorage.setItem('user', JSON.stringify(user));

    if (user.role === 'admin') {
      router.push('/admin');
    } else {
      router.push('/vote');
    }

  } catch (err) {
    console.log("login error:", err);
    Swal.fire({
        icon: 'error',
        title: '登入失敗',
        text: '帳號或密碼錯誤'
    });
  }
};
</script>

<style lang="scss" scoped>
.auth-container {
  max-width: 400px;
  margin: 80px auto;
  padding: 20px;

  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: #fff;

  display: flex;
  flex-direction: column;
  gap: 12px;

  text-align: center;
}

.form-control {
  height: 38px;
  padding: 0 10px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
}

.btn {
  height: 38px;
  border-radius: 8px;
  color: white;
  border: none;
  cursor: pointer;
}

.btn-primary {
  background: #3b82f6;
}

.btn-success {
  background: #10b981;
}
</style>