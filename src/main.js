import './assets/main.css'

import { createApp, ref } from 'vue'
import App from './App.vue'
import router from './router'

import VueCookies from 'vue-cookies'

import { library } from '@fortawesome/fontawesome-svg-core'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {
  faPlusSquare,
  faHeart,
  faClock,
  faUser,
  faEyeSlash,
} from '@fortawesome/free-regular-svg-icons'

import {
  faCheckDouble,
  faMapMarkerAlt,
  faCircle,
  faSearch,
  faArrowRight,
  faSignOutAlt,
  faAngleLeft,
  faAngleRight,
  faCheck,
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faPlusSquare,
  faHeart,
  faCheckDouble,
  faClock,
  faMapMarkerAlt,
  faUser,
  faCircle,
  faSearch,
  faArrowRight,
  faEyeSlash,
  faSignOutAlt,
  faAngleLeft,
  faAngleRight,
  faCheck,
)

const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon)

app.use(router)

const userInfos = ref(
  // eslint-disable-next-line no-undef
  $cookies.get('userInfos') || {
    id: '',
    username: '',
    token: '',
  },
)
const changeUserInfos = infos => {
  userInfos.value = infos
}

app.provide('GlobalStore', {
  userInfos: userInfos,
  changeUserInfos: changeUserInfos,
})
app.use(VueCookies, { expires: '7d', secure: 'true', sameSite: 'Lax' })
app.mount('#app')
