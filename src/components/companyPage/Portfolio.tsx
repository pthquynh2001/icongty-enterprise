import React from 'react';
import { Button } from 'antd';
import PdfViewer from '@/components/companyPage/PdfViewer';
import Tag from '@/components/Tag/Tag';
interface PortfolioProps {
  size?: 'small';
  props: {
    downloadUrl: string;
    thumbnailUrl: string | null;
    name: string;
    excerpt: string;
    categories: { name: string }[];
    fileType: 'pdf' | 'docx';
  };
}

const Portfolio: React.FC<PortfolioProps> = ({ props, size }) => {
  return (
    <div className='flex '>
      <div className='min-h-[131px] min-w-[95px] shrink-0'>
        {props.fileType === 'pdf' && (
          <div className='relative before:content-[""] before:absolute before:inset-[1px]  before:w-[6px] before:z-[1] before:bg-gradient-to-r before:from-black/10 before:from-20% before:via-black/30 before:to-black/10 before:to-80% before:rounded-l'>
            <PdfViewer
              downloadUrl={props.downloadUrl}
              thumbnailUrl={props.thumbnailUrl}
            />
            <div className='absolute top-2 -left-[7px] px-2 h-5 bg-red-500 text-xs font-semibold flexCenter text-neutral-1 rounded-t rounded-br after:content-[""] after:absolute after:left-0 after:top-[100%] after:border-t-[6px] after:border-l-[0.5rem] after:border-t-rose-800 z-[2] '>
              PDF
            </div>
          </div>
        )}
      </div>

      <div className='ml-6'>
        {size === 'small' ? (
          <p className='font-semibold text-neutral-10 mb-4'>{props.name}</p>
        ) : (
          <h5 className='text-neutral-10 mb-4'>{props.name}</h5>
        )}

        <p className={`mb-2 line-clamp-2 ${size === 'small' && 'text-xs'}`}>
          {props.excerpt}
        </p>
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
