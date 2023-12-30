import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/json';

// GET COMPANY
export const requestCompany = axios.create({
  baseURL: 'https://6572cc83192318b7db410671.mockapi.io/api/v1/',

  // baseURL: 'https://93e3278c-2fff-469e-9b0e-fbde38a72825.mock.pstmn.io/',
});
export const getCompany = async (path: string, params?: {}) => {
  const res = await requestCompany.get(path, params);
  return res.data;
};

// GET POST
export const requestPost = axios.create({
  baseURL: 'https://658ea5812871a9866e7987df.mockapi.io/api/v1/',
  // baseURL: 'https://93e3278c-2fff-469e-9b0e-fbde38a72825.mock.pstmn.io/',
});

export const getPost = async (path: string, params?: {}) => {
  const res = await requestPost.get(path, params);
  return res.data;
};
