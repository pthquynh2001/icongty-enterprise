'use client';
import { useState, useRef, useEffect, ChangeEvent } from 'react';
import { Button, Modal } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { User } from 'next-auth';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import Image from 'next/image';
import { validateEmail } from '@/utils/validationUtils';
import { PlusOutlined } from '@ant-design/icons';

const AddCompanyModal = ({ user }: { user: User }) => {
  const { update } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [errMessage, setErrMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);
  const userId = user.id;
  //
  const [corpName, setCorpName] = useState('');
  const [taxCode, setTaxCode] = useState('');
  const [lang, setLang] = useState('');
  //
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

  // check if email existed
  const handleSubmit = async () => {
    if (!newEmail) {
      setErrMessage('Vui lòng nhập đầy đủ thông tin');
      setLoading(false);
      return;
    }
    if (newEmail === user.email) {
      setLoading(false);
      setErrMessage('Email mới không được trùng với email cũ');
      return;
    }
    const { isValid, errors } = validateEmail(newEmail);
    if (!isValid) {
      setErrMessage(errors[0]);
      setLoading(false);
      return;
    }
    try {
      const resUserExists = await axios.post('/api/userExists', {
        email: newEmail,
      });
      const { user } = await resUserExists.data;
      if (user) {
        setErrMessage('Email đã được đăng ký');
        setLoading(false);
        return;
      }
      // update email in database
      update({ email: newEmail });
      const res = await axios.put('/api/update', {
        id: userId,
        email: newEmail,
      });

      if (res.status === 200) {
        console.log('Update email thanh cong');
      } else {
        console.log('Update email that bai');
      }
      setLoading(false);
      setSuccess(true);
    } catch (error) {
      console.error('Error during updating email', error);
    }
  };

  // handle clicking on confirm/ok button
  const handleOk = () => {
    setLoading(true);
    handleSubmit();
  };
  // reset form after modal is closed
  useEffect(() => {
    if (!isModalOpen && formRef.current) {
      formRef.current?.reset();
      setTaxCode('');
      setCorpName('');
      setLang('');
    }
    if (!isModalOpen) {
      setSuccess(false);
      setNewEmail('');
      setErrMessage('');
    }
  }, [isModalOpen]);

  return (
    <>
      <PlusOutlined
        className=' text-[22px] p-1 cursor-pointer'
        style={{ color: '#2f61e6' }}
        onClick={() => setIsModalOpen(true)}
      />
      <p className='text-base text-neutral-8 mt-2 mb-4'>Add a new Company</p>
      <Button type='primary' size='large' onClick={() => setIsModalOpen(true)}>
        <p className='font-semibold px-4'>Add Company</p>
      </Button>
      <Modal
        title={
          <h3>
            <PlusOutlined style={{ color: '#2f61e6' }} /> New Company
          </h3>
        }
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
              Tao cong ty thanh cong
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
          <form ref={formRef}>
            <div className='mb-6'>
              <label
                htmlFor='corpName'
                className='text-base font-semibold text-neutral-10 mb-2 block'
              >
                Corporate Name
              </label>
              <input
                required
                id='corpName'
                className={`w-full h-12 py-3 pl-3 pr-9 outline-none border border-neutral-6  rounded-[4px] placeholder:text-neutral-6 ${
                  errMessage && 'border-rose-600'
                }`}
                placeholder='Fill Your Corporate Name'
                value={corpName}
                onChange={(e) => setCorpName(e.target.value)}
              />
            </div>
            <div className='mb-6'>
              <label
                htmlFor='taxCode'
                className='text-base font-semibold text-neutral-10 mb-2 block'
              >
                Tax Code
              </label>
              <input
                required
                id='taxCode'
                className={`w-full h-12 py-3 pl-3 pr-9 outline-none border border-neutral-6  rounded-[4px] placeholder:text-neutral-6 ${
                  errMessage && 'border-rose-600'
                }`}
                placeholder='Fill Your Tax Code'
                value={taxCode}
                onChange={(e) => setTaxCode(e.target.value)}
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='lang'
                className='text-base font-semibold text-neutral-10 mb-2 block'
              >
                Languages
              </label>
              <input
                required
                id='lang'
                className={`w-full h-12 py-3 pl-3 pr-9 outline-none border border-neutral-6  rounded-[4px] placeholder:text-neutral-6 ${
                  errMessage && 'border-rose-600'
                }`}
                placeholder='select languages'
                value={lang}
                onChange={(e) => setLang(e.target.value)}
              />
            </div>
            <p className='mb-4 min-h-5 text-red-600'>
              {errMessage}err mess abc dce {errMessage}err mess abc dce{' '}
            </p>
            <div className='flexCenter'>
              <div className='flex gap-6 w-full'>
                <Button
                  key='submit'
                  type='primary'
                  loading={loading}
                  ghost
                  size='large'
                  onClick={() => setIsModalOpen(false)}
                  block
                >
                  Cancel
                </Button>
                <Button
                  key='submit'
                  type='primary'
                  loading={loading}
                  size='large'
                  onClick={handleOk}
                  block
                >
                  Create
                </Button>
              </div>
            </div>
          </form>
        )}
      </Modal>
    </>
  );
};

export default AddCompanyModal;
