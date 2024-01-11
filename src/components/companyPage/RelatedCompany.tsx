import React from 'react';
import { useState, useEffect } from 'react';
import * as companyServices from '@/apiServices/companyServices';
import Image from 'next/image';
import Link from 'next/link';
import Tag from '@/components/shared/tag/Tag';
import { Skeleton } from 'antd';

const RelatedCompany = () => {
  const [relatedCompanies, setRelatedCompanies] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  //   START: fetch data, 5 related companies
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await companyServices.getAll({
        params: { limit: 5, page: 1 },
      });
      setRelatedCompanies(res);
      setLoading(false);
    };
    fetchData();
  }, []);
  //   END: fetch data, 5 related companies
  return (
    <div className='w-full px-8 py-12 rounded-2xl  bg-neutral-1 shadow-banner'>
      <h5>Công ty tương tự</h5>
      <div className='flex flex-col mt-2 pt-4 border-t border-t-neutral-5 w-full gap-4'>
        {loading ? (
          <div className='grid grid-rows-5'>
            {[...Array(5)].map((_, index) => (
              <div key={index} className='w-full py-2'>
                <Skeleton avatar active paragraph={{ rows: 1 }} />
              </div>
            ))}
          </div>
        ) : (
          relatedCompanies.map((company: any, index: number) => (
            <div
              className='relative flex gap-4 w-full border-b border-neutral-4 pb-6'
              key={index}
            >
              <div className='relative w-16 h-16 rounded overflow-hidden shadow-banner flex-shrink-0'>
                <Link
                  href={`/companies/${company.slug}-${company._id}`}
                  className='block relative w-full h-full'
                >
                  <Image
                    src={company.logo?.location}
                    alt='logo'
                    fill
                    sizes='(max-width: 768px) 100vw, 33vw'
                    className='object-cover'
                  />
                </Link>
              </div>
              <div className=''>
                <Link href={`/companies/${company.slug}-${company._id}`}>
                  <p
                    className='text-xs font-semibold text-neutral-10 line-clamp-2 mb-2'
                    title={company.name}
                  >
                    {company.name}
                  </p>
                </Link>

                <div className='h-[22px] max-h-[22px] flex flex-wrap overflow-hidden'>
                  {company.categories?.map((category: any, index: number) => (
                    <Tag key={index} type='line' className='h-[22px] text-xs'>
                      {category.name}
                    </Tag>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RelatedCompany;
