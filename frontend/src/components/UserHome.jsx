import React from 'react';

const UserHome = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className='max-w-[1640px] mx-auto px-4 py-12 text-center bg-white rounded-lg p-8'>
        <h1 className="text-black font-bold text-4xl mb-8">
          Welcome to Your Password Manager
        </h1>
        <p className="text-gray-800 text-xl mb-4">
          We're here to assist you with all your inquiries, concerns, and feedback.
        </p>
        <p className="text-gray-800 text-lg mb-4">
          Navigate through various categories to find answers, create tickets, or get in touch with our support team.
        </p>
      </div>
    </div>
  );
};

export default UserHome;
