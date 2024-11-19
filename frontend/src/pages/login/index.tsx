import React from 'react';
import * as Label from '@radix-ui/react-label';

const Login: React.FC = () => {
  return (
    
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <div className="mb-4">
          <Label.Root htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </Label.Root>
          <input
            id="username"
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div className="mb-4">
          <Label.Root htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </Label.Root>
          <input
            id="password"
            type="password"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* <div className="flex items-center justify-between mb-4">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Remember me
          </label>
        </div> */}

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

