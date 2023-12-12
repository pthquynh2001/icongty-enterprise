import axios from 'axios';
export const request = axios.create({
  baseURL: 'https://6572cc83192318b7db410671.mockapi.io/api/v1/',
  // baseURL: 'https://93e3278c-2fff-469e-9b0e-fbde38a72825.mock.pstmn.io/',
});

export const get = async (path: string, options?: {}) => {
  const res = await request.get(path, options);
  return res.data;
};
