import React, { FC, FormEvent, ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTransition, animated } from 'react-spring';
import '../styles/LoginSignup.scss';

const Login: FC<{ history: any }> = ({ history }) => {
  // login form state hooks
  const [loginSuccess, setLoginSuccess] = useState<boolean>(true);
  interface LoginState {
    loginEmail: string;
    loginPassword: string;
  }
  const [loginState, setLoginState] = useState<LoginState>({
    loginEmail: '',
    loginPassword: '',
  });

  // signup form state hooks
  const [signupEmailValid, setSignupEmailValid] = useState<boolean>(true);
  const [signupEmailAvailable, setSignupEmailAvailable] = useState<boolean>(
    true,
  );
  const [signupPasswordValid, setSignupPasswordValid] = useState<boolean>(true);
  const [signupPasswordsMatch, setSignupPasswordsMatch] = useState<boolean>(
    true,
  );
  interface SignupState {
    signupEmail: string;
    signupPassword: string;
    signupPassword2: string;
  }
  const [signupState, setSignupState] = useState<SignupState>({
    signupEmail: '',
    signupPassword: '',
    signupPassword2: '',
  });

  // handles login form submission
  const handleLogin = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    console.log('handleLogin -> loginState: ', loginState);
    const res = await fetch('http://localhost:5000/auth/login', {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify({
        email: loginState.loginEmail,
        password: loginState.loginPassword,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    console.log('headers-->', res.headers);
    console.log('data', data);
    
    if (res.status === 200) {
      setLoginSuccess(true);
      console.log('raw result form login: ', res);
      history.push('/');
    } else {
      setLoginSuccess(false);
    }
  };

  // updates login state as user types
  const updateLogin = (event: ChangeEvent<HTMLInputElement>) => {
    setLoginState({
      ...loginState,
      [event.target.name]: event.target.value,
    });
  };

  const handleSignup = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className='login-container'>
      <h1 className='login-form-heading'>Hop back in.</h1>
      <form className='login-form' onSubmit={handleLogin}>
        <label className='login-input-label' htmlFor='loginEmail'>
          email
        </label>
        <input
          type='email'
          autoComplete='username'
          className='login-input'
          id='loginEmail'
          name='loginEmail'
          value={loginState.loginEmail}
          onChange={updateLogin}
        />
        <label className='login-input-label' htmlFor='loginPassword'>
          password
        </label>
        <input
          type='password'
          autoComplete='current-password'
          className='login-input'
          id='loginPassword'
          name='loginPassword'
          value={loginState.loginPassword}
          onChange={updateLogin}
        />
        <button className='login-button'>log in</button>
        {!loginSuccess && (
          <div className='invalid-login'>Incorrect login credentials.</div>
        )}
        <Link to='/login/resetpassword' className='login-forgot-password-link'>
          Forgot Password?
        </Link>
      </form>

      <h1 className='login-form-heading'>Join the conversation.</h1>
      <form className='login-form' onSubmit={handleSignup}>
        <Link to='/signup' className='login-button signup-next'>
          sign up ->
        </Link>
      </form>
    </div>
  );
};

export default Login;
