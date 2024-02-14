'use client';
import { useState, useEffect } from 'react';

import * as companyServices from '@/apiServices/companyServices';
import CompanyCard from '@/components/shared/card/CompanyCard';
import Pagination from '@/components/shared/pagination/Pagination';
const CompaniesList = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const pagination = { limit: 6, totalItems: 9, page: page };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await companyServices.getAll({
        params: { page: page, limit: pagination.limit },
      });
      setData(res);
      setLoading(false);
    };
    fetchData();
  }, [page, pagination.limit]);

  return (
    <div className='padding-container max-container w-full '>
      <div className='flex-col flexStart gap-6 text-center mb-12 '>
        <h2 className='font-semibold text-neutral-11 hidden md:block'>
          Công ty tiêu biểu
        </h2>
        <h3 className='font-semibold text-neutral-11 md:hidden'>
          Công ty tiêu biểu
        </h3>
        <p className='text-neutral-9 max-w-2xl leading-[22px]'>
          Trong số hơn +16,000 doanh nghiệp đang phát triển mạnh mẽ tại Việt
          Nam, cùng khám phá danh sách các công ty tiêu biểu để tìm ra đối tác
          tiềm năng với doanh nghiệp của bạn.
        </p>
      </div>
      <div className='flexStart flex-col'>
        <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 '>
          {loading
            ? [...Array(6)].map((_, index) => (
                <CompanyCard skeleton key={index} />
              ))
            : data.map((card, index) => (
                <CompanyCard key={index} card={card} />
              ))}
        </div>

        {pagination.totalItems / pagination.limit > 1 && (
          <div className='mt-12'>
            <Pagination
              pagination={pagination}
              onPageChange={(page) => {
                setPage(page);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CompaniesList;
