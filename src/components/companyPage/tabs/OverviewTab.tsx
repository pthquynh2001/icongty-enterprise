import React from 'react';
import { COMPANY_ABOUT_CONTENT } from '@/constants';
import InfoSection from '@/components/companyPage/InfoSection';
import AboutSection from '@/components/companyPage/AboutSection';
import PortfolioSection from '@/components/companyPage/PortfolioSection';
import ProductsSection from '@/components/companyPage/ProductsSection';
import ServicesSection from '@/components/companyPage/ServicesSection';

const OverviewTab = ({ company }: any) => {
  return (
    <div className='w-full  flex flex-col gap-6'>
      <InfoSection company={company} />
      <AboutSection content={COMPANY_ABOUT_CONTENT.content}></AboutSection>
      <PortfolioSection />
      <ProductsSection />
      <ServicesSection />
    </div>
  );
};

export default OverviewTab;
