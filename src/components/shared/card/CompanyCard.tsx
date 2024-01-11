import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Divider } from 'antd';
import CategoryTags from '@/components/shared/tag/CategoryTags';

const CompanyCard = ({ card }: any) => {
  return (
    card && (
      <div className='relative w-full p-6 bg-white rounded-lg shadow-card hover:shadow-cardHover transition-all	'>
        <div className='w-full h-[92px] relative'>
          <Link
            href={`/companies/${card.slug}-${card._id}`}
            className='block w-full h-full absolute'
          >
            <Image
              src={
                card.coverPhoto?.location ||
                'https://s3.cloud.cmctelecom.vn/icongty-upload/b3-208-f.webp'
              }
              alt={card.coverPhoto?.name || 'company-banner'}
              fill
              sizes="width:'100%'"
              className='rounded object-cover'
              priority
            />
            <Image
              src={
                card.logo?.location ||
                'https://s3.cloud.cmctelecom.vn/icongty-upload/b3-208-f.webp'
              }
              alt={card.logo?.name || 'company-logo'}
              width={76}
              height={76}
              className='rounded-[2px] object-cover z-10 absolute top-2 left-2'
            />
          </Link>
          <p className='absolute right-5 bottom-2 text-xs text-white'>
            MST: {card.taxCode}
          </p>
        </div>
        <div className='min-h-[78px]'>
          <Link href={`/companies/${card.slug}-${card._id}`}>
            <h5 className='text-base text-neutral-10 line-clamp-2 mt-6 mb-2 hover:text-royalBlue'>
              {card.name}
            </h5>
          </Link>
          <CategoryTags data={card.categories} />
        </div>
        <Divider className='mt-4 mb-2' />
        <div className='text-xs'>
          <div className='grid grid-cols-8'>
            <div className='col-span-3'>
              <div className='flexStart gap-2'>
                <Image
                  src={'/icons/location.svg'}
                  width={12}
                  height={12}
                  alt='Location-icon'
                />
                <span className='font-semibold inline-block '>Địa điểm</span>
              </div>
            </div>
            <span className='col-span-5'>{card.address}</span>
          </div>
          <div className='grid grid-cols-8 mt-2 mb-2'>
            <div className='col-span-3'>
              <div className='flexStart gap-2'>
                <Image
                  src={'/icons/company.svg'}
                  width={12}
                  height={12}
                  alt='company-icon'
                />
                <span className='font-semibold  inline-block'>Quy mô</span>
              </div>
            </div>
            <span className='col-span-5'>
              {card.companySize ? `Trên ${card.companySize} nhân sự` : ''}
            </span>
          </div>
          <div className='grid grid-cols-8'>
            <div className='col-span-3'>
              <div className='flexStart gap-2'>
                <Image
                  src={'/icons/members.svg'}
                  width={12}
                  height={12}
                  alt='members-icon'
                />
                <span className='font-semibold'>Năm thành lập</span>
              </div>
            </div>
            <span className='col-span-5'>
              {card.foundationDate?.split('-')[0]}
            </span>
          </div>
        </div>
      </div>
    )
  );
};

export default CompanyCard;
