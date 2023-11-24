import axios from 'axios'
import env from '../env'

// const BASE_URL = process.env.API_ENPOINT
const BASE_URL = env.API_ENDPOINT

const axiosInstance = axios.create({
  baseURL: BASE_URL,
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('session')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

const handleCall = async (api: any, msg: string | undefined) => {
  try {
    return await api
  } catch (error) {
    if (error.status == 401) {
      console.log('unauthorized')
    } else {
      console.log('server error')
    }
    return api.error
  }
}

export const api = {
  login: async (value) => {
    return await handleCall(
      axiosInstance.post(`/users/auth`, {
        username: value.username,
        password: value.password,
      }),
      'login by Email and password',
    )
  },

  getAllTodoList: async () => {
    return await handleCall(axiosInstance.get(`/todos/`), 'load all todo list')
  },

  getOneTodoList: async (_id) => {
    return await handleCall(
      axiosInstance.get(`/todos/${_id}`),
      'load one todo list',
    )
  },

  createList: async (value) => {
    return await handleCall(
      axiosInstance.post(`/todos/`, value),
      'create new todo list',
    )
  },

  deleteList: async (_id) => {
    return await handleCall(
      axiosInstance.delete(`/todos/${_id}`),
      'delete todo list',
    )
  },

  updateList: async (_id, value) => {
    return await handleCall(
      axiosInstance.put(`/todos/${_id}`, value),
      'update todo list',
    )
  },
}
