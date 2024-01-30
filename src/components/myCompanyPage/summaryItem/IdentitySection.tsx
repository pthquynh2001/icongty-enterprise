import React from 'react';
import Image from 'next/image';
import { CloudUploadOutlined, DeleteOutlined } from '@ant-design/icons';
import { ContentFrame } from '@/components/subpage';
import { Tag } from '@/components/shared';
import { EyeFilled } from '@ant-design/icons';

const IdentitySection = () => {
  return (
    <ContentFrame title='Brand Identity'>
      <div className='rounded-xl bg-neutral-3 overflow-hidden'>
        <div className='h-[180px] w-full relative bg-royalBlue flexCenter'>
          <Image
            src='/images/blank-banner.png'
            fill
            alt='banner'
            sizes='(max-width: 640px) 100vw, 640px'
            className='object-cover'
          />
          <div className='flexCenter flex-col text-neutral-1 z-10'>
            <p className='text-xl'>Add a Banner Image</p>
            <p className='font-semibold mt-1 mb-4'>
              Optimal dimensions 1156x234px
            </p>
            <div className='w-full flex gap-2'>
              <button className='w-full rounded flexCenter gap-2 h-[34px] cursor-pointer hover:opacity-95'>
                <span className='flex gap-2 font-semibold text-royalBlue'>
                  <CloudUploadOutlined /> Upload
                </span>
              </button>
              <button className='w-full rounded flexCenter gap-2 h-[34px] bg-transparent border border-neutral-1 cursor-pointer hover:opacity-95'>
                <span className='flex gap-2 font-semibold text-neutral-1'>
                  <DeleteOutlined /> Remove
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className='h-[120px] relative px-12 py-[18px] flex'>
          <div className='relative flexCenter -translate-y-10 rounded-md overflow-hidden w-[115px] h-[115px] bg-royalBlue-60 shrink-0'>
            <Image
              src='/images/blank-banner.png'
              alt='logo'
              fill
              sizes='(max-width: 640px) 100vw, 640px'
              className='object-cover'
            />
            <div className='flexCenter flex-col text-neutral-1'>
              <p className='text-xl'>Avatar</p>
              <p className='font-semibold'>150x150px</p>
            </div>
          </div>
          <div className='mx-12 grow'>
            <p className='font-semibold text-lg text-neutral-11 mb-2'>
              The Corporate Name will be displayed here
            </p>
            <div className='flex'>
              <Tag type='line' className='h-[18px] text-xs'>
                Tag 1
              </Tag>
            </div>
          </div>
          <button className='text-sunsetOrange-6 text-xs leading-5 flexCenter gap-2 h-[22px]  bg-transparent rounded border border-dashed border-sunsetOrange-6 py-[1px] px-2 shrink-0'>
            <EyeFilled />
            <span>Preview</span>
          </button>
        </div>
      </div>
    </ContentFrame>
  );
};

export default IdentitySection;
