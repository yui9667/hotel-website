import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
const Footer = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const toggleBtn = () => {
    if (!isOpen) {
      navigate('/illustration');
    }
  };
  return (
    <div
      style={{ background: 'var(--main-color)' }}
      className='flex flex-col justify-center items-center py-3 gap-2 overflow-hidden mt-40'
    >
      <p onClick={toggleBtn} className='text-blue-100 hover:underline'>
        Illustrations
      </p>
      <p className='text-blue-100 '>Copyright ©2025 All rights reserved.</p>
    </div>
  );
};

export default Footer;
