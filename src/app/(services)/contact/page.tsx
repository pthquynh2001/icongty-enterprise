'use client';

import React from 'react';
import Image from 'next/image';
import { Button, ConfigProvider } from 'antd';
import { SubpageBreadcrumb } from '@/components/subpage';
import { CONTACT_INFO } from '@/constants';

const items = [
  {
    title: 'Trang chủ',
    href: '/',
  },
  { title: 'Liên hệ' },
];

const contactInfo = CONTACT_INFO;
const ContactPage = () => {
  const handleSubmit = () => {
    console.log('submit');
  };
  return (
    <>
      <div className='bg-[#EAEFFD] pb-12 overflow-hidden relative'>
        <div className='absolute w-full h-full inset-0'>
          <Image
            src='/images/circle.svg'
            priority
            alt='circle'
            width={270}
            height={270}
            className='opacity-30 absolute bottom-0 -translate-x-[100px] translate-y-[100px] lg:right-0 lg:-translate-x-[200px] lg:translate-y-1/2'
          />
          <Image
            src='/images/circle.svg'
            alt='circle'
            priority
            width={516}
            height={516}
            className='opacity-50 absolute right-0 top-0  translate-x-[280px] -translate-y-[200px] lg:translate-x-[100px] lg:-translate-y-1/2'
          />
        </div>

        <SubpageBreadcrumb items={items} />
        <div className='max-container padding-container'>
          <div className='mb-10'>
            <div className='lg:hidden flexCenter flex-col '>
              <h3>Chúng tôi có thể</h3>
              <h3>trợ giúp bạn nhanh chóng</h3>
            </div>
            <div className='hidden lg:flex align-top flex-col'>
              <h2>Chúng tôi có thể</h2>
              <h2>trợ giúp bạn nhanh chóng</h2>
            </div>
          </div>
          <div className='w-full px-20 md:px-0'>
            <div className='w-full lg:max-w-[810px] flex justify-center items-center flex-col relative md:mx-0 md:flex-row md:items-start lg:justify-start pb-8 md:pb-0'>
              <div className='w-8 h-full absolute left-0 top-0 flex justify-center items-center md:hidden '>
                <div className='w-[2px] h-full  bg-gradient-to-b from-neutral-1 from-75% to-neutral-1/[0.1]'></div>
              </div>
              <div className='w-full h-8 absolute left-0 justify-center items-center hidden md:flex '>
                <div className='h-[2px] w-full  bg-gradient-to-r from-neutral-1 from-75% to-neutral-1/[0.1]'></div>
              </div>
              <div className='grid grid-rows-3 w-full  md:grid-cols-3 md:grid-rows-1  gap-10 md:gap-6 '>
                {contactInfo.map((item, index) => (
                  <div
                    className='relative flex md:flex-col md:items-center lg:items-start'
                    key={index}
                  >
                    <div className='w-8 h-8 bg-neutral-1 rounded shadow-card shrink-0 flexCenter'>
                      <Image
                        src={item.icon}
                        alt='icon'
                        width={16}
                        height={16}
                      />
                    </div>
                    <div className='ml-4 text-left md:mt-6 md:ml-0 md:text-center md:max-w-[222px] lg:text-left'>
                      <h5 className='mb-2 lg:hidden'>{item.name}</h5>
                      <h3 className='mb-2 hidden lg:block'>{item.name}</h3>
                      <div className='flex flex-col lg:flex-row gap-2'>
                        <span>{item.value}</span>
                        {item.id === 'phone' && (
                          <span>
                            <a
                              className='text-royalBlue font-semibold'
                              href={`tel:${item.value}`}
                            >
                              Gọi điện
                            </a>
                          </span>
                        )}
                        {item.id === 'email' && (
                          <span>
                            <a
                              className='text-royalBlue font-semibold'
                              href={`mailto:${item.value}`}
                            >
                              Gửi email
                            </a>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='max-container padding-container pt-20 pb-[120px]'>
        <div className='flexBetween flex-wrap gap-20'>
          <div className='w-full lg:max-w-[40%]'>
            <h3 className='lg:hidden mb-12'>Kết nối với chúng tôi</h3>
            <h2 className='hidden lg:block mb-12'>Kết nối với chúng tôi</h2>
            <form>
              <div className='grid grid-cols-2 grid-rows-2 gap-6 mb-8'>
                <label className='w-full block' htmlFor='full-name'>
                  <p className='text-neutral-10 text-base font-semibold mb-2'>
                    Họ tên
                  </p>
                  <input
                    type='text'
                    id='full-name'
                    placeholder='Điền họ và tên'
                    className='w-full outline-none h-10 px-3 rounded border border-neutral-6 text-base placeholder:text-neutral-6 focus:border-royalBlue'
                  />
                </label>
                <label className='w-full block' htmlFor='phone'>
                  <p className='text-neutral-10 text-base font-semibold mb-2'>
                    Số điện thoại
                  </p>
                  <input
                    type='text'
                    id='phone'
                    placeholder='Điền số điện thoại'
                    className='w-full outline-none h-10 px-3 rounded border border-neutral-6 text-base placeholder:text-neutral-6 focus:border-royalBlue'
                  />
                </label>
                <label className='w-full block' htmlFor='email'>
                  <p className='text-neutral-10 text-base font-semibold mb-2'>
                    Email
                  </p>
                  <input
                    type='text'
                    id='email'
                    placeholder='Điền email'
                    className='w-full outline-none h-10 px-3 rounded border border-neutral-6 text-base placeholder:text-neutral-6 focus:border-royalBlue'
                  />
                </label>
                <label className='w-full block' htmlFor='enterprise'>
                  <p className='text-neutral-10 text-base font-semibold mb-2'>
                    Doanh nghiệp (tùy chọn)
                  </p>
                  <input
                    type='text'
                    id='enterprise'
                    placeholder='Điền doanh nghiệp'
                    className='w-full outline-none h-10 px-3 rounded border border-neutral-6 text-base placeholder:text-neutral-6 focus:border-royalBlue'
                  />
                </label>
              </div>
              <label className='w-full block mb-8' htmlFor='message'>
                <p className='text-neutral-10 text-base font-semibold mb-2'>
                  Nội dung
                </p>
                <textarea
                  id='message'
                  placeholder='Điền lời nhắn của bạn tới đội ngũ iCONGTY'
                  className='w-full outline-none h-[120px] px-3 py-1 rounded border border-neutral-6 text-base placeholder:text-neutral-6 focus:border-royalBlue resize-y min-h-[80px]'
                />
              </label>
              <div className='flexEnd'>
                <div className='w-full md:w-auto'>
                  {/* Submit btn*/}
                  <ConfigProvider
                    theme={{
                      token: {},
                    }}
                  >
                    <Button
                      type='primary'
                      size='large'
                      block
                      onClick={handleSubmit}
                    >
                      <input
                        type='submit'
                        value='Gửi lời nhắn'
                        className='bg-transparent font-semibold text-base text-neutral-1 w-full h-full cursor-pointer'
                      />
                    </Button>
                  </ConfigProvider>
                </div>
              </div>
            </form>
          </div>
          <div className='relative w-full pb-[100%]  rounded-2xl overflow-hidden   lg:max-w-[50%] lg:pb-[50%]'>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7666.982802918576!2d105.77755338694288!3d21.01830208948276!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313455c862f3aee1%3A0x53602e8d02ec1d24!2zVG_DoCBOaMOgIFPDtG5nIMSQw6A!5e0!3m2!1sen!2s!4v1704195313697!5m2!1sen!2s'
              className='w-full h-full absolute inset-0'
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
