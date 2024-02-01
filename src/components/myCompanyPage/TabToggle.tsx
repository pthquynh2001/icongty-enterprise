import { useState, useEffect } from 'react';

interface tabs {
  tabs: {
    id: string;
    name: string;
    icon: { location: string; id: string };
  }[];
}
const TabToggle = ({ tabs }: tabs) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  return (
    <div className='bg-neutral-3 rounded-lg flexBetween p-1 relative h-11'>
      {tabs.map((tab, index) => (
        <div
          className={`group rounded-md flexCenter gap-[6px] py-[7px] px-3 cursor-pointer z-10 grow transition-all duration-300  ${
            activeTab === tab.id && 'bg-neutral-1 shadow-sm'
          }`}
          key={index}
          onClick={() => setActiveTab(tab.id)}
        >
          <svg
            width='14'
            height='14'
            className={`font-semibold leading-[22px] transition-all duration-300  ${
              activeTab === tab.id ? 'text-royalBlue' : 'text-sunsetOrange-6'
            }`}
          >
            <use xlinkHref={`${tab.icon.location}#${tab.icon.id}`} />
          </svg>
          <span
            className={`font-semibold leading-[22px] transition-all duration-300 group-hover:text-royalBlue ${
              activeTab === tab.id ? 'text-royalBlue' : 'text-neutral-8'
            }`}
          >
            {tab.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TabToggle;
