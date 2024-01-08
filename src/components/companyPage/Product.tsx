import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ProductProps {
  order: number;
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

const Product: React.FC<ProductProps> = ({ props, order }) => {
  return (
    <div className='flex relative'>
      <span className='absolute left-0 text-xs font-semibold leading-[22px]'>
        {order < 10 ? '0' + order + '.' : order + '.'}
      </span>
      <div className='ml-[60px] grow'>
        <Link href={'/products/' + props.slug + '-' + props.id}>
          <p className='font-semibold text-neutral-10 mb-4'>{props.name}</p>
        </Link>
        <p className='line-clamp-4 mb-1 text-xs'>{props.excerpt}</p>
        <Link
          href={'/products/' + props.slug + '-' + props.id}
          className='text-xs text-royalBlue font-semibold'
        >
          Tìm hiểu thêm
        </Link>
      </div>
      <div className='ml-6 w-[215px] h-[145px] border border-neutral-3 rounded overflow-hidden relative shrink-0'>
        <Link
          href={'/products/' + props.slug + '-' + props.id}
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

export default Product;
