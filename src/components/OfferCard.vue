<script setup>
import { RouterLink } from 'vue-router'
import { computed } from 'vue'

const props = defineProps({
  offerInfos: {
    type: Object,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
})

const formatDate = computed(() => {
  return props.offerInfos.updatedAt.split('T')[0].split('-').reverse().join('/')
})
</script>

<template>
  <RouterLink :to="{ name: 'offer', params: { id: id } }" class="offerCard">
    <div class="firstPart">
      <div class="owner">
        <img
          :src="offerInfos.owner.data.attributes.avatar.data.attributes.url"
          alt=""
          v-if="offerInfos.owner.data.attributes.avatar.data"
        />
        <p>{{ offerInfos.owner.data.attributes.username }}</p>
      </div>

      <img
        :src="offerInfos.pictures.data[0].attributes.url"
        :alt="offerInfos.title"
      />

      <p>{{ offerInfos.title }}</p>

      <p>{{ offerInfos.price }} €</p>
    </div>

    <div class="secondPart">
      <div>
        <p>{{ formatDate }}</p>
      </div>

      <font-awesome-icon :icon="['far', 'heart']" />
    </div>
  </RouterLink>
</template>

<style scoped>
.offerCard {
  height: 380px;
  width: calc((100% - 60px) / 5);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
img {
  height: 25px;
  width: 25px;
  border-radius: 50%;
  object-fit: cover;
}
.firstPart > img {
  height: 240px;
  width: 100%;
  border-radius: 10px;
  margin: 7px 0 5px 0;
}
.firstPart p {
  font-weight: bold;
  line-height: 20px;
}
.firstPart p:last-child {
  margin-top: 5px;
}
.owner {
  display: flex;
  align-items: center;
  gap: 5px;
}
.owner p {
  font-size: 14px;
}
.secondPart {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.secondPart p {
  color: var(--grey);
  font-size: 12px;
  line-height: 16px;
}
svg {
  font-size: 20px;
  color: var(--grey);
}
@media (max-width: 1050px) {
  .offerCard {
    height: 400px;
    width: calc((100% - 45px) / 4);
  }

  .firstPart > img {
    height: 300px;
  }
}

@media (max-width: 880px) {
  .offerCard {
    height: 450px;
    width: calc((100% - 30px) / 3);
  }

  .firstPart > img {
    height: 350px;
  }
}

@media (max-width: 650px) {
  .offerCard {
    height: 450px;
    width: calc((100% - 15px) / 2);
  }

  .firstPart > img {
    height: 320px;
  }
}

@media (max-width: 460px) {
  .offerCard {
    width: 85%;
  }
}
</style>
