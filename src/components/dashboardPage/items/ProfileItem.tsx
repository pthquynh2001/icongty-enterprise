'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from 'antd';
import { ContentFrame } from '@/components/subpage';
import { CloudUploadOutlined } from '@ant-design/icons';
import { ChangePasswordModal, ChangeEmailModal } from '@/components/modals';
import { User } from 'next-auth';
import { InfoSection, EmailSection, PasswordSection } from './profileSections';

const ProfileItem = ({ user }: { user: User }) => {
  return (
    <div className='w-full flex flex-col gap-6 relative'>
      <InfoSection user={user} />
      <EmailSection user={user} />
      <PasswordSection user={user} />
    </div>
  );
};

export default ProfileItem;
