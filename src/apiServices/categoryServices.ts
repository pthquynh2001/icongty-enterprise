import * as request from '@/utils/request';

export const getAll = async (params?: {}) => {
  try {
    const res = await request.getCompany('company/category', params);
    return res;
  } catch (error) {
    console.error(error);
  }
};
