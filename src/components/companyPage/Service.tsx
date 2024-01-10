import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ServiceProps {
  companyId?: string;
  size?: 'small';
  order?: number;
  props: {
    id: number;
    name: string;
    slug: string;
    excerpt: string;
    logo: {
      location: string;
    };
    coverPhoto: {
      location: string;
    };
    categories: {
      id: string;
      name: string;
    }[];
    technologies: {
      id: string;
      name: string;
    }[];
    library?: {
      images: {
        location: string;
      }[];
      videos: {
        location: string;
      }[];
    };
  };
}

const Service: React.FC<ServiceProps> = ({ props, order, size, companyId }) => {
  return (
    <div className='flex relative'>
      {order && (
        <span className='absolute left-0 text-xs font-semibold leading-[22px]'>
          {order < 10 ? '0' + order + '.' : order + '.'}
        </span>
      )}

      <div className='ml-[60px] first:ml-0 grow'>
        <Link
          href={'/services/' + props.slug + '-' + props.id + '-' + companyId}
        >
          {size === 'small' ? (
            <p className='font-semibold text-neutral-10 mb-4'>{props.name}</p>
          ) : (
            <h5 className='text-neutral-10 mb-4'>{props.name}</h5>
          )}
        </Link>
        <p className={`line-clamp-4 mb-1 ${size === 'small' && 'text-xs'}`}>
          {props.excerpt}
        </p>
        <Link
          href={'/services/' + props.slug + '-' + props.id + '-' + companyId}
          className={` text-royalBlue font-semibold ${
            size === 'small' && 'text-xs'
          }`}
        >
          Tìm hiểu thêm
        </Link>
      </div>
      <div className='ml-6 w-[215px] h-[145px] border border-neutral-3 rounded overflow-hidden relative shrink-0'>
        <Link
          href={'/services/' + props.slug + '-' + props.id + '-' + companyId}
          className='relative block w-full h-full'
        >
          <Image
            src={props.coverPhoto.location}
            alt='placeholder'
            layout='fill'
            objectFit='cover'
            sizes='(max-width: 640px) 100vw'
          />
        </Link>
      </div>
    </div>
  );
};

export default Service;
