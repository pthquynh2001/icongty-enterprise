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
