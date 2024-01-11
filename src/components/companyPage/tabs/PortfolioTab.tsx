import { useState, useEffect } from 'react';
import Link from 'next/link';
import Portfolio from '@/components/companyPage/Portfolio';
import Pagination from '@/components/shared/pagination/Pagination';
import * as portfolioServices from '@/apiServices/portfolioServices';

const PortfolioTab = ({ company }: any) => {
  const [data, setData] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pagination = { page: currentPage, limit: 10, totalItems: 22 };
  useEffect(() => {
    const fetchData = async () => {
      const res = await portfolioServices.getAll({
        params: { page: currentPage, limit: pagination.limit },
      });
      setData(res);
    };
    fetchData();
  }, [currentPage, pagination.limit]);
  return (
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
  );
};

export default PortfolioTab;
