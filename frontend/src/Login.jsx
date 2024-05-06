import React from 'react';
import { Input } from '@nextui-org/react';
function App() {
  return (
    <div className='w-full flex flex-row flex-wrap gap-4'>
      <Input
        key={"lg"}
        radius={"lg"}
        type='email'
        label='Email'
        placeholder='Enter your email'
        defaultValue='junior@nextui.org'
        className='max-w-[220px]'
      />
    </div>
  );
}

export default App;
