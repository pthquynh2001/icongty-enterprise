import React from 'react';
import { ProductCard } from '@/components/productPage';
import { Skeleton } from 'antd';

const RelatedItems = ({
  items,
  title,
  loading,
  mainItemId,
}: {
  items: any;
  title: string;
  loading: boolean;
  mainItemId: string;
}) => {
  return (
    <div className='bg-neutral-1 w-full px-8 py-12 rounded-2xl'>
      {loading ? (
        <Skeleton
          active
          title={false}
          paragraph={{ rows: 1 }}
          className='pb-2 border-b border-neutral-5'
        />
      ) : (
        <h5
          className='pb-2 border-b border-neutral-5 *:text-royalBlue'
          dangerouslySetInnerHTML={{ __html: title }}
        ></h5>
      )}
      <div className='flex flex-col'>
        {loading
          ? [...Array(5)].map((_, index) => (
              <div key={index} className='flexBetween gap-4 h-[105px]'>
                <Skeleton.Avatar shape='square' size='large' active />
                <Skeleton
                  active
                  paragraph={{ rows: 1 }}
                  className='pt-4 pb-6 flex gap-4 border-b border-neutral-4'
                />
              </div>
            ))
          : items &&
            items.map(
              (item: any, index: number) =>
                item.id !== mainItemId && (
                  <ProductCard key={index} product={item} />
                )
            )}
      </div>
    </div>
  );
};

export default RelatedItems;
