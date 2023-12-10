'use client';
import { useState, useEffect } from 'react';

import * as companyServices from '@/apiServices/companyServices';
import CompanyCard from '@/components/CompanyCard';

const CompaniesList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await companyServices.getAll({
        params: { page: 1, limit: 10 },
      });
      setData(res);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className='padding-container max-container w-full mt-[120px] mb-[120px]'>
      <div className='flex-col flexStart gap-6 text-center mb-12 '>
        <h2 className='font-semibold text-[38px]'>Công ty tiêu biểu</h2>
        <p className='text-[#434343] max-w-2xl'>
          Trong số hơn +16,000 doanh nghiệp đang phát triển mạnh mẽ tại Việt
          Nam, cùng khám phá danh sách các công ty tiêu biểu để tìm ra đối tác
          tiềm năng với doanh nghiệp của bạn.
        </p>
      </div>

      <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 '>
        {data &&
          data.map((card, index) => {
            return <CompanyCard key={index} card={card} />;
          })}
      </div>
    </div>
  );
};

export default CompaniesList;
