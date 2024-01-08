import React from 'react';
import Image from 'next/image';
import Frame from '@/components/companyPage/Frame';

const InfoSection = ({ company }: any) => {
  const date = new Date(company.foundationDate);
  const handleCopyText = () => {
    const textarea = document.createElement('textarea');
    textarea.value = company.taxCode;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    console.log('Đã copy nội dung thành công!');
  };

  return (
    <Frame title='Giới thiệu'>
      <div className='grid grid-cols-2 gap-6'>
        <div className='flex flex-col gap-8 justify-between'>
          <div className='flex flex-col gap-2'>
            <p className='text-xs text-neutral-7'>Tên đầy đủ:</p>
            <p className='font-semibold text-neutral-9'>{company.name}</p>
          </div>
          <div className='flex flex-col gap-2'>
            <p className='text-xs text-neutral-7'>Mã số thuế:</p>

            <div className='flexStart gap-1'>
              <p className='font-semibold text-neutral-9'>{company.taxCode}</p>
              <Image
                onClick={handleCopyText}
                src='/icons/copy.svg'
                width={12}
                height={12}
                alt='copy icon'
                title='copy'
                className='cursor-pointer'
              />
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <p className='text-xs text-neutral-7'>Ngày thành lập:</p>
            <p className='font-semibold text-neutral-9'>
              {date.getUTCDate() < 10
                ? '0' + date.getUTCDate()
                : date.getUTCDate()}
              /
              {date.getUTCMonth() + 1 < 10
                ? '0' + (date.getUTCMonth() + 1)
                : date.getUTCMonth() + 1}
              /{date.getUTCFullYear()}
            </p>
          </div>
        </div>
        <div className='flex flex-col gap-8 justify-between'>
          <div className='flex flex-col gap-2'>
            <p className='text-xs text-neutral-7'>Tên quốc tế:</p>
            <p className='font-semibold text-neutral-9'>
              {company.internationalName}
            </p>
          </div>
          <div className='flex flex-col gap-2'>
            <p className='text-xs text-neutral-7'>Địa chỉ:</p>
            <p className='font-semibold text-neutral-9'>{company.address}</p>
          </div>
          {company.companySize && (
            <div className='flex flex-col gap-2'>
              <p className='text-xs text-neutral-7'>Quy mô nhân sự:</p>
              <p className='font-semibold text-neutral-9'>
                {Intl.NumberFormat('vi-VN').format(company.companySize)}+ nhân
                viên
              </p>
            </div>
          )}
        </div>
      </div>
    </Frame>
  );
};

export default InfoSection;
