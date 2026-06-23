<template>
  <div class="container mt-4">

    <h2 class="page-title">投票管理</h2>

    <div class="card p-3 mb-3">

      <!-- 投票名稱 -->
      <div class="form-row">
        <label class="form-label">投票名稱:</label>

        <input
          class="form-control"
          v-model="voteName"
          placeholder="輸入投票名稱..."
        >
      </div>

      <!-- 選項新增區 -->
      <div class="option-input-row mb-2">
        <label class="form-label">投票選項:</label>

        <input
          class="form-control"
          v-model="newOption"
          placeholder="新增一個選項"
          @keyup.enter="addOption"
        >

        <button
          class="btn btn-secondary"
          @click="addOption"
        >
          新增
        </button>
      </div>

      <!-- 已新增選項列表 -->
      <div class="option-list mb-2">

        <div
          v-for="(opt, index) in options"
          :key="index"
          class="option-item"
        >
          <span>{{ opt }}</span>

          <button
            class="btn btn-danger"
            @click="removeOption(index)"
          >
            刪除
          </button>
        </div>

      </div>

      <!-- 建立投票 -->
      <button
        class="btn btn-primary mt-3"
        @click="create"
      >
        新增投票
      </button>

    </div>

    <!-- table -->
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>投票名稱</th>
          <th>操作</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="vote in votes"
          :key="vote.id"
        >
          <td>{{ vote.id }}</td>
          <td>{{ vote.voteName }}</td>

          <td>
            <button
              class="btn btn-danger"
              @click="remove(vote.id)"
            >
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import {
  getAdminVotes,
  createVote,
  deleteVote
} from '../api/voteApi';

import Swal from 'sweetalert2';

const votes = ref([]);

const voteName = ref('');
const newOption = ref('');
const options = ref([]);

const loadData = async () => {
  const res = await getAdminVotes();
  votes.value = res.data;
};

onMounted(loadData);

/* ➕ 新增選項 */
const addOption = () => {
  const value = newOption.value.trim();
  if (!value) return;

  const isDuplicate = options.value.some(
    opt => opt.toLowerCase() === value.toLowerCase()
  );

  if (isDuplicate) {
    Swal.fire({
      icon: 'warning',
      title: '選項重複',
      text: '選項名稱不可重複'
    });
    return;
  }

  options.value.push(value);
  newOption.value = '';
};

/* ❌ 刪除選項 */
const removeOption = (index) => {
  options.value.splice(index, 1);
};

/* 🧾 建立投票 */
const create = async () => {
  if (!voteName.value.trim()) {
    Swal.fire({
      icon: 'error',
      title: '錯誤',
      text: '請輸入投票名稱'
    });
    return;
  }

  if (options.value.length === 0) {
    Swal.fire({
      icon: 'error',
      title: '錯誤',
      text: '請至少新增一個選項'
    });
    return;
  }

  // 再次檢查重複
  const set = new Set();
  for (const opt of options.value) {
    const key = opt.toLowerCase();
    if (set.has(key)) {
      Swal.fire({
        icon: 'error',
        title: '錯誤',
        text: `選項重複：${opt}`
      });
      return;
    }
    set.add(key);
  }

  await createVote({
    voteName: voteName.value,
    options: options.value
  });

  Swal.fire({
    icon: 'success',
    title: '建立成功',
    text: '投票已建立完成',
    timer: 1500,
    showConfirmButton: false
  });

  voteName.value = '';
  newOption.value = '';
  options.value = [];

  loadData();
};

/* 🗑 刪除投票 */
const remove = async (id) => {
  console.log("delete id =", id);
  const result = await Swal.fire({
    title: '確定刪除？',
    text: '刪除後無法復原',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: '刪除',
    cancelButtonText: '取消'
  });

  if (!result.isConfirmed) return;

  await deleteVote(id);

  Swal.fire({
    icon: 'success',
    title: '已刪除',
    timer: 1200,
    showConfirmButton: false
  });

  loadData();
};
</script>

<style lang="scss" scoped>

/* container */
.container {
  max-width: 900px;
  margin: 30px auto;
}

/* card */
.card {
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  padding: 16px 18px;

  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* 每一列（統一核心） */
.form-row,
.option-input-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* label */
.form-label {
  width: 100px;
  font-weight: 600;
  margin: 0;
}

/* input */
.form-control {
  flex: 1;
  height: 38px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  padding: 0 12px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
  }
}

/* button（唯一版本，避免衝突） */
.btn {
  height: 38px;
  padding: 0 14px;
  font-size: 14px;

  border-radius: 8px;
  border: none;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  white-space: nowrap;
  cursor: pointer;

  transition: 0.2s;
}

/* button colors */
.btn-primary {
  background: #3b82f6;
  color: white;

  &:hover {
    background: #2563eb;
  }
}

.btn-secondary {
  background: #6b7280;
  color: white;

  &:hover {
    background: #4b5563;
  }
}

.btn-danger {
  background: #ef4444;
  color: white;

  &:hover {
    background: #dc2626;
  }
}

/* option list */
.option-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.option-item {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 10px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #f9fafb;
}

/* table */
.table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 12px;
  overflow: hidden;

  th {
    background: #f9fafb;
    text-align: left;
    padding: 12px;
  }

  td {
    padding: 12px;
    border-top: 1px solid #f1f5f9;
  }

  tr:hover {
    background: #f8fafc;
  }
}
</style>