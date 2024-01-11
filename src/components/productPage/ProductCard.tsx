import Link from 'next/link';
import Image from 'next/image';
import { Tag } from '@/components/shared';

const ProductCard = ({ product }: any) => {
  return (
    <div className='pt-4 pb-6 flex gap-4 border-b border-neutral-4'>
      <div className='w-16 h-16  rounded overflow-hidden shadow-banner shrink-0'>
        <Link
          href={`/products/${product.slug + '-' + product.id}`}
          className='block relative w-full h-full'
        >
          <Image
            src={product.logo?.location}
            alt='product logo'
            fill
            sizes='(max-width 768px) 100vw, 33vw'
            className='object-cover'
          />
        </Link>
      </div>
      <div className='w-full'>
        <Link href={`/products/${product.slug + '-' + product.id}`}>
          <p className='text-neutral-10 font-semibold mb-2'>{product.name}</p>
        </Link>
        <div className='flex'>
          <Tag type='line'>tag</Tag>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
