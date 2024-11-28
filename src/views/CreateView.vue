<script setup>
import { ref, inject, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const GlobalStore = inject('GlobalStore')
const router = useRouter()

const title = ref('')
const price = ref(null)
const description = ref('')
const pictures = ref(null)

const errorMessage = ref('')
const isPublishing = ref(false)

const handleSubmit = async () => {
  errorMessage.value = ''

  isPublishing.value = true

  if (title.value && price.value && description.value && pictures.value) {
    const formData = new FormData()

    for (const key in pictures.value) {
      if (Object.hasOwnProperty.call(pictures.value, key)) {
        formData.append('files.pictures', pictures.value[key])
      }
    }

    const stringifiedInfos = JSON.stringify({
      title: title.value,
      description: description.value,
      price: price.value,
      owner: GlobalStore.userInfos.value.id,
    })

    formData.append('data', stringifiedInfos)

    try {
      const { data } = await axios.post(
        'https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers',
        formData,
        {
          headers: {
            Authorization: 'Bearer ' + GlobalStore.userInfos.value.token,
            'Content-Type': 'multipart/form-data',
          },
        },
      )

      isPublishing.value = false

      router.push({ name: 'offer', params: { id: data.data.id } })
    } catch (error) {
      console.log('catch Publish>>', error)

      errorMessage.value = 'Il y a eu un souci, veuillez réessayer'
      isPublishing.value = false
    }
  } else {
    errorMessage.value = 'Veuillez remplir tous les champs'
    isPublishing.value = false
  }
}

const imagesPreviewArray = computed(() => {
  const tab = []

  for (const key in pictures.value) {
    if (Object.hasOwnProperty.call(pictures.value, key)) {
      tab.push(URL.createObjectURL(pictures.value[key]))
    }
  }

  return tab
})

const selectPictures = event => {
  errorMessage.value = ''

  const numOfFile = event.target.files.length

  if (numOfFile <= 10) {
    pictures.value = event.target.files
  } else {
    errorMessage.value = `10 photos maximum (${numOfFile} sélectionnés)`
  }
}

const btnText = computed(() => {
  if (isPublishing.value) {
    return 'Envoi en cours ...'
  } else {
    return 'Déposer mon annonce'
  }
})

const emptyErrorMessage = () => {
  errorMessage.value = ''
}
</script>

<template>
  <main>
    <div class="container">
      <h1>Déposer une annonce</h1>

      <form @submit.prevent="handleSubmit">
        <label for="title">Titre de l'annonce</label>
        <input
          type="text"
          name="title"
          id="title"
          v-model="title"
          @input="emptyErrorMessage()"
        />
        <p>Vous n'avez pas besoin de mentionner « Achat » ou « Vente » ici.</p>

        <label for="description">Description de l'annonce</label>
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="10"
          v-model="description"
          @input="emptyErrorMessage()"
        >
        </textarea>
        <p>
          Nous vous rappelons que la vente de contrefaçons est interdite. Nous
          vous invitons à ajouter tout élément permettant de prouver
          l’authenticité de votre article: numéro de série, facture, certificat,
          inscription de la marque sur l’article, emballage etc. Indiquez dans
          le texte de l’annonce si vous proposez un droit de rétractation à
          l’acheteur. En l’absence de toute mention, l’acheteur n’en bénéficiera
          pas et ne pourra pas demander le remboursement ou l’échange du bien ou
          service proposé
        </p>

        <label for="price">Votre prix de vente</label>
        <div class="priceBloc">
          <input
            type="number"
            name="price"
            id="price"
            v-model="price"
            @input="emptyErrorMessage()"
          />
          <span>€</span>
        </div>

        <div>
          <label for="pictures">
            Ajoutez des photos
            <div class="selectPictures">
              <font-awesome-icon :icon="['fas', 'camera']" />
              <span>Sélectionnez jusqu'à 10 photos</span>
            </div>

            <input
              type="file"
              name="pictures"
              id="pictures"
              multiple
              @input="selectPictures"
            />
          </label>

          <div class="previewsBloc">
            <div v-for="image in imagesPreviewArray" :key="image">
              <img
                :src="image"
                alt="Prévisualisation des images sélectionnées"
              />
            </div>
          </div>
        </div>

        <button :disabled="isPublishing">{{ btnText }}</button>
      </form>

      <p v-if="errorMessage" class="errorMessage">{{ errorMessage }}</p>
    </div>
  </main>
</template>

<style scoped>
main {
  background-color: var(--grey-light);
  padding-top: 40px;
}
.container {
  background-color: white;
  padding: 20px;
  border-radius: 15px;
}
h1 {
  font-weight: bold;
  font-size: 22px;
  margin-bottom: 50px;
}
form {
  display: flex;
  flex-direction: column;
}
label {
  margin-bottom: 10px;
}
p {
  color: var(--grey);
  font-size: 12px;
  margin: 5px 0 30px 0;
  width: 770px;
}
input:not([type='number']),
textarea {
  border-radius: 10px;
  border: 1px solid var(--grey);
  padding: 13px;
  width: 770px;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  border: 1px solid var(--grey);
  border-radius: 15px 0 0 15px;
  padding: 10px;
  height: 55%;
  appearance: none;
}
.priceBloc {
  margin-bottom: 30px;
  height: 45px;
  display: flex;
  align-items: center;
}
.priceBloc span {
  height: 100%;
  width: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--grey);
  border-left: none;
  border-radius: 0 15px 15px 0;
  font-size: 14px;
}
input[type='file'] {
  display: none;
}
.selectPictures {
  border: 1px solid var(--blue-dark);
  border-radius: 10px;
  margin-top: 10px;
  padding: 5px;
  width: 150px;
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  cursor: pointer;
}
.selectPictures svg {
  font-size: 40px;
  color: var(--blue-dark);
}
.selectPictures span {
  text-align: center;
  line-height: 20px;
  color: var(--blue-dark);
}
.previewsBloc {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
}
.previewsBloc > div {
  width: calc((100% - 40px) / 5);
  aspect-ratio: 1/1;
}
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}
button {
  align-self: flex-end;
  background-color: var(--orange);
  padding: 10px;
  margin-top: 40px;
  border: none;
  border-radius: 10px;
  color: white;
  font-weight: bold;
  cursor: pointer;
}
button:disabled {
  opacity: 0.5;
  cursor: auto;
}
.errorMessage {
  text-align: center;
  color: var(--orange);
  font-size: 18px;
}
</style>
