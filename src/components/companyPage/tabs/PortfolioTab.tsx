import { useState, useEffect } from 'react';
import Link from 'next/link';
import Portfolio from '@/components/companyPage/Portfolio';
import Pagination from '@/components/shared/pagination/Pagination';
import * as portfolioServices from '@/apiServices/portfolioServices';
import { Skeleton } from 'antd';

const PortfolioTab = () => {
  const [data, setData] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const pagination = { page: currentPage, limit: 10, totalItems: 22 };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await portfolioServices.getAll({
        params: { page: currentPage, limit: pagination.limit },
      });
      setData(res);
      setLoading(false);
    };
    fetchData();
  }, [currentPage, pagination.limit]);
  return loading ? (
    <div className='flex flex-col gap-6'>
      {[...Array(5)].map((_, index) => (
        <div
          className='flex gap-6 py-6 px-[62px] rounded-2xl bg-neutral-1 h-[180px]'
          key={index}
        >
          <Skeleton.Image />
          <Skeleton active paragraph={{ rows: 3 }} />
        </div>
      ))}
    </div>
  ) : (
    data && (
      <div className='flex flex-col gap-6'>
        {data.map((portfolio: any, index: number) => (
          <div className='py-6 px-[62px] rounded-2xl bg-neutral-1' key={index}>
            <Portfolio props={portfolio} />
          </div>
        ))}
        {pagination.totalItems / pagination.limit > 1 && (
          <div className='flexEnd mt-2'>
            <Pagination
              pagination={pagination}
              onPageChange={(currentPage) => {
                setCurrentPage(currentPage);
              }}
            />
          </div>
        )}
      </div>
    )
  );
};

export default PortfolioTab;
