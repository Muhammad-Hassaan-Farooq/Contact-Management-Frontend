"use client"
import { useState } from 'react';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';


export default function LoginPage() {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">{isLoginMode ? 'Login' : 'Sign Up'}</h2>
        {isLoginMode ? <LoginForm /> : <SignupForm onSuccess = {()=>setIsLoginMode(true)}/>}
        <div className="flex items-center justify-between mt-4">
          <a href="#" onClick={toggleMode} className="text-blue-500 hover:underline">
            {isLoginMode ? 'Sign Up' : 'Login'}
          </a>
        </div>
      </div>
    </div>
  );
}
