'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { UserInfo } from '@/components/form';
import { Header } from '@/components/shared';
import { DASHBOARD_MENU } from '@/constants';
import { SubpageBreadcrumb } from '@/components/subpage';
import { useSession } from 'next-auth/react';
import SideBar from '@/components/dashboardPage/SideBar';
import { useSearchParams } from 'next/navigation';
import {
  CompaniesItem,
  FavoritesItem,
  NotificationItem,
  ProfileItem,
} from '@/components/dashboardPage/items';

const DashboardPage = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const menu = DASHBOARD_MENU;
  const [activeItem, setActiveItem] = useState('');
  const [activeItemName, setActiveItemName] = useState(
    menu[0].subMenu[0].name || ''
  );

  const searchedItem = useSearchParams().get('page');
  // breadcrumb items
  const items = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: activeItemName },
  ];

  //   START: set active item
  useEffect(() => {
    if (searchedItem) {
      setActiveItem(searchedItem);
    } else {
      setActiveItem(menu[0].subMenu[0].id);
    }
  }, [searchedItem, menu]);
  // set active item name
  useEffect(() => {
    const currentItem = menu
      .flatMap((item) => item.subMenu)
      .filter((subItem) => subItem.id === activeItem);
    if (currentItem[0]) {
      setActiveItemName(currentItem[0].name);
    } else {
      setActiveItemName(menu.map((item) => item.subMenu[0].name)[0]);
    }
  }, [activeItem, menu]);

  return (
    <div className='w-full  min-h-screen pt-16 lg:pt-20  bg-neutral-4 pb-6'>
      <Header />
      <div className='flex  w-full h-full'>
        <div className='shrink-0 left w-[320px] py-6 pl-6 my-6'>
          <SideBar menu={menu} />
          <UserInfo />
        </div>
        {user && (
          <div className='right border-l border-neutral-5 w-full pl-[60px] pr-[84px] py-6 my-6'>
            <SubpageBreadcrumb items={items} />
            <div className='mt-8'>
              {activeItem === 'profile' && <ProfileItem user={user} />}
              {activeItem === 'companies' && <CompaniesItem user={user} />}
              {activeItem === 'favorites' && <FavoritesItem user={user} />}
              {activeItem === 'notification' && (
                <NotificationItem user={user} />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
