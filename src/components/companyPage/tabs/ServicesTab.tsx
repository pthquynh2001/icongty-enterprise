import { useState, useEffect } from 'react';
import Link from 'next/link';
import Service from '@/components/companyPage/Service';
import Pagination from '@/components/Pagination';
import * as servicesServices from '@/apiServices/servicesServices';

const ServicesTab = ({ companyId }: any) => {
  const [data, setData] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pagination = { page: currentPage, limit: 10, totalItems: 11 };
  useEffect(() => {
    const fetchData = async () => {
      const res = await servicesServices.getAll({
        params: { page: currentPage, limit: pagination.limit },
      });
      setData(res);
    };
    fetchData();
  }, [currentPage, pagination.limit]);
  return (
    <div className='flex flex-col gap-6'>
      {data.map((service: any, index: number) => (
        <div className='py-8 px-[62px] rounded-2xl bg-neutral-1' key={index}>
          <Service props={service} companyId={companyId} />
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

export default ServicesTab;
