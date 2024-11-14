import {useRouter} from 'next/navigation';
import React, {useState} from 'react';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isError, setisError] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission here, e.g., send data to server
        //
        const loginData = {
            email,
            password
        }
        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:
                    JSON.stringify(loginData),
                credentials: 'include'
            });
            console.log(response);
            if (!response.ok) {
                if (response.status == 401) {
                    setisError(true);
                }
                throw new Error(`Http error ${response.status} with error ${await response.text()}`);

            }
            const data = await response.text();

            // Handle successful login, e.g., redirect to dashboard
            console.log('Login successful:', data);


            router.push("contact-management");

            // Replace with your actual authentication logic and redirection
        } catch (error) {
            console.error('Login failed:', error);
            // Handle login errors, e.g., display error messages
        }

    }


    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                    Email
                </label>
                <input
                    id="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setisError(false)
                    }}
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${isError ? 'border-red-500'
                        : ''}`}
                    placeholder="Enter Email"
                    required
                />
            </div>
            <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setisError(false)
                    }}
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${isError ? 'border-red-500'
                        : ''}`}
                    placeholder="******"
                    required
                />
                {isError ? <p className='text-red-700'>Invalid username or password</p> : <></>}
            </div>
            <div className="flex items-center justify-between">
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Login
                </button>
            </div>
        </form>
    );
}

export default LoginForm;
