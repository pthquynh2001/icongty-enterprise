import { useEffect, useState } from 'react';
import * as productsServices from '@/apiServices/productsServices';
import RelatedItems from '@/components/subpage/RelatedItems';

const RelatedProducts = ({ mainItemId }: { mainItemId: string }) => {
  const [relatedProducts, setRelatedProducts] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  // fetch related products
  useEffect(() => {
    setLoading(true);
    const getRelatedProducts = async () => {
      const res = await productsServices.getAll({
        params: { limit: 5, page: 1 },
      });
      setRelatedProducts(res);
      setLoading(false);
    };
    getRelatedProducts();
  }, []);

  return (
    <RelatedItems
      items={relatedProducts}
      title='Sản phẩm tương tự'
      loading={loading}
      mainItemId={mainItemId}
    />
  );
};

export default RelatedProducts;
