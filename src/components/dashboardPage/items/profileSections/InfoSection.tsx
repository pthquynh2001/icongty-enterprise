'use client';
import { useState, useRef } from 'react';
import axios from 'axios';
import { User } from 'next-auth';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { Button, message } from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';
import { ContentFrame } from '@/components/subpage';
import { validatePhone, validateUsername } from '@/utils/validationUtils';

const InfoSection = ({ user }: { user: User }) => {
  const { update } = useSession();
  const userId = user.id;
  const [messageApi, contextHolder] = message.useMessage();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [username, setUsername] = useState(user.username);
  const [phone, setPhone] = useState(user.phone || '');
  const [editing, setEditing] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const [errInput, setErrInput] = useState(0);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [loading, setLoading] = useState(false);

  // pop up message thong bao thanh cong
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Cập nhật thông tin thành công',
    });
  };

  const handleUpdateInfo = async () => {
    setLoading(true);
    // err: khong du thong tin
    if (!firstName || !lastName || !username || !phone) {
      setErrMessage('Vui lòng điền đầy đủ thông tin yêu cầu');
      setErrInput(1);
      setLoading(false);
      return;
    }
    // err: username da ton tai
    if (username !== user.username) {
      const { isValid, errors } = validateUsername(username);
      if (!isValid) {
        setErrMessage(errors[0]);
        setErrInput(2);
        setLoading(false);
        return;
      }
      try {
        const usernameExists = await axios.post('/api/userExists', {
          username,
        });
        const { user } = await usernameExists.data;
        if (user) {
          setErrMessage('Username đã tồn tại');
          setErrInput(2);
          setLoading(false);
          return;
        }
      } catch (err) {
        setErrMessage((err as Error).message);
        setErrInput(2);
        setLoading(false);
        return;
      }
    }
    // err: so dien thoai khong dung dinh dang
    if (phone && phone.length > 0) {
      const { isValid, errors } = validatePhone(phone);
      if (!isValid) {
        setErrMessage(errors[0]);
        setErrInput(3);
        setLoading(false);
        return;
      }
    }
    // err: khong co gi thay doi
    if (
      firstName === user.firstName &&
      lastName === user.lastName &&
      username === user.username &&
      phone === user.phone
    ) {
      setErrMessage('Không có thông tin nào được thay đổi');
      setLoading(false);
      return;
    }
    // cap nhat thong tin
    try {
      // cap nhat user trong session
      await update({ firstName });
      await update({ lastName });
      await update({ username });
      await update({ phone });
      // cap nhat user trong database
      const res = await axios.put('/api/update', {
        id: userId,
        firstName,
        lastName,
        username,
        phone,
      });
      if (res.status === 200) {
        console.log('Update thong tin thanh cong');
      } else {
        console.log('Update thong tin that bai');
      }
      reset();
      setLoading(false);
      success();
    } catch (err) {
      setErrMessage((err as Error).message);
    }
  };
  // reset khi out form
  const reset = () => {
    setErrMessage('');
    setErrInput(0);
    setEditing(false);
  };
  // cancel khi out form
  const handleCancel = () => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setUsername(user.username);
    setPhone(user.phone);
    if (formRef.current) {
      formRef.current.reset();
    }
    reset();
  };
  return (
    <ContentFrame title='Basic Information' className='w-full relative'>
      {contextHolder}
      <div className='grid grid-cols-3 gap-6'>
        <form className='col-span-2' ref={formRef}>
          <div className='grid grid-rows-3 grid-cols-2 gap-6'>
            <label className='block w-full'>
              <h5 className='mb-2'>First Name</h5>
              <div className='w-full relative'>
                <input
                  type='text'
                  name='firstName'
                  className={`border border-neutral-6 rounded py-3 pl-3 pr-[36px] w-full outline-none focus:border-royalBlue text-neutral-8 leading-[22px] read-only:border-neutral-5 read-only:focus:border-neutral-5 ${
                    errInput === 1 && 'placeholder-shown:border-red-600 '
                  }`}
                  value={editing ? firstName : user.firstName}
                  placeholder='Required'
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    setErrMessage('');
                  }}
                  readOnly={!editing}
                />
                <span className='absolute right-3 top-1/2 -translate-y-1/2 text-red-600 leading-3 text-base'>
                  *
                </span>
              </div>
            </label>
            <label className='block w-full'>
              <h5 className='mb-2'>Last Name</h5>
              <div className='w-full relative'>
                <input
                  type='text'
                  name='lastName'
                  className={`border border-neutral-6 rounded py-3 pl-3 pr-[36px] w-full outline-none focus:border-royalBlue text-neutral-8 leading-[22px] read-only:border-neutral-5 read-only:focus:border-neutral-5 ${
                    errInput === 1 && 'placeholder-shown:border-red-600'
                  }`}
                  value={editing ? lastName : user.lastName}
                  placeholder='Required'
                  onChange={(e) => {
                    setLastName(e.target.value);
                    setErrMessage('');
                  }}
                  readOnly={!editing}
                />
                <span className='absolute right-3 top-1/2 -translate-y-1/2 text-red-600 leading-3 text-base'>
                  *
                </span>
              </div>
            </label>
            <label className='block w-full '>
              <h5 className='mb-2'>Username</h5>
              <div className='w-full relative'>
                <input
                  type='text'
                  name='username'
                  className={`border border-neutral-6 rounded py-3 px-[36px]  w-full outline-none focus:border-royalBlue text-neutral-8 leading-[22px] read-only:border-neutral-5 read-only:focus:border-neutral-5 ${
                    (errInput === 1 && 'placeholder-shown:border-red-600') ||
                    (errInput === 2 &&
                      errMessage &&
                      'border-red-600 text-red-600')
                  }`}
                  placeholder='Required'
                  value={editing ? username : user.username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setErrMessage('');
                  }}
                  readOnly={!editing}
                />
                <Image
                  src='/icons/user.svg'
                  width={16}
                  height={16}
                  className='absolute left-3 top-1/2 -translate-y-1/2'
                  alt='icon'
                />
                <span className='absolute right-3 top-1/2 -translate-y-1/2 text-red-600 leading-3 text-base'>
                  *
                </span>
              </div>
            </label>
            <label className='block w-full'>
              <h5 className='mb-2'>Phone</h5>
              <div className='w-full relative'>
                <input
                  type='text'
                  name='email'
                  className={`border border-neutral-6 rounded py-3 pr-3 pl-10  w-full outline-none focus:border-royalBlue text-neutral-8 leading-[22px] read-only:border-neutral-5 read-only:focus:border-neutral-5 ${
                    (errInput === 1 && 'placeholder-shown:border-red-600') ||
                    (errInput === 3 &&
                      errMessage &&
                      'border-red-600 text-red-600')
                  }`}
                  placeholder='Required'
                  value={editing ? phone : user.phone || ''}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setErrMessage('');
                  }}
                  readOnly={!editing}
                />
                <svg
                  width='16'
                  height='16'
                  className='absolute left-3 top-1/2 -translate-y-1/2 text-neutral-8'
                >
                  <use xlinkHref='/icons/phone2.svg#phone2-icon' />
                </svg>
                <span className='absolute right-3 top-1/2 -translate-y-1/2 text-red-600 leading-3 text-base'>
                  *
                </span>
              </div>
            </label>
            {editing ? (
              <div className='relative'>
                <p className='absolute top-2/3 text-red-600'>{errMessage}</p>
                <div className='flexBetween gap-4'>
                  <Button
                    type='primary'
                    block
                    size='large'
                    onClick={handleUpdateInfo}
                    loading={loading}
                  >
                    <span className='font-semibold'>Save</span>
                  </Button>
                  <Button
                    type='primary'
                    block
                    ghost
                    size='large'
                    onClick={handleCancel}
                  >
                    <p className='font-semibold'>Cancel</p>
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <div className='flexStart'>
                  <Button
                    type='primary'
                    size='large'
                    onClick={() => setEditing(true)}
                  >
                    <p className='font-semibold'>Edit information</p>
                  </Button>
                </div>
              </div>
            )}
            <div className='relative flexEnd gap-1'>
              <Image
                src='/icons/verified.svg'
                width={16}
                height={16}
                alt='active'
              />
              <p className='text-polarGreen-7 text-xs font-semibold'>
                Last Updated at ....
              </p>
            </div>
          </div>
        </form>
        <div className='flexStart flex-col w-[128px] mx-auto'>
          <Image
            src='/images/banner.png'
            width={128}
            height={128}
            alt='avatar'
            className='rounded-full object-cover mb-6'
          />
          <Button type='primary' block className='mb-2'>
            <div className='flexCenter gap-2'>
              <CloudUploadOutlined />
              <p className='font-semibold'>Update</p>
            </div>
          </Button>
          <Button type='primary' ghost block>
            <p className='font-semibold'>Delete</p>
          </Button>
        </div>
      </div>
      <div className='rounded-[40px] bg-polarGreen-2 text-polarGreen-7 absolute top-12 right-[62px] flexCenter gap-2 px-4 py-1 font-semibold'>
        <span className='w-2 h-2 rounded-full bg-polarGreen-7'></span>
        Active
      </div>
    </ContentFrame>
  );
};

export default InfoSection;
