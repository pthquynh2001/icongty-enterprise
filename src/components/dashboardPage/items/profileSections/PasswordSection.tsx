import React from 'react';
import Image from 'next/image';
import { User } from 'next-auth';
import { ChangePasswordModal } from '@/components/modals';

const PasswordSection = ({ user }: { user: User }) => {
  return (
    <div>
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
          <ChangePasswordModal user={user} />
        </div>
      </div>
    </div>
  );
};

export default PasswordSection;
