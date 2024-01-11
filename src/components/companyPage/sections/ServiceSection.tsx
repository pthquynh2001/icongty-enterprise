import React from 'react';
import { useState, useEffect } from 'react';
import * as ServicesServices from '@/apiServices/servicesServices';
import Frame from '@/components/subpage/ContentFrame';
import Service from '@/components/companyPage/Service';
import ProgressPagination from '@/components/shared/pagination/ProgressPagination';

const ServiceSection = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const pagination = { page: currentPage, limit: 3, totalItems: 11 };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await ServicesServices.getAll({
        params: { page: currentPage, limit: pagination.limit },
      });
      setData(res);
      setLoading(false);
    };
    fetchData();
  }, [currentPage, pagination.limit]);

  return (
    data && (
      <div>
        <Frame title='Dịch vụ'>
          {data.map((service, index) => (
            <div key={index} className='py-6 border-b border-neutral-4'>
              <Service
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
        </Frame>
      </div>
    )
  );
};

export default ServiceSection;
