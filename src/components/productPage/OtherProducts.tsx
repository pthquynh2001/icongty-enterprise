import { useEffect, useState } from 'react';
import * as productsServices from '@/apiServices/productsServices';
import RelatedItems from '@/components/subpage/RelatedItems';

const RelatedProducts = ({
  mainItemId,
  companyName,
}: {
  mainItemId: string;
  companyName: string;
}) => {
  const [relatedProducts, setRelatedProducts] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  // fetch related products
  useEffect(() => {
    setLoading(true);
    const getRelatedProducts = async () => {
      const res = await productsServices.getAll({
        params: { limit: 5, page: 1, companyName: companyName },
      });
      setRelatedProducts(res);
      setLoading(false);
    };
    getRelatedProducts();
  }, [companyName]);

  return (
    <RelatedItems
      items={relatedProducts}
      title={`Sản phẩm khác của <span style='color:#2f61e6'>${companyName}<span>`}
      loading={loading}
      mainItemId={mainItemId}
    />
  );
};

export default RelatedProducts;
