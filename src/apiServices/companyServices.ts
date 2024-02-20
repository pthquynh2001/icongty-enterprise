import * as request from '@/utils/request';

export const getAll = async (params?: {}) => {
  try {
    const res = await request.getCompany('company/companies', params);
    return res;
  } catch (error) {
    console.error(error);
  }
};

// export const createCompany = async (params?: {}) => {
//   try {
//     const res = await request.createCompany('company/companies');
//     return res;
//   } catch (error) {
//     console.error(error);
//   }
// };

export const update = async (id: string) => {
  try {
    const res = await request.updateCompany(`company/companies/${id}`);
    return res;
  } catch (error) {
    console.error(error);
  }
};
