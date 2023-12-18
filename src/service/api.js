import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3333'
})

//https://alarmes-eventos.onrender.com

export default api
