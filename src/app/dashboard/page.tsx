import { UserInfo } from '@/components/form';
import { Header } from '@/components/shared';
import React from 'react';

const DashboardPage = () => {
  return (
    <>
      <Header />
      <div className='max-container padding-container flexCenter h-screen flex-col'>
        <UserInfo />
      </div>
    </>
  );
};

export default DashboardPage;
