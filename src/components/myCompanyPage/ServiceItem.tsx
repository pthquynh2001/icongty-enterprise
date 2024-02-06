import { Company } from '@/types';
import React from 'react';
import ItemTitle from './ItemTitle';
import { CompanyCard } from '@/components/shared';
import * as companyServices from '@/apiServices/companyServices';
import { useState, useEffect } from 'react';
import ImageUpload from '../shared/ImageUpload';

const ServiceItem = ({ companyId }: { companyId: string }) => {
  const [company, setCompany] = useState<Company>({} as Company);

  return (
    <div>
      service item page
      <ImageUpload />
    </div>
  );
};

export default ServiceItem;
