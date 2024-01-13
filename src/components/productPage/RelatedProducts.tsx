import { useEffect, useState } from 'react';
import * as productServices from '@/apiServices/productServices';
import RelatedItems from '@/components/subpage/RelatedItems';

const RelatedProducts = ({ mainItemId }: { mainItemId: string }) => {
  const [relatedProducts, setRelatedProducts] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  // fetch related products
  useEffect(() => {
    setLoading(true);
    const getRelatedProducts = async () => {
      const res = await productServices.getAll({
        params: { limit: 5, page: 1 },
      });
      setRelatedProducts(res);
      setLoading(false);
    };
    getRelatedProducts();
  }, []);

  return (
    <RelatedItems
      type='product'
      items={relatedProducts}
      title='Sản phẩm tương tự'
      loading={loading}
      mainItemId={mainItemId}
    />
  );
};

export default RelatedProducts;
