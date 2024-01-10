import { useState, useEffect } from 'react';
import Link from 'next/link';
import Product from '@/components/companyPage/Product';
import Pagination from '@/components/Pagination';
import * as productsServices from '@/apiServices/productsServices';

const ProductsTab = ({ companyId }: any) => {
  const [data, setData] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pagination = { page: currentPage, limit: 10, totalItems: 11 };
  useEffect(() => {
    const fetchData = async () => {
      const res = await productsServices.getAll({
        params: { page: currentPage, limit: pagination.limit },
      });
      setData(res);
    };
    fetchData();
  }, [currentPage, pagination.limit]);
  return (
    <div className='flex flex-col gap-10'>
      {data.map((product: any, index: number) => (
        <div className='py-8 px-[62px] rounded-2xl bg-neutral-1' key={index}>
          <Product props={product} companyId={companyId} />
        </div>
      ))}
      {pagination.totalItems / pagination.limit > 1 && (
        <div className='flexEnd mt-2'>
          <Pagination
            pagination={pagination}
            onPageChange={(currentPage) => {
              setCurrentPage(currentPage);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ProductsTab;
