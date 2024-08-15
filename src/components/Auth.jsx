'use client'
import React, { useState } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '@/app/db/firebase';

const PhoneNumberAuth = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationId, setVerificationId] = useState(null);
  const [code, setCode] = useState('');
  const [showVerificationInput, setShowVerificationInput] = useState(false);

  // Initialize reCAPTCHA verifier
  const initializeRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, proceed with phone sign-in
        sendVerificationCode();
      },
      'expired-callback': () => {
        // Response expired, ask user to solve reCAPTCHA again
      }
    }, auth);
  };

  // Send verification code to phone number
  const sendVerificationCode = () => {
    initializeRecaptcha();

    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent, save the confirmation result
        setVerificationId(confirmationResult.verificationId);
        setShowVerificationInput(true);
      })
      .catch((error) => {
        console.error("Error during sign-in:", error);
      });
  };

  // Verify the code entered by the user
  const verifyCode = () => {
    const credential = auth.PhoneAuthProvider.credential(verificationId, code);
    auth.signInWithCredential(credential)
      .then((result) => {
        console.log('User signed in successfully:', result.user);
      })
      .catch((error) => {
        console.error("Error verifying code:", error);
      });
  };

  return (
    <div>
      <div id="recaptcha-container"></div>
      {!showVerificationInput ? (
        <div>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter phone number"
          />
          <button onClick={sendVerificationCode}>Send Verification Code</button>
        </div>
      ) : (
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