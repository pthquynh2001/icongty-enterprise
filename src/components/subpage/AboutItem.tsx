import React from 'react';
import { ContentFrame } from '@/components/subpage';
import { Skeleton } from 'antd';

interface AboutItemProps {
  type: 'product' | 'service';
  item: any;
  loading: boolean;
  children?: React.ReactNode;
}

const AboutItem = ({ type, item, loading, children }: AboutItemProps) => {
  return (
    <ContentFrame loading={loading} title={`Giới thiệu về ${item.name}`}>
      {loading ? <Skeleton active /> : <>{children}</>}
    </ContentFrame>
  );
};

export default AboutItem;
