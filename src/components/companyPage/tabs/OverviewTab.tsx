import React from 'react';
import { COMPANY_ABOUT_CONTENT } from '@/constants';
import {
  InfoSection,
  AboutSection,
  PortfolioSection,
  ProductSection,
  ServiceSection,
} from '@/components/companyPage/sections';

const OverviewTab = ({ company }: any) => {
  return (
    <div className='w-full  flex flex-col gap-6'>
      <InfoSection company={company} />
      <AboutSection content={COMPANY_ABOUT_CONTENT.content}></AboutSection>
      <PortfolioSection />
      <ProductSection />
      <ServiceSection />
    </div>
  );
};

export default OverviewTab;
