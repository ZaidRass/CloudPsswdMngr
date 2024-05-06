import React, { useState } from 'react';
import axios from 'axios';
import { AiOutlineClose, AiOutlineUser, AiOutlineLock } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const Login = ({ theme }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleAction = async () => {
    setMessage('');
    try {
      if (!email || !password) {
        setMessage('Email and password are required');
        return;
      }

      const loginResponse = await axios.post(
        'http://localhost:3000/api/v1/login',
        { email, password },
        { withCredentials: true }
      );

      if (loginResponse.data && loginResponse.data.success) {
        navigate('/UserPage');
        setShowLogin(false);
      } else {
        setMessage('Invalid email or password');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setMessage(`Login failed: ${error.message}`);
    }
  };

  return (
    <div>
      <button onClick={() => setShowLogin(!showLogin)} className={`bg-${theme.colors.primary} text-${theme.colors.text} py-2 px-4 rounded-full mt-4`}>
        Login
      </button>

      {showLogin && (
        <div className={`fixed top-0 left-0 w-full h-screen bg-${theme.colors.background}/80 z-20 flex justify-center items-center`}>
          <div className='flex justify-center items-center h-full'>
            <div className='bg-white p-8 rounded-lg shadow-lg w-[400px] relative'>
              <AiOutlineClose onClick={() => setShowLogin(!showLogin)} size={30} className='absolute top-4 right-4 cursor-pointer' />
              <h2 className='text-2xl mb-4'>Welcome back to <span className='font-bold'>Help Desk</span></h2>

              <div className={`flex items-center bg-${theme.colors.background} rounded-full mb-4 p-2`}>
                <AiOutlineUser size={25} />
                <input
                  className={`bg-transparent p-2 w-full focus:outline-none ml-2 text-${theme.colors.text}`}
                  type='text'
                  placeholder='Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className={`flex items-center bg-${theme.colors.background} rounded-full mb-4 p-2`}>
                <AiOutlineLock size={25} />
                <input
                  className={`bg-transparent p-2 w-full focus:outline-none ml-2 text-${theme.colors.text}`}
                  type='password'
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button onClick={handleAction} className={`bg-${theme.colors.primary} text-${theme.colors.text} py-2 px-4 rounded-full w-full mb-4`}>
                Login
              </button>

              <p className={`text-${theme.colors.primary} text-center`}>{message}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
