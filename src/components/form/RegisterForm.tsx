'use client';
import {
  useState,
  ChangeEvent,
  useEffect,
  FormEvent,
  useRef,
  use,
  MouseEvent,
} from 'react';
import Link from 'next/link';
import { Button, ConfigProvider } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [isShowed, setIsShowed] = useState(false);
  const [isShowed2, setIsShowed2] = useState(false);
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [alertPassword, setAlertPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [isValidUsername, setIsValidUsername] = useState(true);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  // START: Handle username change
  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
    // Kiểm tra điều kiện cho username
    const isValid = validateUsername(newUsername);
    setIsValidUsername(isValid);
  };

  // Điều kiện: 3-15 ký tự và chỉ chấp nhận ký tự chữ cái, số và dấu gạch dưới
  const validateUsername = (value: string): boolean => {
    const regex = /^[a-zA-Z0-9_]{3,15}$/;
    return regex.test(value);
  };
  // END: Handle username change

  // START: Handle password change
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
  }, [password, confirmPassword]);

  const handlePasswordInput = (e: ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
  };
  const handleConfirmPassword = (e: ChangeEvent<HTMLInputElement>) => {
    const newConfirmPassword = e.target.value;
    // Kiểm tra xem mật khẩu và xác nhận mật khẩu có trùng khớp không
    if (password === newConfirmPassword) {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
    setConfirmPassword(newConfirmPassword);
  };

  // END: Handle password change

  // START: KHI SUBMIT FORM: kiem tra do dai va chinh xac
  const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setLoading(true);
    if (isValidUsername && username.length > 0) {
      if (password === confirmPassword && password.length >= 8) {
        try {
          const resUserExists = await axios.post('/api/userExists', {
            email,
            username,
          });
          const { user } = await resUserExists.data;
          if (user) {
            console.log('Người dùng đã tồn tại');
            setLoading(false);
            return;
          }
          const res = await axios.post('/api/register', {
            firstName,
            lastName,
            username,
            email,
            password,
          });

          if (res.status == 201) {
            console.log('Đăng ký thành công');
            setFirstName('');
            setLastName('');
            setUsername('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setLoading(false);
            formRef.current?.reset();
            router.push('/register/pending');
          } else {
            console.log('Đăng ký thất bại');
            setLoading(false);
          }
        } catch (error) {
          console.error('Error during register', error);
        }
      } else {
        if (password.length < 8) {
          console.log('Mật khẩu quá ngắn');
        } else {
          console.log('Mật khẩu không trùng khớp');
        }
        setPasswordsMatch(false);
        setLoading(false);
      }
    } else {
      console.log('Username không hợp lệ');
      setIsValidUsername(false);
      setLoading(false);
    }
  };
  // END: KHI SUBMIT FORM
  return (
    <div className='flexCenter px-4 w-full  lg:w-1/2 my-[175px]'>
      <div className='flex-col max-w-[450px]  w-full'>
        <p className='text-neutral-10 text-4xl font-semibold mt-9 mb-6'>
          Đăng ký
        </p>
        <p className='text-neutral-7 text-base mb-10'>
          Tạo tài khoản để tìm cơ hội mới cho doanh nghiệp.
        </p>
        {/* START: Register form*/}
        <form ref={formRef}>
          <div className='grid grid-cols-2 gap-6'>
            <label htmlFor='fName' className='mb-4 w-full block'>
              <p className='w-full block font-semibold text-base text-neutral-10 mb-2'>
                Tên
              </p>
              <input
                placeholder='Nhập tên của bạn'
                id='fName'
                type='text'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className='w-full h-12 border rounded border-[#BFBFBF] p-3  placeholder:text-neutral-6 bg-transparent'
              />
            </label>

            <label htmlFor='lName' className='mb-4 w-full block'>
              <p className='w-full block font-semibold text-base text-neutral-10 mb-2'>
                Họ
              </p>
              <input
                placeholder='Nhập họ của bạn'
                id='lName'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type='text'
                required
                className='w-full h-12 border rounded border-[#BFBFBF] p-3  placeholder:text-neutral-6 bg-transparent'
              />
            </label>
          </div>

          <label htmlFor='username' className='mb-4 w-full block relative'>
            <p className='w-full block font-semibold text-base text-neutral-10 mb-2'>
              Username
            </p>
            <div className='relative'>
              <input
                placeholder='Nhập username'
                id='username'
                value={username}
                onChange={handleUsernameChange}
                minLength={3}
                maxLength={15}
                type='text'
                required
                className='w-full h-12 border rounded border-[#BFBFBF] p-3  placeholder:text-neutral-6 bg-transparent'
              />
            </div>
            {!isValidUsername && (
              <p className='text-red-600 absolute top-0 right-0'>
                3-15 ký tự, chỉ chấp nhận A-Z, a-z, 0-9 và _
              </p>
            )}
          </label>

          <label htmlFor='email' className='mb-4 w-full block'>
            <p className='w-full block font-semibold text-base text-neutral-10 mb-2'>
              Email
            </p>
            <input
              placeholder='Nhập email của bạn'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id='email'
              type='email'
              required
              className='w-full h-12 border rounded border-[#BFBFBF] p-3  placeholder:text-neutral-6 bg-transparent'
            />
          </label>
          <label htmlFor='password' className='block mb-4 w-full'>
            <p className=' w-full block font-semibold text-base text-neutral-10 mb-2'>
              Mật khẩu
            </p>
            <div className='relative'>
              <input
                placeholder='Mật khẩu mới'
                id='password'
                value={password}
                onChange={handlePasswordInput}
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

          <label htmlFor='password2' className='block w-full'>
            <p className='w-full block font-semibold text-base text-neutral-10 mb-2'>
              Nhập lại mật khẩu
            </p>
            <div className='relative'>
              <input
                placeholder='Nhập lại mật khẩu'
                id='password2'
                minLength={8}
                value={confirmPassword}
                onChange={handleConfirmPassword}
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
          {/* ALERT */}
          <div className='relative h-10'>
            {alertPassword ? (
              <p className='text-red-600 absolute top-2'>
                Mật khẩu quá ngắn (ít nhất 8 ký tự)
              </p>
            ) : !passwordsMatch ? (
              <p className='text-red-600 absolute top-2'>
                Mật khẩu không trùng khớp
              </p>
            ) : null}
          </div>
          {/* Submit btn*/}
          <ConfigProvider
            theme={{
              token: {
                controlHeight: 48,
              },
            }}
          >
            <Button
              type='primary'
              block
              loading={loading}
              onClick={(e: React.MouseEvent<HTMLElement>) => handleSubmit(e)}
            >
              <span className='bg-transparent font-semibold text-base text-neutral-1  cursor-pointer'>
                Đăng ký
              </span>
            </Button>
          </ConfigProvider>
        </form>
        {/* END: Register form*/}
        <div className='flexCenter mt-4 gap-2'>
          <p className='text-[#3D434C] text-xs'>
            Bạn là thành viên của Icongty?
          </p>
          <Link
            scroll={false}
            href={'/login'}
            className='text-royalBlue font-semibold hover:text-royalBlue-70'
          >
            Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
