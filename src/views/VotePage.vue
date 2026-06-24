<template>
  <div class="vote-page container">

    <div class="top-bar">
      <router-link class="back-btn" to="/">
        ← 返回投票列表
      </router-link>
    </div>
    
    <!-- 標題 -->
    <h2 class="vote-title">
      {{ vote.voteName }}
    </h2>

    <!-- 🚨 投票限制提示（放這裡） -->
    <div v-if="hasVoted" class="alert-box">
      你已投票完，無法進行第2次投票
    </div>

    <!-- loading -->
    <div v-if="loading" class="loading">
      載入中...
    </div>

    <!-- options -->
    <div v-else class="options">

      <div
        v-for="option in vote.options"
        :key="option.optionId"
        class="option-item"
      >
        <label class="option-label">

          <input
            type="checkbox"
            :value="option.optionId"
            v-model="selected"
            class="option-checkbox"
            :disabled="hasVoted"
          >

          <span class="option-text">
            {{ option.optionName }}
          </span>

          <span class="option-count">
            {{ option.totalCount }} 票
          </span>

        </label>
      </div>

    </div>

    <!-- button -->
    <button
      class="vote-btn"
      @click="handleSubmit"
      :disabled="selected.length === 0 || hasVoted"
    >
      投票
    </button>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getVote, submitVote as apiSubmitVote, checkHasVoted } from '../api/voteApi';
import Swal from 'sweetalert2';

const route = useRoute();
const router = useRouter();

const vote = ref({ options: [] });
const selected = ref([]);
const loading = ref(true);
const hasVoted = ref(false);
const username = ref('');

const user = ref(JSON.parse(localStorage.getItem('user')));

const loadVote = async () => {
  try {
    const id = route.params.id;
    const userId = user.value?.id;

    if (user) {
      username.value = user.value.username;
    }

    if (!id || !userId) {
      console.error("id or userId missing");
      return;
    }

    const [voteRes, votedRes] = await Promise.all([
      getVote(id),
      checkHasVoted(id, userId)
    ]);

    vote.value = {
      ...voteRes.data,
      options: voteRes.data.options ?? []
    };

    hasVoted.value = votedRes.data;

  } finally {
    loading.value = false;
  }
};

onMounted(loadVote);

const handleSubmit = async () => {
  const id = route.params.id;
  const userId = user.value?.id;

  console.log(username.value);

  await apiSubmitVote(id, {
    userId,
    userName: username.value,
    optionIds: selected.value
  });

  Swal.fire({
    icon: 'success',
    title: '投票成功',
    text: '已成功投票'
  });

  selected.value = [];
  router.push('/');
};
</script>

<style lang="scss" scoped>
.vote-page {
  max-width: 600px;
  margin: 30px auto;
  padding: 20px;
}

.vote-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
}

.loading {
  text-align: center;
  color: #888;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.option-item {
  background: #f8f9fa;
  border-radius: 10px;
  padding: 12px 15px;
  transition: 0.2s;

  &:hover {
    background: #eef2f7;
  }
}

.option-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  width: 100%;
}

.option-checkbox {
  margin-right: 10px;
  transform: scale(1.2);
}

.option-text {
  flex: 1;
  font-weight: 500;
}

.option-count {
  color: #666;
  font-size: 14px;
}

.vote-btn {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  background: #28a745;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: #218838;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}

.alert-box {
  background: #fff3cd;
  color: #856404;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 15px;
  text-align: center;
  font-weight: 500;
}
</style>