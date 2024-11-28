<script setup>
import { onMounted, ref, inject, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

import BtnPublishOffer from '../components/BtnOffer.vue'

const GlobalStore = inject('GlobalStore')
const router = useRouter()

const userInfos = ref(null)

onMounted(async () => {
  try {
    const { data } = await axios.get(
      `https://site--strapileboncoin--2m8zk47gvydr.code.run/api/users/me?populate[0]=offers&populate[1]=offers.pictures`,
      {
        headers: {
          Authorization: 'Bearer ' + GlobalStore.userInfos.value.token,
          'Content-Type': 'multipart/form-data',
        },
      },
    )

    console.log('ProfileView - data >>>', data)

    userInfos.value = data
  } catch (error) {
    console.log('ProfileView - catch >>>', error)
  }
})

const deleteOffer = async id => {
  try {
    const { data } = await axios.delete(
      `https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers/${id}`,
      {
        headers: {
          Authorization: 'Bearer ' + GlobalStore.userInfos.value.token,
          'Content-Type': 'multipart/form-data',
        },
      },
    )

    // console.log('ProfileView - deletedData >>>', data)

    // Permet de rafraichir la page pour redéclencher la requête récupérant les informations de l'utilisateur
    router.go()
  } catch (error) {
    console.log('ProfileView - catch >>>', error)
  }
}

const totalOffers = computed(() => {
  const numOfOffers = userInfos.value.offers.length

  if (numOfOffers === 1) {
    return `${numOfOffers} annonce`
  } else {
    return `${numOfOffers} annonces`
  }
})
</script>

<template>
  <main>
    <div class="container">
      <p v-if="!userInfos">Chargement en cours...</p>

      <div v-else>
        <div class="profilBloc">
          <img
            :src="userInfos.avatar.url"
            alt=""
            v-if="userInfos.avatar"
            class="avatar"
          />
          <div v-else class="avatar">
            <p>{{ userInfos.username[0] }}</p>
          </div>

          <div class="infos">
            <h1>{{ userInfos.username }}</h1>
            <p>{{ userInfos.email }}</p>
          </div>
        </div>

        <!-- Bloc s'il n'y a pas d'annonce -->
        <div v-if="userInfos.offers.length === 0" class="offersList">
          <p>Vous n’avez aucune annonce en ligne</p>
          <BtnPublishOffer />
        </div>

        <!-- Bloc s'il y a des annonces -->
        <div v-else>
          <h2>{{ totalOffers }}</h2>

          <div class="offersList">
            <div v-for="offer in userInfos.offers" class="offer" :key="offer">
              <img :src="offer.pictures[0].url" alt="" />

              <div>
                <p class="title">{{ offer.title }}</p>
                <p class="price">{{ offer.price }} €</p>
              </div>

              <font-awesome-icon
                :icon="['fas', 'trash']"
                @click="deleteOffer(offer.id)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.container {
  padding: 40px 0;
}
h1 {
  font-size: 24px;
  font-weight: bold;
}
h2 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
}

/* -- Partie profil ---------- */
.profilBloc {
  border: 1px solid var(--grey);
  border-radius: 15px;
  padding: 15px;
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
}
.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: var(--grey);
  display: flex;
  justify-content: center;
  align-items: center;
}
.avatar p {
  color: white;
  font-size: 40px;
}
.infos {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
}
/* -- Partie listes des offres ---------- */
.offersList {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  border-radius: 15px;
  padding: 25px 15px;
}
.offer {
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 50px;
  border-radius: 10px;
  box-shadow: 0 0 5px 3px var(--grey-med);
  padding: 15px;
}
.offer > div {
  display: flex;
  align-items: center;
  flex: 1;
}
.title {
  font-size: 22px;
  font-weight: bold;
  flex: 2;
}
.price {
  font-size: 18px;
  color: var(--brown);
  font-weight: bold;
  flex: 1;
  text-align: center;
}
.offer img {
  height: 100%;
  aspect-ratio: 1/1;
  border-radius: 5px;
  object-fit: cover;
}
svg {
  color: var(--orange);
  cursor: pointer;
}

/* -------------------------------- */
/* -- MEDIA QUERY ----------------- */
/* -------------------------------- */
@media (max-width: 1090px) {
  .container {
    padding: 100px 20px 20px 20px;
  }
}

@media (max-width: 650px) {
  .offer > div {
    gap: 20px;
  }
  .title {
    font-size: 18px;
  }
  .price {
    font-size: 16px;
  }
}

@media (max-width: 460px) {
  .offer {
    gap: 20px;
    height: fit-content;
    flex-direction: column;
  }
  .offer > div {
    width: 100%;
    align-items: flex-start;
    flex-direction: column;
    gap: 20px;
  }
  .title {
    font-size: 20px;
  }
  .offer img {
    height: fit-content;
    width: 100%;
  }
  svg {
    align-self: flex-end;
  }
}
</style>
