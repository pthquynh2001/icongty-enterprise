import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/json';

// GET COMPANY
export const requestCompany = axios.create({
  baseURL: 'https://6572cc83192318b7db410671.mockapi.io/api/v1/',
});
export const getCompany = async (path: string, params?: {}) => {
  const res = await requestCompany.get(path, params);
  return res.data;
};

// GET POST
export const requestPost = axios.create({
  baseURL: 'https://658ea5812871a9866e7987df.mockapi.io/api/v1/',
});

export const getPost = async (path: string, params?: {}) => {
  const res = await requestPost.get(path, params);
  return res.data;
};

// GET PORTFOLIO
export const requestPortfolio = axios.create({
  baseURL: 'https://659976faa20d3dc41cefc716.mockapi.io/api/v1/',
});

export const getPortfolio = async (path: string, params?: {}) => {
  const res = await requestPortfolio.get(path, params);
  return res.data;
};

// GET PRODUCTS
export const requestProducts = axios.create({
  baseURL: 'https://659976faa20d3dc41cefc716.mockapi.io/api/v1/',
});

export const getProducts = async (path: string, params?: {}) => {
  const res = await requestProducts.get(path, params);
  return res.data;
};
