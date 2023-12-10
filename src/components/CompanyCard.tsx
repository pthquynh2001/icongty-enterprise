import React from 'react';
import Image from 'next/image';
import { Divider } from 'antd';
import Categories from '@/components/Categories';

const CompanyCard = ({ card }: any) => {
  return (
    card && (
      <div className='relative w-full p-6 bg-white rounded-lg hover:shadow-lg transition-all	'>
        <div className='w-full h-[92px] relative'>
          <Image
            src={
              card.coverPhoto?.location ||
              'https://s3.cloud.cmctelecom.vn/icongty-upload/b3-208-f.webp'
            }
            alt={card.coverPhoto?.name || 'company-banner'}
            fill
            sizes="width:'100%'"
            className='rounded object-cover'
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
          <p className='absolute right-5 bottom-2 text-xs text-white'>
            MST: {card.taxCode}
          </p>
        </div>
        <div className='min-h-[78px]'>
          <h5 className='text-base text-neutral-800 line-clamp-2 mt-6 mb-2'>
            {card.name}
          </h5>
          <Categories data={card.categories} />
        </div>
        <Divider className='mt-4 mb-2' />
        <div className='text-xs'>
          <div className='grid grid-cols-8'>
            <p className='col-span-3'>
              <div className='flexStart gap-2'>
                <Image
                  src={'/images/location.svg'}
                  width={12}
                  height={12}
                  alt='Location-icon'
                />
                <span className='font-semibold inline-block '>Địa điểm</span>
              </div>
            </p>
            <span className='col-span-5'>{card.address}</span>
          </div>
          <div className='grid grid-cols-8 mt-2 mb-2'>
            <p className='col-span-3'>
              <div className='flexStart gap-2'>
                <Image
                  src={'/images/company.svg'}
                  width={12}
                  height={12}
                  alt='company-icon'
                />
                <span className='font-semibold  inline-block'>Quy mô</span>
              </div>
            </p>
            <span className='col-span-5'>
              {card.companySize ? `Trên ${card.companySize} nhân sự` : ''}
            </span>
          </div>
          <div className='grid grid-cols-8'>
            <p className='col-span-3'>
              <div className='flexStart gap-2'>
                <Image
                  src={'/images/members.svg'}
                  width={12}
                  height={12}
                  alt='members-icon'
                />
                <span className='font-semibold'>Năm thành lập</span>
              </div>
            </p>
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
