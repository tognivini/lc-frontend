import { api } from '../../../axios'
import axios from 'axios'
import { routes } from '../../types/endpoints'
import jwtDecode from 'jwt-decode'

export async function login(payload:any) {
  return new Promise((resolve, reject) => {
    api
      .post(routes.LOGIN, payload)
      .then(response => {
        const { data } = response.data

        const decoded:any= jwtDecode(data.token)

        // api.defaults.headers.Authorization = data.token
        // api.defaults.headers.refreshToken = data.refreshToken
        // api.defaults.headers.testando = true

        resolve({ ...data, ...decoded, error: false })
      })
      .catch(error => {
        reject(error)
      })
  })
}
export const refreshTokenRequest = async (refreshToken:any) => {
  try {
    const response = await axios.post(
      api.defaults.baseURL + routes.REFRESH_TOKEN,
      {
        refreshToken: `${refreshToken}`
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    return response.data ? response.data.data : {}
  } catch (error) {
    throw new Error()
  }
}
