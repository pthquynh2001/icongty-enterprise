import React from 'react';
import Link from 'next/link';

const CompanyCard = ({ card }: any) => {
  return (
    card && (
      <Link href={'/'} className='group'>
        <div className='flexBetween  w-full h-[54px] py-4 px-6 bg-white  rounded-lg shadow-card hover:shadow-cardHover '>
          <span className='text-neutral-10 font-semibold group-hover:text-royalBlue transition line-clamp-2'>
            {card.name}
          </span>
          <div className='flexCenter font-semibold px-2 text-xs text-royalBlue-80 ml-2 rounded min-w-[50px] h-[22px] bg-[#e1e6f3] hover:bg-royalBlue hover:text-neutral-1 transition'>
            {card.companyCount}
          </div>
        </div>
      </Link>
    )
  );
};

export default CompanyCard;
