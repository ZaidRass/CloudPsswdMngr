import { Input } from '@nextui-org/react';
import axios from 'axios';
import React, { useEffect } from 'react';
import { EyeFilledIcon } from '../components/EyeFilledIcon';
import { EyeSlashFilledIcon } from '../components/EyeSlashFilledIcon';
import { MailIcon } from '../components/MailIcon';
import { useHistory } from 'react-router-dom'; // Import useHistory hook


function Login() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const history = useHistory(); // Initialize useHistory hook

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/login', { email, password }, { withCredentials: true });
      console.log('Login response:', response);
      history.push('/home');

    } catch (error) {
      console.error('Login error:', error);


      // Handle error, e.g., show an error message
    }
  };

  return (
    <>
      <div className='w-full flex flex-row flex-wrap gap-4'>
        <Input
          radius='lg'
          type='email'
          label='Email'
          className='max-w-[220px]'
          labelPlacement='inside'
          isRequired={true}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          endContent={<MailIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />}
        />
      </div>

      <div className='w-full flex flex-row flex-wrap gap-4'>
        <Input
          radius='lg'
          label='Password'
          endContent={
            <button className='focus:outline-none' type='button' onClick={toggleVisibility}>
              {isVisible ? (
                <EyeSlashFilledIcon className='text-2xl text-default-400 pointer-events-none' />
              ) : (
                <EyeFilledIcon className='text-2xl text-default-400 pointer-events-none' />
              )}
            </button>
          }
          type={isVisible ? 'text' : 'password'}
          isRequired={true}
          labelPlacement='inside'
          className='max-w-[220px]'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className='w-full flex justify-center'>
        <button className='bg-primary-500 text-white px-4 py-2 rounded-lg mt-4' onClick={handleLogin}>
          Login
        </button>
      </div>
    </>
  );
}

export default Login;
