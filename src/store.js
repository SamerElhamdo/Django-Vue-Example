import Vue from 'vue'
import Vuex from 'vuex'
import { getAPI } from './axios-api'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    accessToken: localStorage.getItem('user-token') || null,
    refreshToken: localStorage.getItem('user-token-refresh') || null,
    APIData: ''
  },
  mutations: {
    updateStorage (state, { access, refresh }) {
      localStorage.setItem('user-token', access)
      localStorage.setItem('user-token-refresh', refresh)
      state.accessToken = access
      state.refreshToken = refresh
      
    },
    destroyToken (state) {
      state.accessToken = null
      state.refreshToken = null
      localStorage.removeItem('user-token')
      localStorage.removeItem('user-token-refresh')
    }
  },
  getters: {
    loggedIn (state) {
      return state.accessToken != null
    }
  },
  actions: {
    userLogout (context) {
      if (context.getters.loggedIn) {
          context.commit('destroyToken')
      }
    },
    userLogin (context, usercredentials) {
      return new Promise((resolve, reject) => {
        getAPI.post('/api-token/', {
          username: usercredentials.username,
          password: usercredentials.password
        })
          .then(response => {
            context.commit('updateStorage', { access: response.data.access, refresh: response.data.refresh }) 
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    refreshToken () {
      getAPI.post('/api-token-refresh/', {
        refresh: this.state.refreshToken
      })
      .then(response => {
        this.state.accessToken = response.data.access,
        localStorage.setItem('user-token', response.data.access)        
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
})
