// import React, { useEffect } from 'react';

// const Login = () => {
//   useEffect(() => {
//     window.location.href = 'http://localhost:5000/api/auth/sso';
//   }, []);

// };

// export default Login;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import '../output.css';
import { loginUser } from '../api/services';
import logo from '../asset/logo.svg';

function Login() {
  const [email, setEmail] = useState('admin@cvm.com');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleQuickLogin = (roleName = 'Admin') => {
    const roles =
      roleName === 'Admin'
        ? ['Admin', 'HR', 'Manager', 'IT', 'Employee', 'Finance']
        : roleName === 'HR'
        ? ['HR', 'Employee']
        : ['Employee'];

    const mockToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
      btoa(
        JSON.stringify({
          id: 'EMP001',
          employeeId: 'EMP001',
          roles,
          email: `${roleName.toLowerCase()}@cvm.com`,
          exp: 2000000000,
        })
      )
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_') +
      '.mock_signature';

    const userData = {
      id: 'EMP001',
      employeeId: 'EMP001',
      employeeInternalId: 'INT001',
      reportingManagerId: 'MGR001',
      email: `${roleName.toLowerCase()}@cvm.com`,
      roles,
      firstName: roleName,
      lastName: 'User',
      token: mockToken,
      onboardingStatus: 'Completed',
    };

    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', mockToken);
    localStorage.setItem('role', JSON.stringify(roles));

    window.location.href = '/home';
  };

  const handleLogin = async () => {
    console.log('📩 Attempting login...');
    setLoading(true);

    try {
      const response = await loginUser(email, password);
      console.log('📬 Login response:', response);

      if (response && response.token) {
        const userData = {
          id: response.id,
          employeeId: response.employeeId,
          employeeInternalId: response.employeeInternalId,
          reportingManagerId: response.reportingManagerId,
          email: response.email,
          roles: response.roles,
          firstName: response.firstName,
          lastName: response.lastName,
          token: response.token,
          onboardingStatus: response.onboardingStatus,
        };

        console.log('💾 Saving user data to localStorage...');
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', JSON.stringify(response.roles));

        console.log('✅ Login success. Onboarding status:', response.onboardingStatus);

        if (response.onboardingStatus === 'Pending' || response.onboardingStatus === 'InProgress') {
          console.log('➡️ Navigating to /onboarding/personal-info');
          navigate('/onboarding/personal-info');
        } else {
          console.log('➡️ Navigating to /home');
          navigate('/home');
        }
      } else {
        alert('Invalid credentials');
        console.warn('⚠️ Login failed: No token received');
      }
    } catch (error) {
      alert(error.message || 'Login failed');
      console.error('❌ Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page ">
      <div className="login-box">
        <h2 className="title">HRMS</h2>
        <div className="login-form">
          <label>Email</label>

          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleLogin} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <div style={{ marginTop: '16px', borderTop: '1px solid #e2e8f0', paddingTop: '12px', textAlign: 'center' }}>
            <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px', fontWeight: '500' }}>
              ⚡ Quick Demo Login (Mock Mode):
            </p>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
              <button
                type="button"
                onClick={() => handleQuickLogin('Admin')}
                style={{
                  padding: '6px 12px',
                  fontSize: '12px',
                  background: '#0a449a',
                  color: 'white',
                  borderRadius: '6px',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Admin (Full Access)
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('HR')}
                style={{
                  padding: '6px 12px',
                  fontSize: '12px',
                  background: '#0284c7',
                  color: 'white',
                  borderRadius: '6px',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                HR
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('Employee')}
                style={{
                  padding: '6px 12px',
                  fontSize: '12px',
                  background: '#475569',
                  color: 'white',
                  borderRadius: '6px',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Employee
              </button>
            </div>

            <div style={{ marginTop: '12px' }}>
              <button
                type="button"
                onClick={() => navigate('/v2/login')}
                style={{
                  width: '100%',
                  padding: '8px',
                  fontSize: '12px',
                  background: 'linear-gradient(135deg, #21093D 0%, #382451 100%)',
                  color: '#60F61B',
                  border: '1px solid rgba(96, 246, 27, 0.4)',
                  borderRadius: '6px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                ✨ Open Modern V2 Login Screen
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
