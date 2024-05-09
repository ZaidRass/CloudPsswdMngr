import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from '@nextui-org/react';
import { EyeFilledIcon } from '../components/EyeFilledIcon';
import { EyeSlashFilledIcon } from '../components/EyeSlashFilledIcon';
import { MailIcon } from '../components/MailIcon';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import axios from 'axios';

export default function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isRegister, setIsRegister] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [username, setUsername] = React.useState('');

  const navigate = useNavigate();

  const handleSwitchForm = () => {
    setIsRegister(!isRegister);
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/login', { email, password }, { withCredentials: true });
      console.log('Login response:', response);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/register',
        { username, email, password, confirmPassword },
        { withCredentials: true }
      );
      console.log('Register response:', response);
    } catch (error) {
      console.error('Register error:', error);
    }
  };

  return (
    <>
      <Button onPress={onOpen} color='primary'>
        Open Modal
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onClose} placement='top-center'>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className='flex flex-col gap-1'>{isRegister ? 'Register' : 'Log in'}</ModalHeader>
              <ModalBody>
                {isRegister && (
                  <Input
                    radius='lg'
                    type='text'
                    label='Username'
                    className='max-w'
                    labelPlacement='inside'
                    isRequired={true}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                )}
                <Input
                  radius='lg'
                  type='email'
                  label='Email'
                  className='max-w'
                  labelPlacement='inside'
                  isRequired={true}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  endContent={<MailIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />}
                />
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
                  className='max-w'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {isRegister && (
                  <Input
                    radius='lg'
                    label='Confirm Password'
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
                    className='max-w'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                )}
                <div className='flex py-2 px-1 justify-between'>
                  <Checkbox
                    classNames={{
                      label: 'text-small'
                    }}
                  >
                    Remember me
                  </Checkbox>
                  <Link color='primary' href='#' size='sm'>
                    Forgot password?
                  </Link>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='flat' onPress={onClose}>
                  Close
                </Button>
                <Button color='primary' onPress={isRegister ? handleRegister : handleLogin}>
                  {isRegister ? 'Register' : 'Sign in'}
                </Button>
              </ModalFooter>
              <div className='flex justify-center mt-4'>
                <Button color='primary' variant='flat' onPress={handleSwitchForm} className='max-w' style={{ margin: 10, padding: 10 }}>
                  {isRegister ? 'Have an account?' : "Don't have an account?"}
                </Button>
              </div>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

