<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const props = defineProps(['pagination'])

const changePage = num => {
  const queries = { ...route.query }

  queries.page = num

  router.push({ name: 'home', query: queries })
}
</script>

<template>
  <div class="pagination">
    <font-awesome-icon
      :icon="['fas', 'angle-left']"
      @click="changePage(pagination.page - 1)"
      v-if="pagination.page > 1"
    />
    <font-awesome-icon
      :icon="['fas', 'angle-left']"
      class="disactivated"
      v-else
    />

    <div>
      <p
        v-for="num in pagination.pageCount"
        :key="num"
        :class="{
          selected: num === pagination.page,
        }"
        @click="changePage(num)"
      >
        {{ num }}
      </p>
    </div>

    <font-awesome-icon
      :icon="['fas', 'angle-right']"
      @click="changePage(pagination.page + 1)"
      v-if="pagination.page < pagination.pageCount"
    />
    <font-awesome-icon
      :icon="['fas', 'angle-right']"
      class="disactivated"
      v-else
    />
  </div>
</template>

<style scoped>
div {
  display: flex;
}
.pagination {
  gap: 25px;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
}
.pagination > div {
  align-items: center;
}
p {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.selected {
  color: white;
  background-color: var(--black);
  border-radius: 3px;
}
svg {
  cursor: pointer;
}
.disactivated {
  color: var(--grey-med);
  cursor: default;
}
@media (max-width: 460px) {
  .pagination > div {
    display: flex;
    gap: 10px;
  }
  p {
    font-size: 12px;
    width: 30px;
    height: 30px;
  }
  svg {
    font-size: 12px;
  }
}
</style>
