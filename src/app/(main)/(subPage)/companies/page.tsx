'use client';
import { useState, useEffect } from 'react';
import * as companyServices from '@/apiServices/companyServices';
import {
  SubpageBreadcrumb,
  SubpageBanner,
  SubpageSearch,
} from '@/components/subpage';
import { CompanyCard, Pagination, Header, Tag } from '@/components/shared';
import { Select, ConfigProvider, Empty } from 'antd';
import SortBy from '@/components/shared/SortBy';
import { useSearchParams } from 'next/navigation';

// import { Metadata } from 'next';
// export const metadata: Metadata = {
//   title: {
//     absolute: 'Danh mục ngành nghề',
//   },
// };

const items = [
  { title: 'Trang chủ', href: '/' },
  {
    title: 'Danh mục công ty',
  },
];
const CompaniesPage = () => {
  const [companiesData, setCompaniesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [page, setPage] = useState(1);
  const pagination = { limit: 6, totalItems: 9, page: page };
  const searchedName = useSearchParams().get('name');
  const [searchParams, setSearchParams] = useState(
    searchedName ? { name: searchedName } : {}
  );

  //

  // fetch api ban dau
  useEffect(() => {
    if (searchParams) return;
    const fetchData = async () => {
      setLoading(true);
      const res = await companyServices.getAll({
        params: {
          page: page,
          limit: pagination.limit,
        },
      });
      setCompaniesData(res);
      setLoading(false);
    };
    fetchData();
  }, [page, pagination.limit, searchParams]);

  // fetch data dua tren filter (khong co api nen khong lam duoc) chi search tren name
  useEffect(() => {
    if (!searchParams) return;
    const fetchData = async () => {
      setLoading(true);
      setSearchLoading(true);
      const res = await companyServices.getAll({
        params: searchParams,
      });
      setCompaniesData(res);
      setLoading(false);
      setSearchLoading(false);
    };
    fetchData();
  }, [searchParams]);

  return (
    <div className='pt-20'>
      <Header />
      <div className='max-container padding-container mt-8 mb-[22px]'>
        <SubpageBreadcrumb items={items} />
      </div>
      <SubpageBanner
        title='Danh mục công ty'
        desc='Khám phá đối tác tiềm năng của bạn trong hơn 3,000+ doanh nghiệp trên iCongty'
        image='/images/companies-banner.png'
      />
      <SubpageSearch
        onSearch={(params) => setSearchParams(params)}
        loading={searchLoading}
      />
      <div className='max-container padding-container  mb-[120px]'>
        <div className='flexBetween border-b border-black border-opacity-5 pb-4 mb-8'>
          <div className='flexStart gap-4'>
            <h3 className=''>Tất cả công ty</h3>
            <Tag type='block'>123</Tag>
          </div>
          <SortBy />
        </div>
        {searchParams && companiesData && (
          <div className='mb-10 '>
            Có {companiesData.length} kết quả tìm kiếm cho:{' '}
            <span className='text-royalBlue font-semibold'>
              {searchParams.name}
            </span>
          </div>
        )}
        {loading ? (
          <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6'>
            {[...Array(6)].map((_, index) => (
              <CompanyCard skeleton key={index} />
            ))}
          </div>
        ) : companiesData ? (
          <div>
            <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {companiesData.map((card, index) => (
                <CompanyCard key={index} card={card} />
              ))}
            </div>
          </div>
        ) : (
          <Empty
            className='py-10'
            description={
              <p>
                Không thể tìm thấy công ty:{' '}
                <span className='text-royalBlue font-semibold'>
                  {searchParams.name}
                </span>
              </p>
            }
          />
        )}
        <div className='flexEnd'>
          {pagination.totalItems / pagination.limit > 1 ||
            (companiesData.length < 6 && (
              <div className='mt-12'>
                <Pagination
                  pagination={pagination}
                  onPageChange={(page) => {
                    setPage(page);
                  }}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CompaniesPage;
