import React from 'react';
import { COMPANY_ABOUT_CONTENT } from '@/constants';
import {
  InfoSection,
  AboutSection,
  PortfolioSection,
  ProductSection,
  ServiceSection,
} from '@/components/companyPage/sections';

const OverviewTab = ({
  company,
  loading,
}: {
  company: any;
  loading: boolean;
}) => {
  return (
    <div className='w-full  flex flex-col gap-6'>
      <InfoSection company={company} loading={loading} />
      <AboutSection content={COMPANY_ABOUT_CONTENT.content} loading={loading} />
      <PortfolioSection loading={loading} />
      <ProductSection />
      <ServiceSection />
    </div>
  );
};

export default OverviewTab;
