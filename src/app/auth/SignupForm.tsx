import {useState} from "react";


interface SignupFormProps {
    onSuccess?: () => void
}

export default function SignupForm({onSuccess}: SignupFormProps) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
       e.preventDefault()
        const signupData = {
            firstName,
            lastName,
            username,
            email,
            password,
        }

        try {
            const response = await fetch('http://localhost:8080/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:
                    JSON.stringify(signupData),
                credentials: 'include'
            });
            if (!response.ok) {
            } else {
              onSuccess();
            }
        } catch (error) {
            console.error('Login failed:', error);
            // Handle login errors, e.g., display error messages
        }


    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                    First Name
                </label>
                <input
                    type="text"
                    id="firstName"

                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700
 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter
 Name"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                    First Name
                </label>
                <input
                    type="text"
                    id="firstName"

                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700
 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter
 Name"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                    User name
                </label>
                <input
                    type="text"
                    id="firstName"

                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700
 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter
 Username"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                    Email
                </label>
                <input

                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3
 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                    onChange={(e) => setPassword(e.target.value)}
                    className="shadow appearance-none border rounded w-full
 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="******"
                    required
                />
            </div>

            <div className="flex items-center justify-between">
                <button

                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Sign Up
                </button>
            </div>
        </form>
    );
}
