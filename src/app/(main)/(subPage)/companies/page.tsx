'use client';
import { useState, useEffect } from 'react';
import * as companyServices from '@/apiServices/companyServices';
import SubpageBreadcrumb from '@/components/SubpageBreadcrumb';
import SubpageBanner from '@/components/SubpageBanner';
import SubpageSearch from '@/components/SubpageSearch';
import CompanyCard from '@/components/CompanyCard';
import Pagination from '@/components/Pagination';
import Header from '@/components/Header';
import Tag from '@/components/Tag/Tag';
import { Select, ConfigProvider } from 'antd';
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
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const pagination = { limit: 6, totalItems: 9, page: page };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await companyServices.getAll({
        params: { page: page, limit: pagination.limit },
      });
      setLoading(false);
      setCompaniesData(res);
    };
    fetchData();
  }, [page, pagination.limit]);

  return (
    <>
      <Header />
      <div className='mt-20'>
        <SubpageBreadcrumb items={items} />
      </div>
      <SubpageBanner
        title='Danh mục công ty'
        desc='Khám phá đối tác tiềm năng của bạn trong hơn 3,000+ doanh nghiệp trên iCongty'
        image='/images/companies-banner.png'
      />
      <SubpageSearch />
      <div className='max-container padding-container  mb-[120px]'>
        <div className='flexBetween border-b border-black border-opacity-5 pb-4 mb-8'>
          <div className='flexStart gap-4'>
            <h3 className=''>Tất cả công ty</h3>
            <Tag type='block'>6,545</Tag>
          </div>
          <div className='flexEnd'>
            <p>Sắp xếp theo:</p>
            <ConfigProvider
              theme={{
                token: {
                  colorText: '#2f61e6',
                },
              }}
            >
              <Select
                defaultValue='Từ A-Z'
                style={{ width: 102 }}
                bordered={false}
                options={[
                  { value: 'asc', label: 'Từ A-Z' },
                  { value: 'desc', label: 'Từ Z-A' },
                ]}
              />
            </ConfigProvider>
          </div>
        </div>
        {companiesData && (
          <div>
            <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6'>
              {companiesData.map((card, index) => {
                return <CompanyCard key={index} card={card} />;
              })}
            </div>
            <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 '>
              {companiesData.map((card, index) => {
                return <CompanyCard key={index} card={card} />;
              })}
            </div>
          </div>
        )}
        <div className='flexEnd'>
          {pagination.totalItems / pagination.limit > 1 && (
            <div className='mt-12'>
              <Pagination
                pagination={pagination}
                onPageChange={(page) => {
                  setPage(page);
                }}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CompaniesPage;
