'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { UserInfo } from '@/components/form';
import { Header } from '@/components/shared';
import { DASHBOARD_MENU } from '@/constants';
import { SubpageBreadcrumb, ContentFrame } from '@/components/subpage';
import { useSession } from 'next-auth/react';
import { Button } from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';
interface ISubMenuItem {
  link: string;
  name: string;
  id: string;
  icon: { src: string; id: string };
}

const DashboardPage = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const menu = DASHBOARD_MENU;
  const [activeItem, setActiveItem] = useState(menu[0].subMenu[0].id || '');
  const [activeItemName, setActiveItemName] = useState(
    menu[0].subMenu[0].name || ''
  );
  const items = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: activeItemName },
  ];

  const handleItemClick = (subItem: ISubMenuItem) => {
    setActiveItemName(subItem.name);
    setActiveItem(subItem.id);
  };
  return (
    <div className='w-full  min-h-screen pt-16 lg:pt-20  bg-neutral-4 pb-6'>
      <Header />
      <div className='flex  w-full h-full'>
        <div className='left w-[320px] py-6 pl-6 shrink-0 mt-6'>
          {menu.map((item, index) => (
            <ul
              key={index}
              className=' w-full border-b border-neutral-5 pr-6 pb-10 mb-8 last:border-none'
            >
              <div className='text-neutral-6 font-semibold uppercase mb-4'>
                {item.name}
              </div>
              {item.subMenu.map((subItem: ISubMenuItem, index: number) => (
                <li key={index} onClick={() => handleItemClick(subItem)}>
                  <Link
                    className={`px-6 py-4 flex items-start justify-start gap-4 rounded-2xl transition-all duration-300 hover:text-royalBlue ${
                      subItem.id === activeItem
                        ? 'bg-royalBlue !text-neutral-1'
                        : 'text-neutral-8'
                    } `}
                    href={'#'}
                  >
                    <svg width='24' height='24' className='shrink-0'>
                      <use
                        className={` text-inherit`}
                        xlinkHref={`${subItem.icon.src}#${subItem.icon.id}`}
                      />
                    </svg>
                    <h5 className='text-inherit '>{subItem.name}</h5>
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </div>
        {user && (
          <div className='right border-l border-neutral-5 w-full pl-[60px] pr-[84px]  my-6 flex flex-col gap-6'>
            <div className='pt-6'>
              <SubpageBreadcrumb items={items} />
            </div>
            <ContentFrame
              title='Basic Information'
              className='w-full mt-8 relative'
            >
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
                    <label className='block w-full relative'>
                      <h5 className='mb-2'>Username</h5>
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
                        className='absolute bottom-[15px] left-3'
                        alt='icon'
                      />
                    </label>
                    <label className='block w-full relative'>
                      <h5 className='mb-2'>Email</h5>
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
                        className='absolute left-3 bottom-[15px] text-neutral-8'
                      >
                        <use xlinkHref='/icons/phone2.svg#phone2-icon' />
                      </svg>
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
                <div className='flex-col gap-2'>
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
                <div className='flex-col gap-2'>
                  <h4>Change Password</h4>
                  <p className='text-base'>
                    It's a good idea to use a strong password that you're not
                    using elsewhere!
                  </p>
                </div>
              </div>
              <div className='shrink-0'>
                <Button type='primary' size='large'>
                  <p>Change Password</p>
                </Button>
              </div>
            </div>
            <UserInfo />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
