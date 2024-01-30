import React from 'react';
import Image from 'next/image';
import { Button } from 'antd';
import { CloudUploadOutlined, DeleteOutlined } from '@ant-design/icons';
import { ContentFrame } from '@/components/subpage';
import { Company } from '@/types';
import { Tag } from '@/components/shared';
import { EyeFilled } from '@ant-design/icons';
import IdentitySection from './IdentitySection';
import BasicInfoSection from './BasicInfoSection';

const SummaryItem = ({ company }: { company: Company }) => {
  return (
    <div className='flex flex-col gap-6'>
      <IdentitySection />
      <BasicInfoSection />
    </div>
  );
};

export default SummaryItem;
