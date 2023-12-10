import axios from 'axios';
export const request = axios.create({
  baseURL: 'https://93e3278c-2fff-469e-9b0e-fbde38a72825.mock.pstmn.io/',
});

export const get = async (path: string, options?: {}) => {
  const res = await request.get(path, options);
  return res.data;
};
