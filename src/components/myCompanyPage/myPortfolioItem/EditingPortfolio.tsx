'use client';
import { useState, useEffect } from 'react';
import { ContentFrame } from '@/components/subpage';
import Thumbnail from '../Thumbnail';
import * as portfolioServices from '@/apiServices/portfolioServices';
import PortfolioBasicInfo from './PortfolioBasicInfo';

const EditingPortfolio = ({ portfolioId }: { portfolioId: string }) => {
  const [portfolio, setPortfolio] = useState<any>({});
  // fetch API portfolio
  useEffect(() => {
    if (portfolioId == 'new') {
      return;
    } else {
      const getPortfolio = async () => {
        const res = await portfolioServices.getAll({
          params: { page: 1, limit: 1, id: portfolioId },
        });
        setPortfolio(res[0]);
      };
      getPortfolio();
    }
  }, [portfolioId]);
  return (
    <div className='flex flex-col gap-6'>
      <PortfolioBasicInfo portfolioId={portfolioId} />
    </div>
  );
};

export default EditingPortfolio;
