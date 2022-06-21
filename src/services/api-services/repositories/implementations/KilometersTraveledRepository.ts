import { api } from '../../../axios'

// export const getKilometersTraveled = (params:any, paginated:any) => {
//   return new Promise((resolve, reject) => {
//     api
//       .get('/api/km-traveled', { params })
//       .then(({ data }) => {
//         if (paginated) {
//           resolve(data)
//         } else {
//           resolve(data.data)
//         }
//       })
//       .catch(error => reject({ ...error.response.data, data: [], error: true }))
//   })
// }

export const postKilometerTraveled = (payload:any) => {
  return new Promise((resolve, reject) => {
    api
      .post('/api/km-traveled', payload)
      .then(({ data }) => resolve(data))
      .catch(({ response }) => reject(response.data))
  })
}

export const editKilometerTraveled = (id:string, payload:any) => {
  return new Promise((resolve, reject) => {
    api
      .put(`/api/km-traveled/${id}`, payload)
      .then(({ data }) => resolve(data))
      .catch(reject)
  })
}
