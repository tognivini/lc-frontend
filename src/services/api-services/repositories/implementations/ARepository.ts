import { api } from '../../../axios'

// export const geta = (params:any, paginated:any) => {
//   return new Promise((resolve, reject) => {
//     api
//       .get('/api/a', { params })
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

export const postA = (payload:any) => {
  return new Promise((resolve, reject) => {
    api
      .post('/api/a', payload)
      .then(({ data }) => resolve(data))
      .catch(({ response }) => reject(response.data))
  })
}

export const editA = (id:string, payload:any) => {
  return new Promise((resolve, reject) => {
    api
      .put(`/api/a/${id}`, payload)
      .then(({ data }) => resolve(data))
      .catch(reject)
  })
}