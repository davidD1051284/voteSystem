<template>
  <div class="container mt-4">

    <h2>投票管理</h2>

    <div class="card p-3 mb-3">

      <input
        class="form-control mb-2"
        v-model="voteName"
        placeholder="投票名稱"
      >

      <textarea
        class="form-control"
        v-model="optionText"
        placeholder="一行一個選項"
      />

      <button
        class="btn btn-primary mt-3"
        @click="create"
      >
        新增投票
      </button>

    </div>

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
          :key="vote.voteId"
        >
          <td>{{ vote.voteId }}</td>

          <td>{{ vote.voteName }}</td>

          <td>

            <button
              class="btn btn-danger"
              @click="remove(vote.voteId)"
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

const votes = ref([]);

const voteName = ref('');

const optionText = ref('');

const loadData = async () => {

  const res = await getAdminVotes();

  votes.value = res.data;
};

onMounted(loadData);

const create = async () => {

  const options =
    optionText.value
      .split('\n')
      .filter(item => item.trim());

  await createVote({
    voteName: voteName.value,
    options
  });

  voteName.value = '';
  optionText.value = '';

  loadData();
};

const remove = async (id) => {

  if (!confirm('確定刪除?')) {
    return;
  }

  await deleteVote(id);

  loadData();
};
</script>