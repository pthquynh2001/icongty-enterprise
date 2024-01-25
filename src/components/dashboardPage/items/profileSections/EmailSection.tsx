import React from 'react';
import Image from 'next/image';
import { User } from 'next-auth';
import { ChangeEmailModal } from '@/components/modals';

const EmailSection = ({ user }: { user: User }) => {
  return (
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
        <ChangeEmailModal user={user} />
      </div>
    </div>
  );
};

export default EmailSection;
