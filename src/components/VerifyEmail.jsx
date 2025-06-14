import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
  const { key } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('Verifying your email...');
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await fetch('https://xylem-api.ra-physics.space/rest-auth/registration/account-confirm-email/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ key }),
        });

        if (!res.ok) throw new Error('Verification failed');
        setMessage('✅ Email verified successfully.');
        setVerified(true);
      } catch (err) {
        setMessage('❌ Verification failed or link expired.');
      }
    };

    if (key) verify();
  }, [key]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 font-sans text-center">
      <h1 className="text-3xl font-bold mb-4">Email Verification</h1>
      <p className="mb-6">{message}</p>
      {verified && (
        <button
          onClick={() => navigate('/login')}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Go to Login
        </button>
      )}
    </div>
  );
};

export default VerifyEmail;
