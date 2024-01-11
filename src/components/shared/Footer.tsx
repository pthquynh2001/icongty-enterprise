import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FOOTER_LINKS, SOCIALS } from '@/constants';

type ColumnProps = {
  title: string;
  links: Array<string>;
};

// Column component for links
const FooterColumn = ({ title, links }: ColumnProps) => {
  return (
    <div className='flex-col flexCenter md:items-start gap-6 w-full md:max-w-[30%] grow mt-8 mb-8'>
      <h4 className='opacity-70 px-2 font-medium text-neutral-1 '>{title}</h4>
      <ul className='flexCenter flex-col md:items-start  gap-4'>
        {links.map((link) => (
          <Link href='/' key={link} className='px-2 py-[1px] truncate'>
            {link}
          </Link>
        ))}
      </ul>
    </div>
  );
};

// Footer component
const Footer = () => {
  return (
    <footer className='footer  text-neutral-1 flex-col flexBetween'>
      <div className='  max-container padding-container flex-col flexBetween w-full h-full'>
        <div className='flexBetween flex-wrap  w-full mt-16 mb-12'>
          <div className='flex items-start flex-col gap-6 w-[330px] grow md:mr-36 '>
            <Image
              src='/icons/logo-white.svg'
              width={330}
              height={91}
              alt='iCongty-logo'
              priority={true}
              className='w-auto h-auto'
            />
            <p className='text-justify opacity-70'>
              Trong số hơn +16,000 doanh nghiệp đang phát triển mạnh mẽ tại Việt
              Nam, cùng khám phá danh sách các công ty tiêu biểu để tìm ra đối
              tác tiềm năng với doanh nghiệp của bạn.
            </p>
            <div className='flex flex-col gap-2'>
              <p className='text-start'>
                Địa chỉ: T21A - Tòa nhà Sông Đà - Mỹ Đình 1 - Nam Từ Liêm - Hà
                Nội
              </p>
              <p className='text-start'>
                Email:{' '}
                <a href='mailto:support@icongty.vn'>support@icongty.vn</a>
              </p>
            </div>
          </div>
          <div className='flex flex-wrap md:flex-nowrap md:items-start md:justify-between basis-[56%] grow'>
            {FOOTER_LINKS.map((links, index) => (
              <FooterColumn
                key={index}
                title={links.title}
                links={links.links}
              />
            ))}
          </div>
        </div>

        <div className='flexBetween flex-col md:flex-row py-4 gap-4 border-t border-white/[.4] w-full'>
          <ul className='flex gap-4'>
            {SOCIALS.map((social) => (
              <li key={social.title}>
                <Link href={social.link}>
                  <svg width='32' height='32'>
                    <use
                      xlinkHref={`/icons/${social.icon}#${social.title}-icon`}
                      className='social-icon'
                    />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
          <div className='text-xs'>
            <span className='opacity-70'>
              © 2021 iCongty® - All rights reserved by
            </span>
            <strong className='opacity-100'> iCONGTY®</strong>.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
