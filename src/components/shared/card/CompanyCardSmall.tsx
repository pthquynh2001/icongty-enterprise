import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Divider, Skeleton } from 'antd';
import CategoryTags from '@/components/shared/tag/CategoryTags';

const CompanyCardSmall = ({
  card,
  skeleton,
}: {
  card?: any;
  skeleton?: boolean;
}) => {
  return skeleton ? (
    <div className='flex relative w-full h-[162px] p-6 bg-white rounded-lg shadow-card hover:shadow-cardHover transition-all	'>
      <div className='mr-[18px]'>
        <Skeleton.Avatar
          size={64}
          active
          shape='square'
          className='shadow-card'
        />
      </div>
      <div className='relative w-full'>
        <Skeleton
          active
          title={false}
          paragraph={{ rows: 2, width: ['100%', '50%'] }}
          className='mb-4'
        />

        <div className='absolute bottom-0 left-0 flex gap-3 w-full'>
          {[...Array(3)].map((_, index) => (
            <Skeleton
              key={index}
              title={false}
              paragraph={{ rows: 1, width: '100%' }}
            />
          ))}
        </div>
      </div>
    </div>
  ) : (
    card && (
      <div className='flex relative w-full h-[162px] p-6 bg-white rounded-lg shadow-card hover:shadow-cardHover transition-all	'>
        <div className='mr-[18px]'>
          <Link href={`/companies/${card.slug}-${card.id}`}>
            <Image
              src={
                card.logo?.location ||
                'https://s3.cloud.cmctelecom.vn/icongty-upload/b3-208-f.webp'
              }
              alt={card.logo?.name || 'company-logo'}
              width={64}
              height={64}
              className='rounded object-cover shadow-card'
            />
          </Link>
        </div>
        <div className='relative w-full'>
          <Link href={`/companies/${card.slug}-${card.id}`}>
            <h5 className='text-base text-neutral-10 line-clamp-2 mb-2 hover:text-royalBlue'>
              {card.name}
            </h5>
          </Link>
          <div className='mt-2 mb-4 flexStart'>
            <p className='text-xs mr-1'>Mã số thuế: {card.taxCode}</p>
            <Image
              src='/icons/copy.svg'
              width={12}
              height={12}
              alt='copy-icon'
              className='cursor-pointer'
            />
          </div>
          <div className='absolute bottom-0 left-0'>
            <CategoryTags data={card.categories} />
          </div>
        </div>
      </div>
    )
  );
};

export default CompanyCardSmall;
