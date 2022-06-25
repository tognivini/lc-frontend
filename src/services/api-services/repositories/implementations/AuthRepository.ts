import { api } from "../../../axios";
// import axios from 'axios'
import { routes } from "../../types/endpoints";
import jwtDecode from "jwt-decode";

interface ILogin {
  email: string;
  password: string;
}

interface IDecodedTk {
  permissionType: string;
  userId: string;
}

export async function login(payload: ILogin) {
  return new Promise(async (resolve, reject) => {
    api
      .post(routes.LOGIN, payload)
      .then((response) => {
        const { data } = response.data;
        const decoded: IDecodedTk = jwtDecode(data?.token);

        const newPayloadDecoded = {
          permissionType: decoded?.permissionType,
          userId: decoded?.userId,
        };
        resolve({ ...data, ...newPayloadDecoded, error: false });
      })
      .catch((error) => {
        reject(error);
      });
  });
}
// export const refreshTokenRequest = async (refreshToken:any) => {
//   try {
//     const response = await axios.post(
//       api.defaults.baseURL + routes.REFRESH_TOKEN,
//       {
//         refreshToken: `${refreshToken}`
//       },
//       {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       }
//     )

//     return response.data ? response.data.data : {}
//   } catch (error) {
//     throw new Error()
//   }
// }
