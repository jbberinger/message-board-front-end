import React, { FC, FormEvent, ChangeEvent, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useTransition, animated } from 'react-spring';
import '../styles/LoginSignup.scss';
import facebookLogo from '../assets/icons/facebook.svg';
import googleLogo from '../assets/icons/google.svg';
import twitterLogo from '../assets/icons/twitter.svg';

const Signup: FC = () => {
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
  const [signupSuccessful, setSignupSuccessful] = useState(false);

  // very simple email format validation
  const checkEmailFormat = (email: string): boolean => {
    return /^.+@.+\..+$/.test(email);
  };

  // password format validation
  const checkPasswordFormat = (password: string): boolean => {
    const isValidLength = password.length >= 8 && password.length <= 128;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    return isValidLength && hasUpperCase && hasLowerCase && hasNumber;
  };

  // updates signup state as user types
  const updateSignup = (event: ChangeEvent<HTMLInputElement>) => {
    setSignupState({
      ...signupState,
      [event.target.name]: event.target.value,
    });
  };

  // handles signup form submission
  const handleSignup = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    const { signupEmail, signupPassword, signupPassword2 } = signupState;
    setSignupSuccessful(false);
    await console.log('handleSignup -> signupState: ', signupState);

    // checks availability and format of email
    if (checkEmailFormat(signupEmail)) {
      setSignupEmailValid(true);
      // checks if email is available
      const emailAvailableResponse = await fetch(
        '/auth/signup/emailavailable',
        {
          method: 'POST',
          body: JSON.stringify({ email: signupEmail }),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const emailAvailableResponseData = await emailAvailableResponse.json();
      console.log(
        `email available: ${JSON.stringify(emailAvailableResponseData)}`,
      );
      setSignupEmailAvailable(emailAvailableResponseData.success);
      //
    } else {
      setSignupEmailValid(false);
      setSignupEmailAvailable(true);
    }

    // checks format and password match
    if (checkPasswordFormat(signupPassword)) {
      setSignupPasswordValid(true);
      setSignupPasswordsMatch(signupPassword === signupPassword2);
    } else {
      setSignupPasswordValid(false);
      setSignupPasswordsMatch(true);
    }

    // moves to next step of signup
    if (signupEmailAvailable && signupPasswordValid && signupPasswordsMatch) {
      const signupResponse = await fetch('/auth/signup/finish', {
        method: 'POST',
        body: JSON.stringify({ email: signupEmail, password: signupPassword }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const signupResponseData = await signupResponse.json();
      if (signupResponse.ok) {
        console.log(`signup success: ${JSON.stringify(signupResponseData)}`);
        setSignupSuccessful(true);
      }
    }
  };

  return (
    <div className='login-container'>
      <div>
        <h1 className='login-form-heading'>Sign up with</h1>

        <div className='login-signup-form'>
          <button className='login-button'>
            <img
              src={facebookLogo}
              className='signup-icon'
              aria-label='facebook signup button'
            />
          </button>
          <button className='login-button'>
            <img
              src={googleLogo}
              className='signup-icon'
              aria-label='google signup button'
            />
          </button>
          <button className='login-button'>
            <img
              src={twitterLogo}
              className='signup-icon'
              aria-label='twitter signup button'
            />
          </button>
        </div>

        <h1 className='login-form-heading'>or</h1>
        <form className='login-signup-form' onSubmit={handleSignup}>
          <label className='login-input-label' htmlFor='signupEmail'>
            email
          </label>
          <input
            type='email'
            className='login-input'
            id='signupEmail'
            name='signupEmail'
            value={signupState.signupEmail}
            onChange={updateSignup}
          />
          {(!signupEmailValid || !signupEmailAvailable) && (
            <div className='invalid-form-message'>
              {!signupEmailValid ? 'Check email format.' : 'Email unavailable.'}
            </div>
          )}
          <label className='login-input-label' htmlFor='signupPassword'>
            password
          </label>
          <input
            type='password'
            autoComplete='new-password'
            className='login-input'
            id='signupPassword'
            name='signupPassword'
            value={signupState.signupPassword}
            onChange={updateSignup}
          />
          {!signupPasswordValid && (
            <div className='invalid-form-message'>
              Password must include:
              <ul>
                <li>min 8 characters</li>
                <li>one upper case</li>
                <li>one lower case</li>
              </ul>
            </div>
          )}
          <label className='login-input-label' htmlFor='signupPassword2'>
            confirm password
          </label>
          <input
            type='password'
            autoComplete='new-password'
            className='login-input'
            id='signupPassword2'
            name='signupPassword2'
            value={signupState.signupPassword2}
            onChange={updateSignup}
          />
          {!signupPasswordsMatch && (
            <div className='invalid-form-message'>Passwords do not match.</div>
          )}
          {signupSuccessful && <Redirect to='/' />}
          <button className='login-button'>sign up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
