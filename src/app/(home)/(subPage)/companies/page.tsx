// 'use client';
import { useState, useEffect } from 'react';
import * as categoryServices from '@/apiServices/categoryServices';
import SubpageBreadcrumb from '@/components/SubpageBreadcrumb';
import SubpageBanner from '@/components/SubpageBanner';
import SubpageSearch from '@/components/SubpageSearch';

// import { Metadata } from 'next';

// export const metadata: Metadata = {
//   title: {
//     absolute: 'Danh mục ngành nghề',
//   },
// };
const CompaniesPage = () => {
  const items = [
    { title: 'Trang chủ', href: '/' },
    {
      title: 'Danh mục công ty',
    },
  ];
  return (
    <div className=''>
      <SubpageBreadcrumb items={items} />
      <SubpageBanner
        title='Danh mục công ty'
        desc='Khám phá đối tác tiềm năng của bạn trong hơn 3,000+ doanh nghiệp trên iCongty'
        image='/images/companies-banner.png'
      />
      <SubpageSearch />
    </div>
  );
};

export default CompaniesPage;
