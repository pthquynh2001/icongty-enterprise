import * as request from '@/utils/request';

export const getAll = async (params?: {}) => {
  try {
    const res = await request.getPortfolio('portfolio', params);
    return res;
  } catch (error) {
    console.error(error);
  }
};
