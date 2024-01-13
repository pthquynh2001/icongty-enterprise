import React from 'react';
import { useState, useEffect } from 'react';
import * as productServices from '@/apiServices/productServices';
import { ContentFrame } from '@/components/subpage';
import Product from '../Product';
import { ProgressPagination } from '@/components/shared';
import { Skeleton } from 'antd';

const ProductSection = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const pagination = { page: currentPage, limit: 3, totalItems: 11 };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await productServices.getAll({
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
          data.map((product, index) => (
            <div key={index} className='py-6 border-b border-neutral-4'>
              <Product
                size='small'
                props={product}
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

export default ProductSection;
