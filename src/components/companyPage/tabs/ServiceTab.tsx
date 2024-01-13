import { useState, useEffect } from 'react';
import Service from '@/components/companyPage/Service';
import { Pagination } from '@/components/shared';
import * as servicesServices from '@/apiServices/serviceServices';
import { Skeleton } from 'antd';

const ServiceTab = () => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pagination = { page: currentPage, limit: 10, totalItems: 11 };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await servicesServices.getAll({
        params: { page: currentPage, limit: pagination.limit },
      });
      setData(res);
      setLoading(false);
    };
    fetchData();
  }, [currentPage, pagination.limit]);

  return loading ? (
    <div className='flex flex-col gap-10'>
      {[...Array(5)].map((_, index) => (
        <div
          className='flex gap-10 py-8 px-[62px] rounded-2xl bg-neutral-1 h-[218px]'
          key={index}
        >
          <Skeleton active paragraph={{ rows: 3 }} />
          <Skeleton.Image />
        </div>
      ))}
    </div>
  ) : (
    data && (
      <div className='flex flex-col gap-10'>
        {data.map((service: any, index: number) => (
          <div className='py-8 px-[62px] rounded-2xl bg-neutral-1' key={index}>
            <Service props={service} />
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

export default ServiceTab;
