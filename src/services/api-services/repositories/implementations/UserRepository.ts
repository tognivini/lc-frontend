import { api } from "../../../axios";
import { routes } from "../../types/endpoints";

async function onGetAllUsers(params:any) {
  try {
    return (await api.get(routes.LIST_USERS, { params })).data;
  } catch (error) {
    throw error;
  }
}

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
const onUpdateUser = (payload:any, userId:any) => {
  console.log(payload, userId)
  // console.log()
  return new Promise((resolve, reject) => {
    api
      .put(routes.EDIT_USER + userId, payload)
      .then((data:any ) => {
        resolve(data?.data);
      })
      .catch(reject);
  });
};

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
  onGetAllUsers,
  // onCreateUser,
  // onGetUserDataById,
  onUpdateUser,
  // onUpdateProfile
};
