import { api } from '../../../axios'
import { routes } from '../../types/endpoints'

// async function onListAllUsers(onlyUsers:any, params:any) {
//   try {
//     if (onlyUsers) {
//       const { data } = (await api.get(routes.LIST_USERS, { params })).data
//       return data
//     } else {
//       return (await api.get(routes.LIST_USERS, { params })).data
//     }
//   } catch (error) {
//     throw new Error(error)
//   }
// }

// async function onCreateUser(payload) {
//   try {
//     return (await api.post(routes.CREATE_USER, payload)).data
//   } catch (error) {
//     return { ...error.response.data, data: [], error: true }
//   }
// }

// const onCreateUser = payload => {
//   return new Promise((resolve, reject) => {
//     api
//       .post(routes.CREATE_USER, payload)
//       .then(({ data }) => {
//         resolve(data)
//       })
//       .catch(reject)
//   })
// }

// const onGetUserDataById = userId => {
//   return new Promise((resolve, reject) => {
//     api
//       .get('/api/users/' + userId)
//       .then(({ data }) => {
//         resolve(data.data)
//       })
//       .catch(reject)
//   })
// }
// const onUpdateUser = ({ payload, userId }) => {
//   return new Promise((resolve, reject) => {
//     api
//       .put('/api/users/' + userId, payload)
//       .then(({ data }) => {
//         resolve(data)
//       })
//       .catch(reject)
//   })
// }

// const onUpdateProfile = ({ payload, userId }) => {
//   return new Promise((resolve, reject) => {
//     api
//       .patch('/api/users/' + userId, payload)
//       .then(({ data }) => {
//         resolve(data)
//       })
//       .catch(reject)
//   })
// }

export {
  // onListAllUsers,
  // onCreateUser,
  // onGetUserDataById,
  // onUpdateUser,
  // onUpdateProfile
}
