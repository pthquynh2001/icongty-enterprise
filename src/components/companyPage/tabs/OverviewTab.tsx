import React from 'react';
import { COMPANY_ABOUT_CONTENT } from '@/constants';
import {
  InfoSection,
  AboutSection,
  PortfolioSection,
  ProductSection,
  ServiceSection,
} from '@/components/companyPage/tabs/sections';

const OverviewTab = ({
  company,
  loading,
  companyId,
}: {
  company: any;
  loading: boolean;
  companyId: string;
}) => {
  return (
    <div className='w-full  flex flex-col gap-6'>
      <InfoSection company={company} loading={loading} />
      <AboutSection content={COMPANY_ABOUT_CONTENT.content} loading={loading} />
      <PortfolioSection loading={loading} />
      <ProductSection companyId={companyId} />
      <ServiceSection companyId={companyId} />
    </div>
  );
};

export default OverviewTab;
