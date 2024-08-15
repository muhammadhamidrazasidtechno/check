'use client';
import React, { useState, useEffect } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '@/app/db/firebase';

const PhoneNumberAuth = () => {
  const [showVerificationInput, setShowVerificationInput] = useState(false);
  const [code, setCode] = useState('');
  
  // Initialize reCAPTCHA verifier only once
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
        size: 'invisible', // or 'normal' for visible reCAPTCHA
        callback: () => {
          // reCAPTCHA solved, proceed with phone sign-in
          sendVerificationCode();
        },
        'expired-callback': () => {
          console.log('reCAPTCHA expired. Please solve it again.');
        }
      }, auth);
    }
  }, []);

  // Send verification code to phone number
  const sendVerificationCode = () => {
    const appVerifier = window.recaptchaVerifier;

    const phoneNumber = '+923140328646'; // Fixed phone number

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        console.log('SMS sent successfully.');
        setShowVerificationInput(true);
        window.confirmationResult = confirmationResult; // Store confirmation result for code verification
      })
      .catch((error) => {
        console.error("Error during sign-in:", error);
        if (error.code === 'auth/too-many-requests') {
          alert('Too many requests. Please try again later.');
        } else if (error.code === 'auth/captcha-check-failed') {
          alert('reCAPTCHA verification failed. Please try again.');
        }
      });
  };

  // Verify the code entered by the user
  const verifyCode = () => {
    const confirmationResult = window.confirmationResult;

    if (confirmationResult) {
      confirmationResult.confirm(code)
        .then((result) => {
          console.log('User signed in successfully:', result.user);
        })
        .catch((error) => {
          console.error("Error verifying code:", error);
        });
    } else {
      console.error("No confirmation result found.");
    }
  };

  return (
    <div>
      <div id="recaptcha-container"></div>
      <button onClick={sendVerificationCode}>
        Send Verification Code
      </button>
      {showVerificationInput && (
        <div>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter verification code"
          />
          <button onClick={verifyCode}>Verify Code</button>
        </div>
      )}
    </div>
  );
};

export default PhoneNumberAuth;
