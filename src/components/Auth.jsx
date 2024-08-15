'use client'

import React, { useRef, useState } from 'react';
import Swal from 'sweetalert2';
import { RecaptchaVerifier } from 'firebase/auth';
import { auth } from '@/app/db/firebase';

const Auth = () => {
  console.log(auth.authStateSubscription.auth);
  
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verification, setverification] = useState('');


  const recapcha = useRef(null)

  const handleSendOTP = () => {

    if (recapcha.current) {
recapcha.current.innerHTML = `<div id="recaptcha-container"></>`
    }
    const verify = new RecaptchaVerifier('recaptcha-container', {
      size: 'invisible',
    })
    auth.auth().signInWithPhoneNumber(phoneNumber, verify)
      .then(result => {
setverification(result)
      }).catch(error => {
console.error('ssdsjd'+ error);

      })
    if (!phoneNumber) {
      Swal.fire({
        title: 'Error!',
        text: 'Please enter your phone number.',
        icon: 'error',
      });
      return;
    }

    // Here you would send the OTP request to your backend.
    // This example just shows a success message.
    Swal.fire({
      title: 'OTP Sent!',
      text: 'An OTP has been sent to your phone number.',
      icon: 'success',
    });

    // Reset the phone number input
    setPhoneNumber('');
  };

  return (
    <div style={styles.container}>
      <div ref={recapcha}></div>
      <h2 style={styles.title}>Enter Your Phone Number</h2>
      <input
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleSendOTP} style={styles.button}>
        Send OTP
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f4',
    padding: '20px',
  },
  title: {
    marginBottom: '20px',
    fontSize: '24px',
    color: '#333',
  },
  input: {
    padding: '10px',
    marginBottom: '20px',
    width: '250px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#3085d6',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default Auth;
