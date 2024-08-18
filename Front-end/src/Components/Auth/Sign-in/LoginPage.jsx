import { FormProvider, useForm } from 'react-hook-form';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import PATHS from "../../../const/paths";
import { showError, showInfo } from '../../FlashMessage/flashMessageSlice';
import { getProfile, setLoginSuccess } from '../../../store/userSlice';
import TextInput from "../../../Components/TextInput";

export default function SignIn() {
  const methods = useForm();
  const navigate = useNavigate();
  const isLogin = useSelector((state) => !!state.user.refreshToken);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLogin) {
      navigate(PATHS.HOMEPAGE);
    }
  }, [isLogin, navigate]);

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:8888/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const result = await response.json();
      dispatch(setLoginSuccess({ accessToken: result.data.accessToken, refreshToken: result.data.refreshToken }));
      dispatch(getProfile());
      dispatch(showInfo({ message: "Login successfully" }));

      const profileResponse = await fetch('http://localhost:8888/profile', {
        headers: {
          'Authorization': `Bearer ${result.data.accessToken}`
        }
      });

      if (!profileResponse.ok) {
        throw new Error('Failed to fetch profile');
      }

      const profileData = await profileResponse.json();

      if (profileData.data.position === 'Admin') {
        localStorage.setItem('user', JSON.stringify({ email: profileData.data.email, role: 'admin' }));
        navigate('/admin-dashboard');
      } else if (profileData.data.position === 'Manager' || profileData.data.position === 'Member') {
        localStorage.setItem('user', JSON.stringify({ email: profileData.data.email, role: 'user' }));
        navigate('/manager-dashboard');
      }

    } catch (error) {
      const { message } = error;
      dispatch(showError({ message }));
    }
  };

  return (
    <div className="flex min-h-full items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8 bg-white p-10 rounded-lg shadow-lg flex">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-22 w-auto"
              src="/assets/logo_vpf.png"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <Link to={PATHS.SIGN_UP} className="font-medium text-indigo-600 hover:text-indigo-500">
                start your 14-day free trial
              </Link>
            </p>
          </div>
          <FormProvider {...methods}>
            <form className="mt-8 space-y-6" onSubmit={methods.handleSubmit(onSubmit)}>
              <input type="hidden" name="remember" value="true" />
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email-address" className="sr-only">Email address</label>
                  <TextInput
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Email address"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">Password</label>
                  <TextInput
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Password"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link to="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign in
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
        <div className="hidden md:block md:w-1/2 items-center justify-center">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAkCV9vyJzbQILBOr-Nv1jr__bTs7lJS-BO4xf7HND2A&s" alt="Login Illustration" className="max-w-full h-full" />
        </div>
      </div>
    </div>
  );
}