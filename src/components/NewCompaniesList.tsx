'use client';
import { useState, useEffect } from 'react';
import { Button, ConfigProvider } from 'antd';
import Link from 'next/link';
import * as companyServices from '@/apiServices/companyServices';
import CompanyCardSmall from '@/components/CompanyCardSmall';
import Pagination from './Pagination';
const NewCompaniesList = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const pagination = { limit: 9, totalItems: 9, page: page };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await companyServices.getAll({
        params: { page: page, limit: pagination.limit },
      });
      setLoading(false);
      setData(res);
    };
    fetchData();
  }, [page, pagination.limit]);

  return (
    data && (
      <div className='padding-container max-container w-full'>
        <div className='flexBetween gap-6 text-center mb-12 '>
          <h3 className='font-semibold text-neutral-11 md:hidden'>
            Doanh nghiệp mới
          </h3>
          <h2 className='font-semibold text-neutral-11 hidden md:block'>
            Doanh nghiệp mới
          </h2>
          <Link href={`/`}>
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    contentFontSize: 16,
                    fontWeight: 600,
                  },
                },
              }}
            >
              <Button type='primary' size='large'>
                Xem tất cả
              </Button>
            </ConfigProvider>
          </Link>
        </div>
        <div className='flexStart flex-col'>
          <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 '>
            {data.map((card, index) => {
              return <CompanyCardSmall key={index} card={card} />;
            })}
          </div>

          {pagination.totalItems / pagination.limit > 1 && (
            <div className='mt-12 '>
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
    )
  );
};

export default NewCompaniesList;
