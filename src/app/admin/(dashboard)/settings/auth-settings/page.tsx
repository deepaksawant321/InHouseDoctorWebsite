'use client';

import React, { useState } from 'react';

export default function AuthSettingsPage() {
  const [loginMethod, setLoginMethod] = useState('password');
  const [otpChannel, setOtpChannel] = useState('email');

  return (
    <div style={{ padding: '24px' }}>
      <h1 style={{ marginBottom: '16px', fontSize: '24px', fontWeight: 'bold' }}>
        Authentication Settings
      </h1>
      <div style={{ padding: '24px', marginTop: '24px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
          
          <div style={{ flex: '1 1 300px' }}>
            <label style={{ display: 'block', marginBottom: '8px' }}>Login Method</label>
            <select
              value={loginMethod}
              onChange={(e) => setLoginMethod(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
            >
              <option value="password">Password Only</option>
              <option value="password_otp">Password + OTP</option>
              <option value="otp">OTP Only</option>
            </select>
          </div>
          
          <div style={{ flex: '1 1 300px' }}>
            <label style={{ display: 'block', marginBottom: '8px' }}>OTP Channel</label>
            <select
              value={otpChannel}
              onChange={(e) => setOtpChannel(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
            >
              <option value="email">Email Only</option>
              <option value="sms">SMS Only</option>
              <option value="both">Both</option>
            </select>
          </div>

          <div style={{ flex: '1 1 300px' }}>
            <label style={{ display: 'block', marginBottom: '8px' }}>OTP Expiry (Minutes)</label>
            <input 
              defaultValue="5" 
              type="number" 
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} 
            />
          </div>

          <div style={{ flex: '1 1 300px' }}>
            <label style={{ display: 'block', marginBottom: '8px' }}>Max Verification Attempts</label>
            <input 
              defaultValue="3" 
              type="number" 
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} 
            />
          </div>
          
          <div style={{ width: '100%', marginTop: '16px' }}>
            <button 
              style={{ padding: '10px 20px', backgroundColor: '#1976d2', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Save Settings
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
