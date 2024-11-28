<script setup>
import { onMounted, ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useCycleList } from '@vueuse/core'
import axios from 'axios'

import { formatPrice } from '../../utils/formatPrice'

const props = defineProps({
  id: {
    required: true,
  },
})

const offerInfos = ref({})

const cyclelist = computed(() => {
  const { state, next, prev } = useCycleList(
    offerInfos.value.attributes.pictures.data,
  )

  return { state, next, prev }
})

onMounted(async () => {
  try {
    const { data } = await axios.get(
      `https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers/${props.id}?populate[0]=pictures&populate[1]=owner.avatar`,
    )

    console.log('OfferView - data >>>', data.data)

    offerInfos.value = data.data
  } catch (error) {
    console.log('OfferView - catch >>>', error)
  }
})

const formatDate = computed(() => {
  return offerInfos.value.attributes.updatedAt
    ?.split('T')[0]
    .split('-')
    .reverse()
    .join('/')
})

const formatedPrice = computed(() => {
  const price = offerInfos.value.attributes.price

  return formatPrice(price)
})
</script>

<template>
  <main>
    <div class="container">
      <p v-if="!offerInfos.id">Chargement en cours ...</p>

      <div v-else class="offerBloc">
        <div class="firstCol">
          <div>
            <font-awesome-icon
              :icon="['fas', 'angle-left']"
              @click="cyclelist.prev()"
              v-if="offerInfos.attributes.pictures.data?.length > 1"
            />

            <img
              :src="cyclelist.state.value.attributes.url"
              :alt="offerInfos.attributes.title"
            />

            <font-awesome-icon
              :icon="['fas', 'angle-right']"
              @click="cyclelist.next()"
              v-if="offerInfos.attributes.pictures.data?.length > 1"
            />
          </div>

          <h1>{{ offerInfos.attributes.title }}</h1>

          <p>{{ formatedPrice }} €</p>

          <p class="date">{{ formatDate }}</p>

          <RouterLink
            :to="{ name: 'payment', params: { id: offerInfos.id } }"
            class="displayButtonSmall"
            >Acheter</RouterLink
          >

          <h2>Description</h2>
          <p>{{ offerInfos.attributes.description }}</p>

          <p class="city">
            <font-awesome-icon :icon="['fas', 'location-dot']" />
            Agon-Coutainville (50230)
          </p>
        </div>

        <div class="secondCol">
          <div class="owner">
            <div>
              <img
                :src="
                  offerInfos.attributes.owner.data.attributes.avatar.data
                    .attributes.url
                "
                :alt="offerInfos.attributes.owner.data.attributes.username"
                v-if="offerInfos.attributes.owner.data.attributes.avatar.data"
              />
              <p>{{ offerInfos.attributes.owner.data.attributes.username }}</p>
            </div>

            <p class="identity">
              <font-awesome-icon :icon="['fas', 'check-double']" /> Pièce
              d’identité vérifiée
            </p>
            <p>
              <font-awesome-icon :icon="['far', 'clock']" /> Répond généralement
              en 1 heure
            </p>
          </div>

          <div>
            <RouterLink :to="{ name: 'payment', params: { id: offerInfos.id } }"
              >Acheter</RouterLink
            >
            <button>Message</button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.container {
  padding: 30px 0;
}
.offerBloc {
  display: flex;
  gap: 20px;
}
.firstCol {
  width: 67%;
}
h1 {
  font-size: 24px;
  font-weight: bold;
  margin: 30px 0;
}
h1 + p {
  font-size: 18px;
  font-weight: bold;
}
.date {
  font-size: 12px;
  color: var(--grey);
  margin-top: 20px;
}
h2 {
  border-top: 1px solid var(--grey-med);
  font-size: 18px;
  border-width: bold;
  margin: 50px 0 25px 0;
  padding-top: 20px;
  font-weight: bold;
}
.firstCol img {
  width: 100%;
  height: 350px;
  object-fit: contain;
}
.firstCol > div {
  position: relative;
}
.firstCol > div svg {
  cursor: pointer;
  position: absolute;
  top: 50%;
}
.firstCol svg:first-child {
  left: 10px;
}
.firstCol svg:last-child {
  right: 10px;
}
.secondCol {
  width: 33%;
  height: 375px;
  box-shadow: 0 0 5px var(--grey-med);
  border-radius: 2px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.secondCol img {
  height: 65px;
  width: 65px;
  border-radius: 50%;
  object-fit: cover;
}
.owner {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.owner > div {
  display: flex;
  gap: 15px;
}
.owner > div p {
  font-weight: bold;
  text-transform: uppercase;
  font-size: 18px;
}
.identity {
  font-size: 12px;
  color: var(--brown);
  background-color: var(--orange-pale);
  border-radius: 10px;
  padding: 4px 7px;
  align-self: flex-start;
}
.identity + p {
  font-size: 14px;
}
.city {
  border-top: 1px solid var(--grey-med);
  margin: 50px 0 25px 0;
  padding-top: 20px;
}
svg {
  margin-right: 3px;
}
.secondCol > div:last-child {
  margin-top: 15px;
  padding: 15px 0;
  border-top: 1px solid var(--grey-med);
  display: flex;
  flex-direction: column;
  gap: 10px;
}
button,
a {
  border: none;
  color: white;
  padding: 15px;
  border-radius: 15px;
  font-weight: bold;
  font-size: inherit;
}
a {
  background-color: var(--orange);
  text-align: center;
}
button:last-child {
  background-color: var(--blue-dark);
}
.displayButtonSmall {
  display: none;
}
@media (max-width: 1090px) {
  .container {
    padding: 10px 20px 20px 20px;
  }
}

@media (max-width: 970px) {
  .firstCol {
    width: 100%;
  }
  .secondCol {
    display: none;
  }
  .displayButtonSmall {
    display: block;
    margin-top: 20px;
  }
}
</style>
