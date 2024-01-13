import React from 'react';
import { useState, useEffect } from 'react';
import * as serviceServices from '@/apiServices/serviceServices';
import { ContentFrame } from '@/components/subpage';
import Service from '../Service';
import { ProgressPagination } from '@/components/shared';
import { Skeleton } from 'antd';

const ServiceSection = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const pagination = { page: currentPage, limit: 3, totalItems: 11 };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await serviceServices.getAll({
        params: { page: currentPage, limit: pagination.limit },
      });
      setData(res);
      setLoading(false);
    };
    fetchData();
  }, [currentPage, pagination.limit]);

  return (
    <ContentFrame title='Sản Phẩm'>
      {loading
        ? [...Array(3)].map((_, index) => (
            <div
              key={index}
              className='flex gap-10 py-6 border-b border-neutral-4 min-h-[195px]'
            >
              <Skeleton active paragraph={{ rows: 3 }} />
              <Skeleton.Image />
            </div>
          ))
        : data &&
          data.map((service, index) => (
            <div key={index} className='py-6 border-b border-neutral-4'>
              <Service
                size='small'
                props={service}
                order={pagination.limit * (currentPage - 1) + index + 1}
              />
            </div>
          ))}
      {pagination.totalItems / pagination.limit > 1 && (
        <div className='mt-8'>
          <ProgressPagination
            pagination={pagination}
            onPageChange={(currentPage) => {
              setCurrentPage(currentPage);
            }}
          />
        </div>
      )}
    </ContentFrame>
  );
};

export default ServiceSection;
