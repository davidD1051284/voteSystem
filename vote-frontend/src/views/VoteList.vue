<template>
  <div class="container mt-4">

    <h2>投票系統</h2>

    <div
      class="card mb-3"
      v-for="vote in votes"
      :key="vote.voteId"
    >
      <div class="card-body">

        <h5>
          {{ vote.voteName }}
        </h5>

        <router-link
          class="btn btn-primary"
          :to="'/vote/' + vote.voteId"
        >
          進入投票
        </router-link>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getVotes } from '../api/voteApi';

const votes = ref([]);

onMounted(async () => {
  const res = await getVotes();
  votes.value = res.data;
});
</script>