import * as request from '@/utils/request';

export const getAll = async (params: {}) => {
  try {
    const res = await request.get('company/category', params);
    return res;
  } catch (error) {
    console.error(error);
  }
};
