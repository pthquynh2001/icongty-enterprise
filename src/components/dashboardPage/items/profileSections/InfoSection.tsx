'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Button } from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';
import { User } from 'next-auth';
import { ContentFrame } from '@/components/subpage';

const InfoSection = ({ user }: { user: User }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [username, setUsername] = useState(user.username);
  const [phone, setPhone] = useState(user.phone || '');
  const [editing, setEditing] = useState(false);

  const formRef = useRef<HTMLFormElement | null>(null);

  const handleUpdateInfo = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setUsername(user.username);
    setPhone(user.phone || '');
    setEditing(false);
  };
  const handleCancel = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setUsername(user.username);
    setPhone(user.phone || '');
    setEditing(false);
  };
  return (
    <ContentFrame title='Basic Information' className='w-full relative'>
      <div className='grid grid-cols-3 gap-6'>
        <form className='col-span-2' ref={formRef}>
          <div className='grid grid-rows-3 grid-cols-2 gap-6'>
            <label className='block w-full'>
              <h5 className='mb-2'>First Name</h5>
              <input
                type='text'
                name='firstName'
                className='border border-neutral-6 rounded p-3 w-full outline-none focus:border-royalBlue text-neutral-8 leading-[22px] '
                value={editing ? firstName : user.firstName}
                onChange={(e) => setFirstName(e.target.value)}
                readOnly={!editing}
              />
            </label>
            <label className='block w-full'>
              <h5 className='mb-2'>Last Name</h5>
              <input
                type='text'
                name='lastName'
                className='border border-neutral-6 rounded p-3 w-full outline-none focus:border-royalBlue text-neutral-8 leading-[22px]'
                value={editing ? lastName : user.lastName}
                onChange={(e) => setLastName(e.target.value)}
                readOnly={!editing}
              />
            </label>
            <label className='block w-full '>
              <h5 className='mb-2'>Username</h5>
              <div className='w-full relative'>
                <input
                  type='text'
                  name='username'
                  className='border border-neutral-6 rounded py-3 pr-3 pl-10 w-full outline-none focus:border-royalBlue text-neutral-8 leading-[22px]'
                  value={editing ? username : user.username}
                  onChange={(e) => setUsername(e.target.value)}
                  readOnly={!editing}
                />
                <Image
                  src='/icons/user.svg'
                  width={16}
                  height={16}
                  className='absolute left-3 top-1/2 -translate-y-1/2'
                  alt='icon'
                />
              </div>
            </label>
            <label className='block w-full'>
              <h5 className='mb-2'>Phone</h5>
              <div className='w-full relative'>
                <input
                  type='text'
                  name='email'
                  className='border border-neutral-6 rounded py-3 pr-3 pl-10 w-full outline-none focus:border-royalBlue text-neutral-8 leading-[22px]'
                  value={editing ? phone : user.phone || ''}
                  onChange={(e) => setPhone(e.target.value)}
                  readOnly={!editing}
                />
                <svg
                  width='16'
                  height='16'
                  className='absolute left-3 top-1/2 -translate-y-1/2 text-neutral-8'
                >
                  <use xlinkHref='/icons/phone2.svg#phone2-icon' />
                </svg>
              </div>
            </label>
            {editing ? (
              <div className='flexBetween gap-4'>
                <Button
                  type='primary'
                  block
                  size='large'
                  onClick={handleUpdateInfo}
                >
                  <p className='font-semibold'>Save</p>
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
            ) : (
              <div className='flexStart'>
                <Button
                  type='primary'
                  size='large'
                  onClick={() => setEditing(true)}
                >
                  <p className='font-semibold'>Edit information</p>
                </Button>
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
