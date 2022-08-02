import axios, { AxiosRequestConfig, CancelToken } from 'axios'
import JwtDecode from 'jwt-decode'
import { cleanEmptyQueryParams } from '../api-services/utils/cleanEmpryQueryParams'
// import { refreshTokenRequest } from '@shared/api-services'

const { REACT_APP_API_URL } = process.env

const baseURL = REACT_APP_API_URL || 'http://localhost:3333'

const api = axios.create({
  baseURL
})

api.interceptors.request.use(config => {
  try {
    config.params = cleanEmptyQueryParams(config.params || {})
    // config.params = config.params || {}
} catch (error) {}

  return config
})

export const setAccessToken = ({
  onLogout,
  // tokenCallback
}: any) => {
  return api.interceptors.request.use(async config => {
    try {
      // let _refreshToken = api.defaults.headers?.refreshToken
      // let _token = api.defaults.headers?.Authorization

      // let refreshTokenResponse = {
      //   token: _token,
      //   refreshToken: _refreshToken
      // }

      // const decodedToken = JwtDecode(_token)
      // const decodedRefreshToken = JwtDecode(_refreshToken)

      const currentTime = new Date().getTime()

    // const tokenIsExpired = currentTime > decodedToken.exp * 1000
    //   const refreshTokenIsExpired = currentTime > decodedRefreshToken.exp * 1000  

      // if (refreshTokenIsExpired === true) {
      //   throw new Error('Sessão expirada')
      // }

    //   if (tokenIsExpired) {
    //     refreshTokenResponse = await refreshTokenRequest(_refreshToken)
    //   }

      // _refreshToken = refreshTokenResponse.refreshToken
      // _token = refreshTokenResponse.token
      // config.headers.refreshToken = _refreshToken
      // config.headers.Authorization = _token

      // api.defaults.headers.refreshToken = _refreshToken
      // api.defaults.headers.Authorization = _token

      // tokenCallback &&
      //   tokenCallback({
      //     token: _token,
      //     refreshToken: _refreshToken
      //   })

      return config
    } catch (error) {
      onLogout && onLogout()

      return config
    }
  })
}

export { api, baseURL }
export type { AxiosRequestConfig, CancelToken }

