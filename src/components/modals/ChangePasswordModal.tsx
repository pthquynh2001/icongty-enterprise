'use client';
import { useState, useRef, useEffect } from 'react';
import { Button, Modal } from 'antd';
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  CloseOutlined,
} from '@ant-design/icons';

const ChangePasswordModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShowed1, setIsShowed1] = useState(false);
  const [isShowed2, setIsShowed2] = useState(false);
  const [isShowed3, setIsShowed3] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  // modal styles
  const modalStyles = {
    header: {
      paddingBottom: 24,
      borderBottom: '1px solid #BFBFBF',
      marginBottom: 32,
    },

    mask: {
      backdropFilter: 'blur(10px)',
    },

    content: {
      boxShadow: '0 0 30px #999',
    },
  };

  // handle clicking on confirm/ok button
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsModalOpen(false);
    }, 2000);
  };
  // reset form after modal is closed
  useEffect(() => {
    if (!isModalOpen && formRef.current) {
      formRef.current?.reset();
    }
  }, [isModalOpen]);
  return (
    <>
      <Button type='primary' size='large' onClick={() => setIsModalOpen(true)}>
        Change Password
      </Button>
      <Modal
        title={<h3>Change Password</h3>}
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        closeIcon={null}
        styles={modalStyles}
        width={566}
        classNames={{
          content: '!rounded-2xl !pt-8 !pb-12 !px-[60px]',
        }}
        footer={null}
      >
        <CloseOutlined
          className='absolute top-8 right-12 text-[20px] text-neutral-7 cursor-pointer'
          onClick={() => setIsModalOpen(false)}
        />
        <form ref={formRef}>
          <div className='relative mb-4'>
            <input
              className='w-full h-12 py-3 pl-3 pr-9 outline-none border border-neutral-6 rounded-[4px] placeholder:text-neutral-6'
              placeholder='Your Current Password'
              type={isShowed1 ? 'text' : 'password'}
            />
            {isShowed1 ? (
              <EyeInvisibleOutlined
                width={16}
                height={16}
                className='absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer'
                onClick={() => setIsShowed1(!isShowed1)}
              />
            ) : (
              <EyeOutlined
                width={16}
                height={16}
                className='absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer'
                onClick={() => setIsShowed1(!isShowed1)}
              />
            )}
          </div>
          <div className='relative mb-4'>
            <input
              className='w-full h-12 py-3 pl-3 pr-9 outline-none border border-neutral-6 rounded-[4px]  placeholder:text-neutral-6'
              placeholder='Your New Password'
              type={isShowed2 ? 'text' : 'password'}
            />
            {isShowed2 ? (
              <EyeInvisibleOutlined
                width={16}
                height={16}
                className='absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer'
                onClick={() => setIsShowed2(!isShowed2)}
              />
            ) : (
              <EyeOutlined
                width={16}
                height={16}
                className='absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer'
                onClick={() => setIsShowed2(!isShowed2)}
              />
            )}
          </div>
          <div className='relative mb-6'>
            <input
              className='w-full h-12 py-3 pl-3 pr-9 outline-none border border-neutral-6 rounded-[4px]  placeholder:text-neutral-6'
              placeholder='Confirm Your New Password'
              type={isShowed3 ? 'text' : 'password'}
            />
            {isShowed3 ? (
              <EyeInvisibleOutlined
                width={16}
                height={16}
                className='absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer'
                onClick={() => setIsShowed3(!isShowed3)}
              />
            ) : (
              <EyeOutlined
                width={16}
                height={16}
                className='absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer'
                onClick={() => setIsShowed3(!isShowed3)}
              />
            )}
          </div>
          <div className='flexCenter'>
            <Button
              key='submit'
              type='primary'
              loading={loading}
              size='large'
              onClick={() => handleOk()}
            >
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ChangePasswordModal;
