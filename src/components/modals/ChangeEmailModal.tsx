'use client';
import { useState, useRef, useEffect, ChangeEvent } from 'react';
import { Button, Modal } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { User } from 'next-auth';
import { useSession } from 'next-auth/react';
import { set } from 'mongoose';

const ChangeEmailModal = ({ user }: { user: User }) => {
  const { update } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [errMessage, setErrMessage] = useState('');
  const formRef = useRef<HTMLFormElement | null>(null);

  const userId = user.id; // modal styles
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

  //  check if email is valid
  const isEmailValid = (email: string): boolean => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  };

  // check if email existed
  const handleSubmit = async () => {
    try {
      const resUserExists = await fetch('/api/userExists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: newEmail,
        }),
      });
      const { user } = await resUserExists.json();
      if (user) {
        setErrMessage('Email existed');
        return;
      }
      update({ email: newEmail });
      const res = await fetch('/api/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: userId,
          email: newEmail,
        }),
      });

      if (res.ok) {
        console.log('Update email thanh cong');
      } else {
        console.log('Update email that bai');
      }
      setLoading(false);
      setIsModalOpen(false);
      setErrMessage('');
    } catch (error) {
      console.error('Error during updating email', error);
    }
  };

  // handle clicking on confirm/ok button
  const handleOk = () => {
    setLoading(true);
    if (newEmail === user.email) {
      setTimeout(() => {
        setLoading(false);
        setErrMessage('Email is not changed');
      }, 2000);
      return;
    }
    if (isEmailValid(newEmail)) {
      handleSubmit();
    } else {
      setLoading(false);
      setErrMessage('Email is not valid');
    }
  };
  // reset form after modal is closed
  useEffect(() => {
    if (!isModalOpen && formRef.current) {
      formRef.current?.reset();
      setNewEmail('');
      setErrMessage('');
    }
  }, [isModalOpen]);

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setNewEmail(e.target.value);
    setErrMessage('');
  };

  return (
    <>
      <Button type='primary' size='large' onClick={() => setIsModalOpen(true)}>
        Change Email
      </Button>
      <Modal
        title={<h3>Change Email</h3>}
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
          <p className='text-base mb-4'>
            You are currently registered with:{' '}
            <span className='font-semibold text-royalBlue'>{user.email}</span>
          </p>
          <input
            required
            type='email'
            className={`w-full h-12 py-3 pl-3 pr-9 outline-none border border-neutral-6  rounded-[4px] placeholder:text-neutral-6 ${
              errMessage && 'border-rose-600'
            }`}
            placeholder='Your New Email'
            value={newEmail}
            onChange={(e) => onChangeEmail(e)}
          />
          <p className='my-2 h-5 text-red-600'>{errMessage}</p>
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

export default ChangeEmailModal;
