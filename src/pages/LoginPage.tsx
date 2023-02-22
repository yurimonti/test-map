import React, { useContext, useState } from 'react';
import { IonButton, useIonAlert } from '@ionic/react';
import { UserCredentials } from '../utility/types';
import { useHistory } from 'react-router';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import MyHeader from '../components/MyHeader';
import { loginUser } from '../api/touristApi';
import { UserContext } from '../components/MyUserContext';
import { HttpResponse } from '@capacitor/core';

interface Tokens {
  access_token: string,
  refresh_token: string
}

interface LoginData {
  username: string,
  password: string
}

const LoginPage: React.FC = () => {
  const userContext = useContext(UserContext);
  const [userCredentials, setUserCredentials] = useState<UserCredentials>({ username: "", password: "" });
  const history = useHistory();
  const [presentAlert] = useIonAlert();

  const loginSubmit = (values: LoginData) => {
    loginUser({ username: values.username, password: values.password })
      .then((res: HttpResponse) => { return res.data })
      .then((tokens: Tokens) => {
        console.log(tokens);
        localStorage.setItem("access_token", tokens.access_token);
        localStorage.setItem("refresh_token", tokens.refresh_token);
        userContext.setUserInfo(tokens.access_token);
        history.replace("/map");
      })
      .catch(err => console.log(err));
  }

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Inserire Username'),
      password: Yup.string().min(8, 'Deve avere almeno 8 caratteri').required('Richiesta'),
    }),
    onSubmit: loginSubmit
  });

  function login() {
    loginUser({ username: formik.values.username, password: formik.values.password })
      .then((res: HttpResponse) => { return res.data })
      .then((tokens: Tokens) => {
        console.log(tokens);
        localStorage.setItem("access_token", tokens.access_token);
        localStorage.setItem("refresh_token", tokens.refresh_token);
        userContext.setUserInfo(tokens.access_token);
        history.replace("/map");
      })
      .catch(err => console.log(err))
  }
  return (
    <MyHeader title='LogIn' backButton>
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            {/* Add Icon Here */}
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign Up new account
              </a>
            </p>
          </div>
          <form className="mt-8 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  /* onChange={(e) => {
                    setUserCredentials((prev) => {
                      return { ...prev, username: e.target.value }
                    })
                  }} */
                  autoComplete="username"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Username"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  /* onChange={(e) => {
                    setUserCredentials((prev) => {
                      return { ...prev, password: e.target.value }
                    })
                  }} */
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={() => {
                  login();
                }}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  {/* <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" /> */}
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </MyHeader>
  )
}
export default LoginPage;