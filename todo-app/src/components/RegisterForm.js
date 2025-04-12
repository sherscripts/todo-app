import React, { useState } from 'react';
import { register } from '../services/authService'; // Import register function from auth service
import { useNavigate } from 'react-router-dom'; // Hook for navigating programmatically

const RegisterForm = () => {
  // State to hold form values
  const [form, setForm] = useState({ username: '', password: '', confirmPassword: '' });

  // State to display messages (success or error)
  const [message, setMessage] = useState('');

  // Hook for routing after successful registration
  const navigate = useNavigate();

  // Function to update state when input fields change
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Function to validate password strength
  const validatePassword = (password) => {
    // Password must be at least 8 characters, contain both uppercase and lowercase letters, a number, and a special character
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(password);
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if password and confirmPassword match
    if (form.password !== form.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    // Validate password strength
    if (!validatePassword(form.password)) {
      setMessage('Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.');
      return;
    }

    try {
      // Attempt to register user with entered credentials
      await register({ username: form.username, password: form.password });

      // Show success message
      setMessage('Registered successfully!');

      // Redirect to login page after a short delay
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      // Show error message if registration fails
      setMessage(err.response?.data?.message || 'Registration failed');
    }
  };

  // Navigate to login page manually (used in the bottom button)
  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-violet-900 to-purple-800">
      {/* Form wrapper card */}
      <div className="w-full max-w-md p-8 bg-white/10 backdrop-blur-md rounded-xl shadow-xl text-white">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-100">Register</h2>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Username input field */}
          <input
            name="username"
            onChange={handleChange}
            value={form.username}
            placeholder="Username"
            required
            className="bg-transparent text-white border-b-2 border-white/40 rounded px-4 py-2 placeholder:text-indigo-200 focus:outline-none focus:border-violet-400"
          />

          {/* Password input field */}
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={form.password}
            placeholder="Password"
            required
            className="bg-transparent text-white border-b-2 border-white/40 rounded px-4 py-2 placeholder:text-indigo-200 focus:outline-none focus:border-violet-400"
          />

          {/* Confirm Password input field */}
          <input
            type="password"
            name="confirmPassword"
            onChange={handleChange}
            value={form.confirmPassword}
            placeholder="Confirm Password"
            required
            className="bg-transparent text-white border-b-2 border-white/40 rounded px-4 py-2 placeholder:text-indigo-200 focus:outline-none focus:border-violet-400"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-indigo-700 hover:bg-indigo-600 text-white font-semibold py-2 rounded transition duration-300"
          >
            Register
          </button>
        </form>

        {/* Message feedback for success or error */}
        {message && (
          <p
            className={`mt-4 text-sm text-center ${message.includes('success') ? 'text-green-200' : 'text-red-300'}`}
          >
            {message}
          </p>
        )}

        {/* Already have an account section */}
        <p className="mt-6 text-sm text-center text-indigo-200">
          Already have an account?{' '}
          <button
            onClick={handleLoginRedirect}
            className="text-violet-400 hover:underline font-medium"
          >
            Log in here
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
