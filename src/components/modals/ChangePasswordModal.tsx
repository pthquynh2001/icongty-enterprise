'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Button, Modal } from 'antd';
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import { User } from 'next-auth';
import { validatePassword } from '@/utils/validationUtils';

const ChangePasswordModal = ({ user }: { user: User }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShowed1, setIsShowed1] = useState(false);
  const [isShowed2, setIsShowed2] = useState(false);
  const [isShowed3, setIsShowed3] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const formRef = useRef<HTMLFormElement | null>(null);
  const userId = user.id;
  const [success, setSuccess] = useState(false);

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

  const handleSubmit = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setErrMessage('Vui lòng nhập đầy đủ thông tin');
      setLoading(false);
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrMessage('Mật khẩu xác nhận không khớp');
      setConfirmPassword('');
      setNewPassword('');
      setLoading(false);
      return;
    }
    if (currentPassword === newPassword) {
      setErrMessage('Mật khẩu mới không được trùng với mật khẩu cũ');
      setConfirmPassword('');
      setNewPassword('');
      setLoading(false);
      return;
    }
    const { isValid, errors } = validatePassword(newPassword);
    if (!isValid) {
      setConfirmPassword('');
      setNewPassword('');
      setErrMessage(errors[0]);
      setLoading(false);
      return;
    }
    try {
      const passwordMatch = await axios.post('/api/passwordMatch', {
        id: userId,
        currentPassword,
        newPassword,
      });
      if (passwordMatch.status !== 200) {
        resetForm();
        setLoading(false);
        return;
      }
      const res = await axios.put('/api/update', {
        id: userId,
        password: newPassword,
      });
      if (res?.status === 200) {
        console.log('Update password thanh cong');
        setLoading(false);
        setErrMessage('');
        setSuccess(true);
        return;
      }
    } catch (error) {
      console.error('Error during changing password', error);
      setErrMessage((error as any).response.data.statusText);
      resetForm();
      setLoading(false);
    }
  };

  // handle clicking on confirm/ok button
  const handleOk = () => {
    setLoading(true);
    handleSubmit();
  };
  // reset form after modal is closed
  const resetForm = () => {
    if (formRef.current) {
      formRef.current?.reset();
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
  };
  useEffect(() => {
    if (!isModalOpen) {
      resetForm();
      setErrMessage('');
      setSuccess(false);
      setIsShowed1(false);
      setIsShowed2(false);
      setIsShowed3(false);
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
        {success ? (
          <div className='flexCenter flex-col'>
            <Image
              src='/icons/success.svg'
              width={85}
              height={85}
              alt='success'
            />
            <p className='text-base my-8 font-semibold'>
              Đổi mật khẩu thành công
            </p>
            <Button
              type='primary'
              size='large'
              onClick={() => setIsModalOpen(false)}
            >
              Đồng ý
            </Button>
          </div>
        ) : (
          <form ref={formRef} autoComplete='off'>
            <div className='relative mb-4'>
              <input
                className={`w-full h-12 py-3 pl-3 pr-9 outline-none border border-neutral-6 rounded-[4px] placeholder:text-neutral-6 ${
                  errMessage && 'placeholder-shown:border-rose-600'
                }`}
                placeholder='Your Current Password'
                type={isShowed1 ? 'text' : 'password'}
                autoComplete='off'
                value={currentPassword}
                onChange={(e) => {
                  setCurrentPassword(e.target.value);
                  setErrMessage('');
                }}
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
                className={`w-full h-12 py-3 pl-3 pr-9 outline-none border border-neutral-6 rounded-[4px] placeholder:text-neutral-6 ${
                  errMessage && 'placeholder-shown:border-rose-600'
                }`}
                placeholder='Your New Password'
                type={isShowed2 ? 'text' : 'password'}
                autoComplete='false'
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value), setErrMessage('');
                }}
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
            <div className='relative mb-2'>
              <input
                className={`w-full h-12 py-3 pl-3 pr-9 outline-none border border-neutral-6 rounded-[4px] placeholder:text-neutral-6 ${
                  errMessage && 'placeholder-shown:border-rose-600'
                }`}
                placeholder='Confirm Your New Password'
                autoComplete='false'
                type={isShowed3 ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value), setErrMessage('');
                }}
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
            <p className='h-5 text-red-600 mb-4'>
              {errMessage ? errMessage : ''}
            </p>
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
        )}
      </Modal>
    </>
  );
};

export default ChangePasswordModal;
