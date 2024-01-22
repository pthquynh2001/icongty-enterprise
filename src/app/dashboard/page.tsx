import { UserInfo } from '@/components/form';
import { Header } from '@/components/shared';
import React from 'react';
const DashboardPage = async () => {
  return (
    <>
      <Header />
      <div className='mt-20 mb-14 py-6 bg-neutral-4 w-full h-full flex'>
        <div className='left w-[320px]'></div>
        <div className='right border-l border-neutral-5'>
          <UserInfo />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
