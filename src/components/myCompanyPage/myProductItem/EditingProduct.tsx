'use client';
import { useState, useEffect } from 'react';
import { ContentFrame } from '@/components/subpage';
import Thumbnail from '../Thumbnail';
import * as productServices from '@/apiServices/productServices';
import ProductBasicInfo from './ProductBasicInfo';

const EditingProduct = ({ productId }: { productId: string }) => {
  const [product, setProduct] = useState<any>({});
  // fetch API product
  useEffect(() => {
    const getProduct = async () => {
      const res = await productServices.getAll({
        params: { page: 1, limit: 1, id: productId },
      });
      setProduct(res[0]);
    };
    getProduct();
  }, [productId]);
  return (
    <div className='flex flex-col gap-6'>
      <Thumbnail title='Thumbnail' item={product} />
      <ProductBasicInfo />
    </div>
  );
};

export default EditingProduct;
