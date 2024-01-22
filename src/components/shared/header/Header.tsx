'use client';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { NAV_LINKS } from '@/constants';
import { Button, Select, ConfigProvider, Drawer } from 'antd';
import HeaderAccount from './HeaderAccount';
import HeaderSearch from './HeaderSearch';
import HeaderLanguages from './HeaderLanguages';
import HeaderMobileMenu from './HeaderMobileMenu';
type HeaderProps = {
  home?: boolean;
  search?: boolean;
};

const navLinks = NAV_LINKS;

const Header: React.FC<HeaderProps> = ({ home, search }) => {
  const [isTransparent, setIsTransparent] = useState(home ? true : false);
  const headerRef = useRef<HTMLHeadElement>(null);
  const pathname = usePathname();

  // transparent header khi scroll (o trang home)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 520) {
        setIsTransparent(true);
      } else {
        setIsTransparent(false);
      }
    };
    if (home) {
      window.addEventListener('scroll', handleScroll);
    }
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [home]);

  // transparent header khi hover (o trang home)
  useEffect(() => {
    const handleHover = () => {
      setIsTransparent(false);
    };

    const handleHoverOut = () => {
      setIsTransparent(window.scrollY < 500);
    };
    if (headerRef.current && home) {
      headerRef.current.addEventListener('mouseover', handleHover);
      headerRef.current.addEventListener('mouseout', handleHoverOut);
    }

    return () => {
      if (headerRef.current && home) {
        headerRef.current.removeEventListener('mouseover', handleHover);
        headerRef.current.removeEventListener('mouseout', handleHoverOut);
      }
    };
  }, [home]);

  // An hien header khi scroll
  useEffect(() => {
    const handleBodyScroll = () => {
      if (document.body.getBoundingClientRect().top > scrollPos) {
        if (headerRef.current) {
          headerRef.current.style.transform = 'translateY(0)';
        }
      } else {
        if (headerRef.current) {
          headerRef.current.style.transform = 'translateY(-100%)';
        }
      }
      scrollPos = document.body.getBoundingClientRect().top;
    };
    let scrollPos = 0;
    window.addEventListener('scroll', handleBodyScroll);

    return () => {
      window.removeEventListener('scroll', handleBodyScroll);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className={`group  border-b border-white/[.4] fixed top-0 left-0 right-0 z-50 border-solid shadow-banner transition-all duration-300 ${
        home
          ? isTransparent
            ? 'bg-transparent shadow-none'
            : 'bg-[#072A88] lg:bg-neutral-1'
          : 'bg-neutral-1 '
      }`}
    >
      {search && (
        <div className='h-10 w-full bg-royalBlue flexBetween  px-4 lg:px-6'>
          <ul className='flex gap-4'>
            {NAV_LINKS.map((link) => (
              <li
                key={link.key}
                className={` px-2 ${
                  pathname === link.href ? 'text-[#6AE2F8]' : 'text-neutral-1'
                }`}
              >
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className='h-16 lg:h-20 w-full flexBetween gap-10  px-4 lg:px-6'>
        <div className='left w-full flexStart gap-11'>
          <div className='h-[50px]'>
            <Link
              href='/'
              className='flexCenter w-full h-full relative'
              scroll={false}
            >
              <Image
                src='/icons/logo.svg'
                width={50}
                height={50}
                alt='iCongty-logo'
                priority={true}
              />
              <p
                className={`hidden lg:block ml-3 tracking-[0.5px] font-bold text-[25px] font-mont  transition-all duration-300 ${
                  home
                    ? isTransparent
                      ? 'text-neutral-1'
                      : 'text-neutral-8 '
                    : 'text-neutral-8'
                }`}
              >
                iCONGTY
              </p>
            </Link>
          </div>
          {search ? (
            <div className='w-full  hidden lg:block max-w-[566px] '>
              <HeaderSearch />
            </div>
          ) : (
            <ul className='hidden lg:flex gap-4'>
              {navLinks.map((link) => (
                <li
                  key={link.key}
                  className={` lg:hover:text-royalBlue transition-all duration-300 ${
                    home
                      ? isTransparent
                        ? 'text-neutral-1'
                        : 'text-neutral-8'
                      : link.href === pathname
                      ? 'text-royalBlue'
                      : 'text-neutral-8 hover:text-royalBlue '
                  }`}
                >
                  <Link href={link.href} className='px-2 py-4 '>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={`right hidden lg:flex gap-4`}>
          <HeaderAccount
            home={home}
            isTransparent={isTransparent}
            search={search}
          />
          <div
            className={`-mr-[18px] ${
              search ? 'absolute top-[3px] right-[26px]' : 'relative'
            }`}
          >
            <HeaderLanguages />
          </div>
        </div>
        <div className='flex lg:hidden'>
          <HeaderMobileMenu navLinks={navLinks} home={home} />
        </div>
      </div>
    </header>
  );
};

export default Header;
