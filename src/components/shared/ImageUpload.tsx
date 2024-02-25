'use client';
import { useEffect, useState } from 'react';
import { UploadButton } from '@/utils/uploadthing';
import {
  Button,
  ConfigProvider,
  Select,
  Tag as ATag,
  Image as AntdImg,
  Radio,
} from 'antd';

const ImageUpload = () => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [imageList, setImageList] = useState<string[]>([]);
  console.log(imageList);
  useEffect(() => {
    if (imageUrl) {
      setImageList((prev) => [...prev, imageUrl]);
    }
  }, [imageUrl]);
  return (
    <div className='py-8 rounded border border-neutral-6'>
      <div className='border-b border-neutral-6 px-8'>
        <AntdImg.PreviewGroup
          preview={{
            onChange: (current, prev) =>
              console.log(`current index: ${current}, prev index: ${prev}`),
            toolbarRender: () => <></>,
          }}
        >
          <div className='grid grid-cols-4 gap-5  h-[260px] overflow-y-scroll pr-2 -mr-4'>
            {imageList &&
              imageList.map((img, index) => (
                <div
                  className='relative w-full h-32 bg-neutral-2 overflow-hidden'
                  key={index}
                >
                  <AntdImg
                    src={img}
                    alt='placeholder'
                    width={'100%'}
                    height={'100%'}
                    className='object-cover'
                  />
                </div>
              ))}
          </div>
        </AntdImg.PreviewGroup>
      </div>
      <div className=' px-8 pt-8 grid grid-cols-4 gap-5'>
        <Button className='col-start-4' type='primary' size='large'>
          <span className='font-semibold'>Add to Gallery</span>
        </Button>
        <UploadButton
          className='col-start-4 ut-button:rounded ut-button:hover:opacity-80 ut-button:w-full   ut-button:text-base  ut-button:font-semibold ut-button:bg-royalBlue ut-button:ut-uploading:bg-royalBlue/60 ut-button:ut-uploading:text-neutral-1'
          content={{
            button({ ready, isUploading }) {
              if (ready) return <div>Add to Gallery</div>;
              if (isUploading) return <div>Uploading...</div>;
            },
          }}
          endpoint={'imagesUploader'}
          onClientUploadComplete={(res) => {
            console.log('file', res);
            setImageUrl(res[0].url);
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
        />
      </div>
    </div>
  );
};

export default ImageUpload;
