import React from 'react';
import { useState, useEffect } from 'react';
import * as serviceServices from '@/apiServices/serviceServices';
import { Item, ContentFrame } from '@/components/subpage';
import { ProgressPagination } from '@/components/shared';
import { Skeleton } from 'antd';

const ServiceSection = ({ companyId }: { companyId: string }) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const itemsPerPage = 3;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentServices = data?.slice(indexOfFirstItem, indexOfLastItem);
  const pagination = {
    page: currentPage,
    limit: itemsPerPage,
    totalItems: data.length,
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await serviceServices.getAll({
        params: { companyId: companyId },
      });
      setData(res);
      setLoading(false);
    };
    fetchData();
  }, [companyId]);

  return (
    <ContentFrame title='Dịch Vụ'>
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
        : currentServices &&
          currentServices.map((service, index) => (
            <div key={index} className='py-6 border-b border-neutral-4'>
              <Item
                type='service'
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
