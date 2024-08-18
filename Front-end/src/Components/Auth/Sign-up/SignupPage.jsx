import {FormProvider, useForm} from 'react-hook-form';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import PATHS from "../../../const/paths";
import UserService from "../../../../src/services/user"
import {showError, showInfo} from '../../FlashMessage/flashMessageSlice';
import TextInput from "../../../Components/TextInput";

export default function SignUp() {
  const methods = useForm();
  const navigate = useNavigate()
  const isLogin = useSelector((state) => !!state.user.refreshToken)
  const dispatch = useDispatch();

  useEffect( () => {
    if(isLogin) {
      navigate(PATHS.HOMEPAGE)
    }
  }, [isLogin, navigate])

  const onSubmit = async (data) => {
    try {
      if(data.password !== data.passwordConfirm) {
        throw new Error("Passwords do not match")
      }

      // Make a POST request to the register endpoint
      const response = await fetch('http://localhost:8888/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      // Check if the request was successful
      if (!response.ok) {
        throw new Error('Registration failed');
      }

      // Get the result from the response
      const result = await response.json();

      dispatch(showInfo({message: "Register successfully"}))
      navigate(PATHS.SIGN_IN)
    } catch (error) {
      const {message} = error
      dispatch(showError({message}))
    }
  }


  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-22 w-auto"
            src="/assets/logo_vpf.png"
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign up to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <FormProvider {...methods}>
              <form className="space-y-6" onSubmit={methods.handleSubmit(onSubmit)}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2">
                    <TextInput
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="mt-2">
                    <TextInput
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                      Confirm Password
                    </label>
                    <div className="mt-2">
                      <TextInput
                        id="passwordConfirm"
                        name="passwordConfirm"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  {/*<div>*/}
                  {/*  <label htmlFor="season" className="block text-sm font-medium leading-6 text-gray-900">*/}
                  {/*    Season*/}
                  {/*  </label>*/}
                  {/*  <div className="mt-2">*/}
                  {/*    <select*/}
                  {/*      id="season"*/}
                  {/*      name="season" // change this to match the key expected by the backend*/}
                  {/*      required*/}
                  {/*      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"*/}
                  {/*    >*/}
                  {/*      <option value="2022-2023">2022-2023</option>*/}
                  {/*      <option value="2023-2024">2023-2024</option>*/}
                  {/*    </select>*/}
                  {/*  </div>*/}
                  {/*</div>*/}
                  <div>
                    <label htmlFor="season" className="block text-sm font-medium leading-6 text-gray-900">
                      SeaSon
                    </label>
                    <div className="mt-2">
                      <TextInput
                        id="season"
                        name="season"
                        type="text"
                        autoComplete="current-password"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign up
                  </button>
                </div>
              </form>
            </FormProvider>

          </div>

        </div>
      </div>
    </>
  )
}