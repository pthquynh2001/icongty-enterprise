'use client';
import { useState, useRef, useEffect, ChangeEvent } from 'react';
import { Button, ConfigProvider, Modal, Select, Space, Tag } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { User } from 'next-auth';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { PlusOutlined } from '@ant-design/icons';
import type { SelectProps } from 'antd';

type TagRender = SelectProps['tagRender'];

const options: SelectProps['options'] = [
  { value: 'en', label: 'English', icon: '/icons/flag-en.svg' },
  { value: 'vi', label: 'Vietnamese', icon: '/icons/flag-vi.svg' },
];

const tagRender: TagRender = (props) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={'rgba(47, 97, 230, 0.10)'}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      closeIcon={<CloseOutlined style={{ color: '#2f61e6' }} />}
      style={{
        marginLeft: 4,
        color: '#2f61e6',
        display: 'flex',
        gap: 4,
        alignItems: 'center',
      }}
    >
      <Image
        src={`/icons/flag-${value}.svg`}
        alt='icon'
        width={20}
        height={20}
      />
      {label}
    </Tag>
  );
};

const AddCompanyModal = ({ user }: { user: User }) => {
  const { update } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);
  const userId = user.id;
  //
  const [corpName, setCorpName] = useState('');
  const [taxCode, setTaxCode] = useState('');
  const [lang, setLang] = useState('');
  const [selectedLangs, setSelectedLangs] = useState<string[]>([]);
  const [errInput, setErrInput] = useState(0);

  // modal styles
  const modalStyles = {
    header: {
      paddingBottom: 24,
      borderBottom: '1px solid #BFBFBF',
      marginBottom: 32,
    },

    mask: {
      backdropFilter: 'blur(10px)',
    },

    content: {
      boxShadow: '0 0 30px #999',
    },
  };

  const handleLangSelect = (value: string[]) => {
    setSelectedLangs(value);
    if (value.length > 0) {
      setErrMessage('');
    }
    console.log(`selected ${selectedLangs}`);
  };

  // check if email existed
  const handleSubmit = async () => {
    if (!corpName || !taxCode || selectedLangs.length === 0) {
      setErrMessage('Please fill in all the fields');
      setErrInput(1);
      setLoading(false);
      return;
    }
    setSuccess(true);
  };

  // handle clicking on confirm/ok button
  const handleOk = () => {
    setLoading(true);
    handleSubmit();
  };
  // reset form after modal is closed
  useEffect(() => {
    if (!isModalOpen) {
      setTaxCode('');
      setCorpName('');
      setSuccess(false);
      setLoading(false);
      setErrInput(0);
      setErrMessage('');
    }
  }, [isModalOpen]);

  return (
    <>
      <PlusOutlined
        className=' text-[22px] p-1 cursor-pointer'
        style={{ color: '#2f61e6' }}
        onClick={() => setIsModalOpen(true)}
      />
      <p className='text-base text-neutral-8 mt-2 mb-4'>Add a new Company</p>
      <Button type='primary' size='large' onClick={() => setIsModalOpen(true)}>
        <p className='font-semibold px-4'>Add Company</p>
      </Button>
      <Modal
        title={
          <h3>
            <PlusOutlined style={{ color: '#2f61e6' }} /> New Company
          </h3>
        }
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        closeIcon={null}
        styles={modalStyles}
        width={566}
        classNames={{
          content: '!rounded-2xl !pt-8 !pb-12 !px-[60px]',
        }}
        footer={null}
      >
        <CloseOutlined
          className='absolute top-8 right-12 text-[20px] text-neutral-7 cursor-pointer'
          onClick={() => setIsModalOpen(false)}
        />
        {success ? (
          <div className='flexCenter flex-col'>
            <Image
              src='/icons/success.svg'
              width={85}
              height={85}
              alt='success'
            />
            <p className='text-base my-8 font-semibold'>
              Tao cong ty thanh cong
            </p>
            <Button
              type='primary'
              size='large'
              onClick={() => setIsModalOpen(false)}
            >
              Đồng ý
            </Button>
          </div>
        ) : (
          <form ref={formRef}>
            <div className='mb-6'>
              <label
                htmlFor='corpName'
                className='text-base font-semibold text-neutral-10 mb-2 block'
              >
                Corporate Name
              </label>
              <input
                required
                id='corpName'
                className={`w-full h-12 py-3 pl-3 pr-9 outline-none border border-neutral-6  rounded-[4px] placeholder:text-neutral-6 ${
                  errInput === 1 && 'placeholder-shown:border-rose-600'
                }`}
                placeholder='Fill Your Corporate Name'
                value={corpName}
                onChange={(e) => {
                  setCorpName(e.target.value);
                  setErrMessage('');
                }}
              />
            </div>
            <div className='mb-6'>
              <label
                htmlFor='taxCode'
                className='text-base font-semibold text-neutral-10 mb-2 block'
              >
                Tax Code
              </label>
              <input
                required
                id='taxCode'
                className={`w-full h-12 py-3 pl-3 pr-9 outline-none border border-neutral-6  rounded-[4px] placeholder:text-neutral-6 ${
                  errInput === 1 && 'placeholder-shown:border-rose-600'
                }`}
                placeholder='Fill Your Tax Code'
                value={taxCode}
                onChange={(e) => {
                  setTaxCode(e.target.value);
                  setErrMessage('');
                }}
              />
            </div>
            <div className='mb-4'>
              <label className='text-base font-semibold text-neutral-10 mb-2 block'>
                Languages
              </label>
              <ConfigProvider
                theme={{
                  components: {
                    Select: {
                      multipleItemHeight: 42,
                    },
                  },
                  token: {
                    colorBorder:
                      errInput === 1 && selectedLangs.length === 0
                        ? '#e5395f'
                        : '#bfbfbf',
                  },
                }}
              >
                <Select
                  mode='multiple'
                  style={{ width: '100%' }}
                  allowClear
                  placeholder={
                    <p className='text-[#cbcbcb]'>Select languages</p>
                  }
                  onChange={handleLangSelect}
                  options={options}
                  tagRender={tagRender}
                  optionRender={(option) => {
                    return (
                      <div className='flexStart gap-2'>
                        <Image
                          src={option.data.icon}
                          alt={option.data.label}
                          width={20}
                          height={20}
                        />
                        {option.data.label}
                      </div>
                    );
                  }}
                />
              </ConfigProvider>
            </div>
            <p
              className={`mb-4 text-red-600 leading-5 ${
                errMessage ? 'min-h-5' : 'h-5'
              }`}
            >
              {errMessage}
            </p>
            <div className='flexCenter'>
              <div className='flex gap-6 w-full'>
                <Button
                  type='primary'
                  ghost
                  size='large'
                  onClick={() => setIsModalOpen(false)}
                  block
                >
                  Cancel
                </Button>
                <Button
                  key='submit'
                  type='primary'
                  loading={loading}
                  size='large'
                  onClick={handleOk}
                  block
                >
                  Create
                </Button>
              </div>
            </div>
          </form>
        )}
      </Modal>
    </>
  );
};

export default AddCompanyModal;
