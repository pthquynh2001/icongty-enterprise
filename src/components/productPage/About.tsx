import React from 'react';
import { ContentFrame } from '@/components/subpage';
import { Tag } from '@/components/shared';
import { Badge, Skeleton } from 'antd';

const About = ({ product, loading }: { product: any; loading: boolean }) => {
  return (
    <ContentFrame loading={loading} title={`Giới thiệu về ${product.name}`}>
      {loading ? (
        <Skeleton active />
      ) : (
        <div className='flex flex-col gap-8'>
          <p>
            Với thế mạnh về data, {product.name} sẽ gợi ý các sản phẩm mà khách
            hàng có thể hứng thú dựa vào những sản phẩm mà khách hàng đã mua
            hoặc đã xem. Việc đề xuất sản phẩm giúp cho khách hàng dễ dàng tìm
            được sản phẩm mà họ muốn mua.
          </p>
          <div>
            <h5 className='mb-3'>
              <Badge color='blue' size='small' /> Công nghệ:
            </h5>
            <div className='flex flex-wrap'>
              {[...Array(5)].map((_, index) => (
                <Tag key={index} type='block' grey>
                  Tag {index}
                </Tag>
              ))}
            </div>
          </div>
        </div>
      )}
    </ContentFrame>
  );
};

export default About;
