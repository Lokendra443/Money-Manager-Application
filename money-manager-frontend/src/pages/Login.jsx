import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import Input from '../components/Input';
import { validateEmail } from '../util/validation';
import { axiosConfig } from '../util/axiosConfig';
import { API_ENDPOINTS } from '../util/apiEndpoints';
import { AppContext } from '../context/AppContext';
import { LoaderCircle } from 'lucide-react';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const {setUser} = useContext(AppContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    //basic validation
    if (!validateEmail(email)) {
      setError("Please enter valid email address");
      setIsLoading(false);
      return;
    }

    if (!password.trim()) {
      setError("Please enter your password");
      setIsLoading(false);
      return;
    }
    setError("");

    // login api call

    try {
      const response = await axiosConfig.post(API_ENDPOINTS.LOGIN, {
        email, 
        password
      })
      const {token, user} = response.data;
      if (token) {
        localStorage.setItem("token", token);
        setUser(user);
        navigate("/home");
      }
      
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        console.error("Something went wrong", error);
        setError(error.message);
      }
      
    } finally {
      setIsLoading(false);
    }

  }


  return (
    <div className='h-screen w-full relative flex items-center justify-center overflow-hidden'>
      {/* Backgound image with blur */}
      <img src={assets.loginBg} alt="Background" className='absolute inset-0 w-full h-full object-cover filter blur-sm'/>

      <div className='relative z-10 w-full max-w-lg px-6'>
        <div className='bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto'>
          <h3 className="text-2xl font-semibold text-black text-center mb-2">
            Welcome Back
          </h3>
          <p className="text-sm text-slate-700 text-center mb-8">
            Please enter your details to login 
          </p>

          <form onSubmit={handleSubmit} className='space-y-4'>

            <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email Address"
                placeholder={"Enter your email"}
                type="email"
              />

              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                placeholder={"Enter your password"}
                type="password"
                />

            {error && (
              <p className='text-red-800 text-sm text-center bg-red-50 p-2 rounded'>
                {error}
              </p>
            )}

            <button disabled={isLoading} className={`bg-primary text-white hover:bg-primary-dark w-full py-2  font-medium rounded flex items-center justify-center gap-2 ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`} type='submit'>
              {isLoading ? (
                <>
                  <LoaderCircle className='animate-spin w-5 h-5'/>
                  Logging in...
                </>
              ) : (
                "LOGIN"
              )}
            </button>
            <p className='text-sm text-slate-800 text-center mt-6'>
              Don't have an account?
              <Link to={"/register"} className='font-medium text-primary underline hover:text-primary-dark transition-colors'>Register</Link>
            </p>

          </form>

        </div>

      </div>
      
    </div>
  )
}

export default Login
