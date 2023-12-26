'use client';
import { useState, ChangeEvent, MouseEvent, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button, ConfigProvider } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

const ResetPasswordPage = () => {
  const [isShowed, setIsShowed] = useState(false);
  const [isShowed2, setIsShowed2] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [alertPassword, setAlertPassword] = useState(false);
  const router = useRouter();
  useEffect(() => {
    // Kiểm tra độ dài mật khẩu
    if (password.length < 8 && password.length > 0) {
      setAlertPassword(true);
    } else {
      if (password === confirmPassword) {
        setPasswordsMatch(true);
      }
      setAlertPassword(false);
    }
  }, [password]);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newConfirmPassword = e.target.value;
    // Kiểm tra xem mật khẩu và xác nhận mật khẩu có trùng khớp không
    if (password === newConfirmPassword) {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
    setConfirmPassword(newConfirmPassword);
  };

  //   KHI SUBMIT FORM: kiem tra do dai va chinh xac
  const handleSubmit = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (password === confirmPassword && password.length >= 8) {
      console.log('Đặt lại mật khẩu thành công');
      router.push('/reset-password/success');
    } else {
      if (password.length < 8) {
        console.log('Mật khẩu quá ngắn');
      } else {
        console.log('Mật khẩu không trùng khớp');
      }
      setPasswordsMatch(false);
    }
  };
  return (
    <div className='w-full h-full flex'>
      <div className='flexCenter px-4  w-full  lg:w-1/2 my-[175px]'>
        <div className='max-w-[450px] text-left w-full'>
          <p className='text-neutral-10 text-4xl font-semibold mb-2'>
            Khôi phục mật khẩu
          </p>
          <p className='text-neutral-7 text-base mb-10'>
            Nhập lại mật khẩu để đăng nhập ngay.
          </p>
          <form>
            <label htmlFor='password' className='block mb-4 w-full'>
              <p className=' w-full block font-semibold text-base text-neutral-10 mb-2'>
                Mật khẩu mới
              </p>
              <div className='relative'>
                <input
                  placeholder='Mật khẩu mới'
                  id='password'
                  value={password}
                  onChange={handlePasswordChange}
                  minLength={8}
                  type={isShowed ? 'text' : 'password'}
                  required
                  className='w-full h-12 border rounded border-[#BFBFBF] p-3  placeholder:text-neutral-6 bg-transparent'
                />
                {!isShowed ? (
                  <EyeOutlined
                    width={16}
                    height={16}
                    className='absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer'
                    onClick={() => setIsShowed(!isShowed)}
                  />
                ) : (
                  <EyeInvisibleOutlined
                    width={16}
                    height={16}
                    className='absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer'
                    onClick={() => setIsShowed(!isShowed)}
                  />
                )}
              </div>
            </label>

            <label htmlFor='password2' className='block mb-10 w-full'>
              <p className='w-full block font-semibold text-base text-neutral-10 mb-2'>
                Nhập lại mật khẩu
              </p>
              <div className='relative'>
                <input
                  placeholder='Nhập lại mật khẩu'
                  id='password2'
                  minLength={8}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  type={isShowed2 ? 'text' : 'password'}
                  required
                  className='w-full h-12 border rounded border-[#BFBFBF] p-3  placeholder:text-neutral-6 bg-transparent'
                />
                {!isShowed2 ? (
                  <EyeOutlined
                    width={16}
                    height={16}
                    className='absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer'
                    onClick={() => setIsShowed2(!isShowed2)}
                  />
                ) : (
                  <EyeInvisibleOutlined
                    width={16}
                    height={16}
                    className='absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer'
                    onClick={() => setIsShowed2(!isShowed2)}
                  />
                )}
              </div>
            </label>
            <div className='relative'>
              {alertPassword ? (
                <p className='text-red-600 absolute bottom-14'>
                  Mật khẩu quá ngắn (ít nhất 8 ký tự)
                </p>
              ) : !passwordsMatch ? (
                <p className='text-red-600 absolute bottom-14'>
                  Mật khẩu không trùng khớp
                </p>
              ) : null}

              <ConfigProvider
                theme={{
                  token: {
                    controlHeight: 48,
                  },
                }}
              >
                <Button type='primary' block onClick={(e) => handleSubmit(e)}>
                  <input
                    type='submit'
                    value='Đăng nhập'
                    className='bg-transparent font-semibold text-base text-neutral-1 w-full h-full cursor-pointer'
                  />
                </Button>
              </ConfigProvider>
            </div>
          </form>
        </div>
      </div>
      <div className='hidden lg:block w-1/2 h-full overflow-hidden absolute right-0 rounded-l-2xl shadow-banner'>
        <Image
          src='/images/reset-password.png'
          alt='reset-password'
          fill
          sizes='(min-width: 1024px)  100vw'
          className='object-cover'
        />
      </div>
    </div>
  );
};

export default ResetPasswordPage;
