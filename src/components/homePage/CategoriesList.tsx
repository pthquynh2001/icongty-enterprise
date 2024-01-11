'use client';
import { useState, useEffect } from 'react';
import { Button, ConfigProvider } from 'antd';
import Link from 'next/link';
import * as categoryServices from '@/apiServices/categoryServices';
import CategoryCard from '@/components/shared/card/CategoryCard';
import Pagination from '../shared/pagination/Pagination';
const CategoriesList = () => {
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const pagination = { limit: 12, totalItems: 100, page: page };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await categoryServices.getAll({
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
          <h3 className='font-semibold text-neutral-11  md:hidden'>
            Danh mục ngành nghề
          </h3>
          <h2 className='font-semibold text-neutral-11 hidden md:block'>
            Danh mục ngành nghề
          </h2>
          <Link href={`/categories`}>
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
          <div className='w-full grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-6 '>
            {data &&
              data.map((card, index) => {
                return (
                  <CategoryCard
                    key={index}
                    name={card.name}
                    companyCount={card.companyCount}
                  />
                );
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

export default CategoriesList;
