<template>
  <div class="container mt-4">

    <h2>{{ vote.voteName }}</h2>

    <div
      v-for="option in vote.options"
      :key="option.optionId"
      class="form-check"
    >

      <input
        class="form-check-input"
        type="checkbox"
        :value="option.optionId"
        v-model="selected"
      >

      <label class="form-check-label">
        {{ option.optionName }}
        ({{ option.totalCount }}票)
      </label>

    </div>

    <button
      class="btn btn-success mt-3"
      @click="submitVote"
    >
      投票
    </button>

  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const vote = ref({});
const selected = ref([]);

onMounted(async () => {

  const res = await axios.get(
    `http://localhost:8080/api/votes/${route.params.id}`
  );

  vote.value = res.data;
});

const submitVote = async () => {

  await axios.post(
    `http://localhost:8080/api/votes/${route.params.id}/vote`,
    {
      userId: 1,
      optionIds: selected.value
    }
  );

  alert("投票成功");
};
</script>