'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

interface ISubMenuItem {
  link: string;
  name: string;
  id: string;
  icon: { src: string; id: string };
}

interface IMenuItem {
  name: string;
  subMenu: ISubMenuItem[];
}

const SideBar = ({ menu }: { menu: IMenuItem[] }) => {
  const [activeItem, setActiveItem] = useState('');
  const path = usePathname();
  const searchedItem = useSearchParams().get('page');
  const router = useRouter();
  //   START: set active item
  useEffect(() => {
    if (searchedItem) {
      setActiveItem(searchedItem);
    } else {
      setActiveItem(menu[0].subMenu[0].id);
    }
  }, [searchedItem, menu]);

  //   handle clicking on menu item, push router with current iem
  const handleItemClick = (subItem: ISubMenuItem) => {
    router.push(`${path}?page=${subItem.id}`, { scroll: false });
    setActiveItem(subItem.id);
  };
  return (
    <>
      {menu.map((item: IMenuItem, index: number) => (
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
    </>
  );
};

export default SideBar;
