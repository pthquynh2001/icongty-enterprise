import { useState, useEffect } from 'react';
import { Pagination } from '@/components/shared';
import { Item } from '@/components/subpage';
import * as productsServices from '@/apiServices/productServices';
import { Skeleton } from 'antd';

const ProductTab = ({ companyId }: { companyId: string }) => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = data?.slice(indexOfFirstItem, indexOfLastItem);
  const pagination = {
    page: currentPage,
    limit: itemsPerPage,
    totalItems: data.length,
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await productsServices.getAll({
        params: { companyId: companyId },
      });
      setData(res);
      setLoading(false);
    };
    fetchData();
  }, [companyId]);

  return loading ? (
    <div className='flex flex-col gap-10'>
      {[...Array(5)].map((_, index) => (
        <div
          className='flex gap-10 py-8 px-[62px] rounded-2xl bg-neutral-1 h-[218px]'
          key={index}
        >
          <Skeleton active paragraph={{ rows: 3 }} />
          <Skeleton.Image />
        </div>
      ))}
    </div>
  ) : (
    currentProducts && (
      <div className='flex flex-col gap-10'>
        {currentProducts.map((product: any, index: number) => (
          <div className='py-8 px-[62px] rounded-2xl bg-neutral-1' key={index}>
            <Item props={product} type='product' />
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
    )
  );
};

export default ProductTab;
