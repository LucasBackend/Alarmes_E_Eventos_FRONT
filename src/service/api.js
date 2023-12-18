import axios from 'axios'

const api = axios.create({
  baseURL: 'https://alarmes-eventos.onrender.com'
})

//https://alarmes-eventos.onrender.com

export default api
