<template>
  <div class="auth-container">

    <h2>註冊</h2>

    <input v-model="username" placeholder="帳號" class="form-control" />
    <input v-model="password" type="password" placeholder="密碼" class="form-control" />

    <select v-model="role" class="form-control">
      <option value="visitor">訪客</option>
      <option value="admin">管理員</option>
    </select>

    <button class="btn btn-success" @click="register">
      註冊
    </button>

    <p>
      已有帳號？
      <router-link to="/login">登入</router-link>
    </p>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const username = ref('');
const password = ref('');
const role = ref('visitor');

const register = () => {
  if (!username.value || !password.value) return;

  const user = {
    username: username.value,
    role: role.value
  };

  localStorage.setItem('user', JSON.stringify(user));

  router.push('/login');
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