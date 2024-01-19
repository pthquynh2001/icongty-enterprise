'use client';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';

const UserInfo = () => {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div>
      <div>
        name:
        <span>
          {session?.user?.firstName} {session?.user?.lastName}
        </span>
      </div>
      <div>
        username:
        <span>{session?.user?.username}</span>
      </div>
      <div>
        email:<span>{session?.user?.email}</span>
      </div>
      <button
        onClick={() => signOut({ callbackUrl: '/login' })}
        className='border p-4 cursor-pointer'
      >
        log out
      </button>
    </div>
  );
};

export default UserInfo;
