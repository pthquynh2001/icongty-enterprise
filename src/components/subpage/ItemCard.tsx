import Link from 'next/link';
import Image from 'next/image';
import { Tag } from '@/components/shared';

const ItemCard = ({
  item,
  type,
}: {
  item: any;
  type: 'product' | 'service';
}) => {
  const itemParams = `/${type === 'product' ? 'products' : 'services'}/${
    item.slug
  }-${item.id}`;
  return (
    <div className='pt-4 pb-6 flex gap-4 border-b border-neutral-4'>
      <div className='w-16 h-16  rounded overflow-hidden shadow-banner shrink-0'>
        <Link href={itemParams} className='block relative w-full h-full'>
          <Image
            src={item.logo?.location}
            alt='product logo'
            fill
            sizes='(max-width 768px) 100vw, 33vw'
            className='object-cover'
          />
        </Link>
      </div>
      <div className='w-full'>
        <Link href={itemParams}>
          <p className='text-neutral-10 font-semibold mb-2'>{item.name}</p>
        </Link>
        <div className='flex'>
          <Tag type='line'>tag</Tag>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
