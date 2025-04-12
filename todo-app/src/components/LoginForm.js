import React, { useState } from 'react';
import { login } from '../services/authService'; // Import login API function
import { useNavigate } from 'react-router-dom'; // Hook to programmatically navigate to another route

const LoginForm = () => {
  // State to manage form input values
  const [form, setForm] = useState({ username: '', password: '' });

  // State to store login success or error message
  const [message, setMessage] = useState('');

  // React Router's navigate hook to redirect user after login
  const navigate = useNavigate();

  // Update form state on input change
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default page reload

    try {
      // Attempt login with entered credentials
      const res = await login(form);

      // Store the token in localStorage if successful
      localStorage.setItem('token', res.data.token);

      // Show success message and redirect to task page
      setMessage('Login successful!');
      navigate('/tasks');
    } catch (err) {
      // If login fails, show an error message
      setMessage(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-violet-900 to-purple-800">
      {/* Login box container */}
      <div className="w-full max-w-md p-8 bg-white/10 backdrop-blur-md rounded-xl shadow-xl text-white">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-100">Login</h2>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Username input */}
          <input
            name="username"
            onChange={handleChange}
            value={form.username}
            placeholder="Username"
            required
            className="bg-transparent text-white border-b-2 border-white/40 rounded px-4 py-2 placeholder:text-indigo-200 focus:outline-none focus:border-violet-400"
          />

          {/* Password input */}
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={form.password}
            placeholder="Password"
            required
            className="bg-transparent text-white border-b-2 border-white/40 rounded px-4 py-2 placeholder:text-indigo-200 focus:outline-none focus:border-violet-400"
          />

          {/* Login button */}
          <button
            type="submit"
            className="bg-indigo-700 hover:bg-indigo-600 text-white font-semibold py-2 rounded transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Feedback message: success or error */}
        {message && (
          <p
            className={`mt-4 text-sm text-center ${
              message.includes('success') ? 'text-green-200' : 'text-red-300'
            }`}
          >
            {message}
          </p>
        )}

        {/* Link to registration page */}
        <p className="mt-6 text-sm text-center text-indigo-200">
          Don't have an account?{' '}
          <a
            href="/register"
            className="text-violet-400 hover:underline font-medium"
          >
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
