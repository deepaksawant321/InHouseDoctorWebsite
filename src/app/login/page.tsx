'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [loginId, setLoginId] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(30);
  const router = useRouter();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (otpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError('');
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginId);
    const isMobile = /^\d{10}$/.test(loginId);

    if (isEmail || isMobile) {
      setLoading(true);
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/auth/send-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            identifier: loginId,
            channel: isEmail ? 'EMAIL' : 'SMS',
            purpose: 'LOGIN'
          })
        });

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.message || 'Failed to send OTP');
        }

        setOtpSent(true);
        setTimer(30);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    } else {
      setError("Please enter a valid 10-digit mobile number or a valid email ID.");
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (otp.length > 3) {
      setLoading(true);
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/auth/login-with-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            identifier: loginId,
            otp: otp,
            purpose: 'LOGIN'
          })
        });

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.message || 'Invalid OTP');
        }

        const responseData = await response.json();
        const token = responseData.data?.accessToken;
        
        if (token) {
          localStorage.setItem('token', token);
          router.push('/dashboard');
        } else {
          throw new Error('No token received from server');
        }
        // Handle successful login (e.g. save token, redirect to dashboard)
      } catch (err: any) {
        setError(err.message || 'Failed to verify OTP');
      } finally {
        setLoading(false);
      }
    } else {
      setError("Please enter a valid OTP.");
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      fontFamily: '"Inter", "Roboto", sans-serif'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        padding: '40px',
        borderRadius: '20px',
        boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
        maxWidth: '400px',
        width: '100%',
        textAlign: 'center',
        transition: 'all 0.3s ease'
      }}>

        {/* Header Section */}
        <h1 style={{ margin: '0 0 10px 0', color: '#333', fontSize: '28px', fontWeight: '700' }}>
          Login or Sign up
        </h1>
        <p style={{ color: '#666', fontSize: '14px', marginBottom: '30px', lineHeight: '1.5' }}>
          Enter your mobile number or email ID to proceed. We will send an OTP for verification.
        </p>

        {/* Form Section */}
        {error && (
          <div style={{ color: '#d32f2f', background: '#fdecea', padding: '10px', borderRadius: '5px', marginBottom: '20px', fontSize: '14px', fontWeight: 'bold' }}>
            {error}
          </div>
        )}

        {!otpSent ? (
          <form onSubmit={handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '10px', overflow: 'hidden', background: '#fff' }}>
              {(loginId === '' || /^\d+$/.test(loginId)) && (
                <div style={{ padding: '15px', background: '#f5f5f5', borderRight: '1px solid #ddd', color: '#555', fontWeight: 'bold' }}>
                  +91
                </div>
              )}
              <input
                type="text"
                placeholder="Mobile Number or Email ID"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                style={{
                  flex: 1,
                  padding: '15px',
                  border: 'none',
                  outline: 'none',
                  fontSize: '16px',
                  background: 'transparent'
                }}
              />
            </div>

            <button type="submit" disabled={loading} style={{
              background: loading ? '#ccc' : 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
              color: 'white',
              border: 'none',
              padding: '15px',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: loading ? 'none' : '0 4px 15px rgba(0,242,254,0.3)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}>
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
          </form>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f5f5f5', padding: '10px 15px', borderRadius: '10px' }}>
              <span style={{ color: '#555', fontSize: '14px', fontWeight: 'bold', wordBreak: 'break-all', textAlign: 'left' }}>{loginId}</span>
              <button 
                type="button" 
                onClick={() => { setOtpSent(false); setTimer(30); setOtp(''); }}
                style={{ background: 'none', border: 'none', color: '#4facfe', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' }}>
                Edit
              </button>
            </div>
            
            <form onSubmit={handleVerifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                style={{
                  padding: '15px',
                  border: '1px solid #ddd',
                  borderRadius: '10px',
                  fontSize: '16px',
                  outline: 'none',
                  textAlign: 'center',
                  letterSpacing: '5px',
                  fontWeight: 'bold'
                }}
              />
              <button type="submit" disabled={loading} style={{
                background: loading ? '#ccc' : 'linear-gradient(to right, #43e97b 0%, #38f9d7 100%)',
                color: 'white',
                border: 'none',
                padding: '15px',
                borderRadius: '10px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: loading ? 'none' : '0 4px 15px rgba(67,233,123,0.3)',
                transition: 'transform 0.2s ease'
              }}>
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </form>

            <div style={{ textAlign: 'center', fontSize: '14px', color: '#666' }}>
              {timer > 0 ? (
                <span>Resend OTP in <strong style={{ color: '#333' }}>{timer}s</strong></span>
              ) : (
                <button 
                  type="button" 
                  onClick={() => handleSendOtp()}
                  disabled={loading}
                  style={{ background: 'none', border: 'none', color: '#4facfe', cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 'bold', fontSize: '14px' }}>
                  Resend OTP
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
