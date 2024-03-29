import { useEffect, useState } from 'react';
import * as productServices from '@/apiServices/productServices';
import RelatedItems from '@/components/subpage/RelatedItems';

const OtherProducts = ({
  mainItemId,
  companyName,
  companyParams,
}: {
  mainItemId: string;
  companyName: string;
  companyParams?: string;
}) => {
  const [otherProducts, setOtherProducts] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  // fetch other products
  useEffect(() => {
    setLoading(true);
    const getRelatedProducts = async () => {
      const res = await productServices.getAll({
        params: { limit: 5, page: 1, companyName: companyName },
      });
      setOtherProducts(res);
      setLoading(false);
    };
    getRelatedProducts();
  }, [companyName]);

  return (
    <RelatedItems
      type='product'
      items={otherProducts}
      title={`Sản phẩm khác của <a href=${companyParams} style='color:#2f61e6'>${companyName}<span>`}
      loading={loading}
      mainItemId={mainItemId}
    />
  );
};

export default OtherProducts;
