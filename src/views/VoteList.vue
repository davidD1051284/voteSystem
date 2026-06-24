<template>
  <div class="container mt-4">

    <div class="top-bar">
      <h2>投票系統</h2>

      <div class="user-box">
        <span class="user-name">
          👤 {{ user?.username || 'Guest' }}
        </span>

        <button class="btn btn-danger" @click="logout">
          登出
        </button>
      </div>
    </div>

    <div
      class="card mb-3"
      v-for="vote in votes"
      :key="vote.voteId"
    >
      <div class="card-body">

        <h5>{{ vote.voteName }}</h5>

        <router-link
          class="btn btn-primary"
          :to="'/vote/' + vote.id"
        >
          進入投票
        </router-link>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getVotes } from '../api/voteApi';

const router = useRouter();

const votes = ref([]);
const user = ref(JSON.parse(localStorage.getItem('user')));

// 登出
const logout = () => {
  localStorage.removeItem('user'); // 清掉登入資料
  router.push('/login');           // 跳回登入頁
};

onMounted(async () => {
  try {
    const res = await getVotes();
    votes.value = res.data;
  } catch (err) {
    console.error("API錯誤:", err);
  }
});
</script>

<style lang="scss" scoped>

.container {
  max-width: 900px;
  margin: 30px auto;
}

h2 {
  font-weight: 700;
  margin-bottom: 20px;
  text-align: center;
}


.card {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: #fff;

  margin-bottom: 12px;

  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  }
}

.card-body {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 18px;
}

h5 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #111827;
}

/* button */
.btn {
  border-radius: 8px;
  padding: 8px 14px;
  font-size: 14px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  transition: 0.2s;

  &.btn-primary {
    background: #3b82f6;
    border: none;
    color: white;

    &:hover {
      background: #2563eb;
    }
  }
}

.empty {
  text-align: center;
  color: #9ca3af;
  padding: 40px 0;
  font-size: 14px;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.user-box {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-name {
  font-size: 14px;
  color: #374151;
}


.btn-danger {
  background: #ef4444;
  border: none;
  color: white;
  padding: 6px 12px;
  border-radius: 8px;

  &:hover {
    background: #dc2626;
  }
}
</style>