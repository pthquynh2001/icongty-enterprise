import Link from 'next/link';
import Image from 'next/image';
import { Button } from 'antd';
import { ContentFrame } from '@/components/subpage';
import { CloudUploadOutlined } from '@ant-design/icons';

interface ProfileItemProps {
  user: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
  };
}

const ProfileItem = ({ user }: ProfileItemProps) => {
  return (
    <div className='w-full flex flex-col gap-6'>
      <ContentFrame title='Basic Information' className='w-full relative'>
        <div className='grid grid-cols-3 gap-6'>
          <form className='col-span-2'>
            <div className='grid grid-rows-3 grid-cols-2 gap-6'>
              <label className='block w-full'>
                <h5 className='mb-2'>First Name</h5>
                <input
                  type='text'
                  name='firstName'
                  className='border border-neutral-6 rounded p-3 w-full outline-none focus:border-royalBlue text-neutral-8 leading-[22px] '
                  value={user.firstName}
                  readOnly
                />
              </label>
              <label className='block w-full'>
                <h5 className='mb-2'>Last Name</h5>
                <input
                  type='text'
                  name='lastName'
                  className='border border-neutral-6 rounded p-3 w-full outline-none focus:border-royalBlue text-neutral-8 leading-[22px]'
                  value={user.lastName}
                  readOnly
                />
              </label>
              <label className='block w-full '>
                <h5 className='mb-2'>Username</h5>
                <div className='w-full relative'>
                  <input
                    type='text'
                    name='username'
                    className='border border-neutral-6 rounded py-3 pr-3 pl-10 w-full outline-none focus:border-royalBlue text-neutral-8 leading-[22px]'
                    value={user.username}
                    readOnly
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
                <h5 className='mb-2'>Email</h5>
                <div className='w-full relative'>
                  <input
                    type='text'
                    name='email'
                    className='border border-neutral-6 rounded py-3 pr-3 pl-10 w-full outline-none focus:border-royalBlue text-neutral-8 leading-[22px]'
                    value={user.email}
                    readOnly
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
              <div className='flexBetween gap-4'>
                <Button type='primary' block size='large'>
                  <p className='font-semibold'>Save</p>
                </Button>
                <Button type='primary' block ghost size='large'>
                  <p className='font-semibold'>Cancel</p>
                </Button>
              </div>
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
      <div className='w-full px-12 py-10 bg-neutral-1 rounded-2xl flex justify-between'>
        <div className='flex gap-3'>
          <Image
            src='/icons/email.svg'
            alt='icon'
            width={24}
            height={24}
            className='shrink-0'
          />
          <div className='flex flex-col gap-2'>
            <h4>Change email</h4>
            <p className='text-base'>
              You are currently registered with:
              <span className='text-royalBlue font-semibold ml-2'>
                {user.email}
              </span>
            </p>
          </div>
        </div>
        <div className='shrink-0'>
          <Button type='primary' size='large'>
            <p>Change Email</p>
          </Button>
        </div>
      </div>
      <div className='w-full px-12 py-10 bg-neutral-1 rounded-2xl flex justify-between'>
        <div className='flex gap-3'>
          <Image
            src='/icons/lock.svg'
            alt='icon'
            width={24}
            height={24}
            className='shrink-0'
          />
          <div className='flex flex-col gap-2'>
            <h4>Change Password</h4>
            <p className='text-base'>
              It's a good idea to use a strong password that you're not using
              elsewhere!
            </p>
          </div>
        </div>
        <div className='shrink-0'>
          <Button type='primary' size='large'>
            <p>Change Password</p>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileItem;
