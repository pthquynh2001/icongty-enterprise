'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

interface ITab {
  name: string;
  id: string;
  icon: {
    src: string;
    id: string;
    alt: string;
  };
}
const TabBar = ({ tabs }: { tabs: ITab[] }) => {
  const [activeTab, setActiveTab] = useState('');
  const searchedTab = useSearchParams().get('tab');
  const path = usePathname();
  const router = useRouter();

  // START: set active tab
  useEffect(() => {
    if (searchedTab) {
      setActiveTab(searchedTab);
    } else {
      setActiveTab(tabs[0].id);
    }
  }, [searchedTab, tabs]);
  // END: set active tab

  // START: width & left of active tab border
  useEffect(() => {
    const activeTab = document.querySelector('.active-tab') as HTMLElement;
    const activeTabBorder = document.querySelector(
      '.active-tab-border'
    ) as HTMLElement;
    if (activeTabBorder && activeTab) {
      activeTabBorder.style.left = `${activeTab.offsetLeft}px`;
      activeTabBorder.style.width = `${activeTab.offsetWidth}px`;
    }
  }, [activeTab]);
  // END: width & left of active tab border

  return (
    <ul className='h-12  flex gap-3  relative '>
      <div className='h-[2px] absolute bottom-0  bg-royalBlue transition-all duration-700 active-tab-border'></div>
      {tabs.map((tab, index) => (
        <li
          className='inline-block group transition-all duration-300 px-5 h-full'
          key={index}
          onClick={() => {
            setActiveTab(tab.id);
            router.push(`${path}?tab=${tab.id}`, { scroll: false });
          }}
        >
          <div
            className={`flexCenter gap-[10px] h-full border-y-[3px] border-transparent cursor-pointer ${
              tab.id === activeTab && 'active-tab'
            }`}
          >
            <svg width='14' height='14'>
              <use
                className={`text-sunsetOrange-6 transition-all duration-300  ${
                  tab.id === activeTab && '!text-royalBlue'
                }`}
                xlinkHref={`${tab.icon.src}#${tab.icon.id}`}
              />
            </svg>
            <span
              className={`group-hover:text-royalBlue transition-all duration-300 font-semibold ' ${
                tab.id === activeTab && 'text-royalBlue'
              }`}
            >
              {tab.name}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TabBar;
