import { Suspense, useState } from 'react';
import { ContentFrame } from '@/components/subpage';
import { Image as AntdImg, Skeleton } from 'antd';
import { ProgressPagination } from '@/components/shared';

interface GalleryProps {
  gallery: {
    name: string;
    location: string;
    alt: string;
    id: string;
  }[];
  loading: boolean;
}
const Gallery = ({ gallery, loading }: GalleryProps) => {
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const gallery = product?.gallery?.images || [];
  const currentImages = gallery.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <ContentFrame title='Hình ảnh'>
      {loading ? (
        <div className='grid grid-cols-4 gap-6 w-full '>
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className='relative w-full rounded-lg overflow-hidden'
            >
              <Skeleton active />
            </div>
          ))}
        </div>
      ) : (
        <>
          <AntdImg.PreviewGroup
            preview={{
              onChange: (current, prev) =>
                console.log(`current index: ${current}, prev index: ${prev}`),
              toolbarRender: () => <></>,
            }}
          >
            <div className='grid grid-cols-4 gap-6 w-full '>
              {currentImages.map((image: any, index: any) => (
                <div
                  key={index}
                  className='relative w-full rounded-lg overflow-hidden'
                >
                  <AntdImg
                    alt='photo'
                    width={154}
                    height={154}
                    src={image.location}
                    className='object-cover'
                  />
                </div>
              ))}
            </div>
          </AntdImg.PreviewGroup>
          {/* pagination */}
          {gallery.length / itemsPerPage > 1 && (
            <div className='mt-6'>
              <ProgressPagination
                pagination={{
                  page: currentPage,
                  limit: itemsPerPage,
                  totalItems: gallery.length,
                }}
                onPageChange={(currentPage) => setCurrentPage(currentPage)}
              />
            </div>
          )}
        </>
      )}
    </ContentFrame>
  );
};

export default Gallery;
