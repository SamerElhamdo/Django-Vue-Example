import axios from 'axios'

const getAPI = axios.create({
    baseURL: 'https://django-vue-samer.herokuapp.com',
    timeout: 1000,
})

export { getAPI }