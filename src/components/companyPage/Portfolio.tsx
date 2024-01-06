import React from 'react';
import { Button } from 'antd';
import PdfViewer from '@/components/companyPage/PdfViewer';
import Tag from '@/components/Tag/Tag';
interface PortfolioProps {
  props: {
    downloadUrl: string;
    thumbnailUrl: string | null;
    name: string;
    excerpt: string;
    categories: { name: string }[];
  };
}

const Portfolio: React.FC<PortfolioProps> = ({ props }) => {
  return (
    <div className='flex '>
      <PdfViewer
        className='min-h-[131px] min-w-[95px] shrink-0'
        downloadUrl={props.downloadUrl}
        thumbnailUrl={props.thumbnailUrl}
      />
      <div className='ml-6'>
        <p className='font-semibold text-neutral-10 mb-4'>{props.name}</p>
        <p className='text-xs mb-2 line-clamp-2'>{props.excerpt}</p>
        <div className='flex max-h-[22px] flex-wrap overflow-hidden'>
          {props.categories.map((category, index) => (
            <Tag key={index} type='block' className='text-xs h-[22px]'>
              {category.name}
            </Tag>
          ))}
        </div>
      </div>
      <div className='flex flex-col gap-2 ml-[85px]'>
        <Button type='primary' ghost>
          <a
            href={props.downloadUrl}
            download={props.name}
            className='font-semibold'
          >
            Tải xuống
          </a>
        </Button>
        <Button type='link' ghost>
          <p className='font-semibold text-royalBlue '>Chia sẻ</p>
        </Button>
      </div>
    </div>
  );
};

export default Portfolio;
