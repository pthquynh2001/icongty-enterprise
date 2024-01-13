import { useEffect, useState } from 'react';
import * as serviceServices from '@/apiServices/serviceServices';
import RelatedItems from '@/components/subpage/RelatedItems';

const RelatedServices = ({ mainItemId }: { mainItemId: string }) => {
  const [relatedServices, setRelatedServices] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  // fetch related services
  useEffect(() => {
    setLoading(true);
    const getRelatedServices = async () => {
      const res = await serviceServices.getAll({
        params: { limit: 5, page: 1 },
      });
      setRelatedServices(res);
      setLoading(false);
    };
    getRelatedServices();
  }, []);

  return (
    <RelatedItems
      type='service'
      items={relatedServices}
      title='Dịch vụ tương tự'
      loading={loading}
      mainItemId={mainItemId}
    />
  );
};

export default RelatedServices;
