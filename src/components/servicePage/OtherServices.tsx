import { useEffect, useState } from 'react';
import * as serviceServices from '@/apiServices/serviceServices';
import RelatedItems from '@/components/subpage/RelatedItems';

const OtherServices = ({
  mainItemId,
  companyName,
  companyParams,
}: {
  mainItemId: string;
  companyName: string;
  companyParams?: string;
}) => {
  const [otherServices, setOtherServices] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  // fetch other services
  useEffect(() => {
    setLoading(true);
    const getRelatedServices = async () => {
      const res = await serviceServices.getAll({
        params: { limit: 5, page: 1, companyName: companyName },
      });
      setOtherServices(res);
      setLoading(false);
    };
    getRelatedServices();
  }, [companyName]);

  return (
    <RelatedItems
      type='service'
      items={otherServices}
      title={`Dịch vụ khác của <a href=${companyParams} style='color:#2f61e6'>${companyName}<span>`}
      loading={loading}
      mainItemId={mainItemId}
    />
  );
};

export default OtherServices;
