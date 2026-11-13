import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    setLoading(true);

    try {
      const response = await loginUser(email, password);

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

        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', JSON.stringify(response.roles));

        if (response.onboardingStatus === 'Pending' || response.onboardingStatus === 'InProgress') {
          navigate('/onboarding/personal-info');
        } else {
          navigate('/home');
        }
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      alert(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-split" style={{ display: 'flex', minHeight: '100vh', background: '#FAFAF8', color: '#21093D', fontFamily: 'Inter, sans-serif' }}>
      {/* Left Column: Login Form */}
      <div style={{ flex: '1 1 45%', maxWidth: '560px', padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#FFFFFF', borderRight: '1px solid #E5E0EA', zIndex: 2 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#60F61B', color: '#21093D', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '18px' }}>
                C
              </div>
              <span style={{ fontWeight: '800', fontSize: '18px', letterSpacing: '-0.5px' }}>
                CVM <span style={{ color: '#0a449a' }}>HRMS</span>
              </span>
            </div>
            <button
              type="button"
              onClick={() => navigate('/v2/login')}
              style={{ padding: '6px 12px', fontSize: '12px', background: '#21093D', color: '#60F61B', border: '1px solid rgba(96,246,27,0.3)', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              ✨ Try Modern V2
            </button>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: '800', marginBottom: '6px', color: '#21093D' }}>
              Sign in to HRMS
            </h2>
            <p style={{ fontSize: '13px', color: '#71677D', margin: 0 }}>
              Enter your enterprise credentials or click below for instant demo access.
            </p>
          </div>

          {/* Quick Demo Access Buttons */}
          <div style={{ background: '#F0EDF4', padding: '14px', borderRadius: '10px', marginBottom: '24px', border: '1px solid #E5E0EA' }}>
            <div style={{ fontSize: '12px', fontWeight: '700', color: '#21093D', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#60F61B', display: 'inline-block' }} />
              <span>Instant Quick Access (Mock Mode)</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              <button
                type="button"
                onClick={() => handleQuickLogin('Admin')}
                style={{ padding: '8px 10px', fontSize: '12px', background: '#21093D', color: '#60F61B', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                Admin
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('HR')}
                style={{ padding: '8px 10px', fontSize: '12px', background: '#FFFFFF', color: '#21093D', border: '1px solid #E5E0EA', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}
              >
                HR Lead
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('Employee')}
                style={{ padding: '8px 10px', fontSize: '12px', background: '#FFFFFF', color: '#21093D', border: '1px solid #E5E0EA', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}
              >
                Employee
              </button>
            </div>
          </div>

          {/* Form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '6px', color: '#21093D' }}>
                Work Email
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #E5E0EA', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#21093D' }}>Password</label>
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ fontSize: '12px', color: '#71677D', cursor: 'pointer' }}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </span>
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #E5E0EA', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            <button
              type="button"
              onClick={handleLogin}
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px',
                marginTop: '8px',
                borderRadius: '8px',
                background: '#60F61B',
                color: '#21093D',
                border: 'none',
                fontWeight: '800',
                fontSize: '14px',
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(96,246,27,0.3)',
              }}
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </div>
        </div>

        <div style={{ fontSize: '11px', color: '#71677D', borderTop: '1px solid #E5E0EA', paddingTop: '16px', display: 'flex', justifyContent: 'space-between' }}>
          <span>🔒 256-bit SSL Encrypted</span>
          <span>SOC2 Compliant</span>
        </div>
      </div>

      {/* Right Column: Visual Image Panel */}
      <div style={{ flex: '1 1 55%', position: 'relative', background: 'linear-gradient(135deg, #21093D 0%, #382451 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '50px', color: 'white', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '400px', height: '400px', background: 'rgba(96, 246, 27, 0.15)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }} />

        <div style={{ zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ background: 'rgba(255,255,255,0.1)', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>
            Enterprise Workforce Platform
          </span>
          <span style={{ fontSize: '12px', opacity: 0.8 }}>v2.0 Ready</span>
        </div>

        <div style={{ zIndex: 1, margin: 'auto 0', maxWidth: '520px' }}>
          <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.2)', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', marginBottom: '24px' }}>
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80"
              alt="Office Workspace"
              style={{ width: '100%', height: '240px', objectFit: 'cover', display: 'block' }}
            />
          </div>
          <h3 style={{ fontSize: '22px', fontWeight: '800', lineHeight: 1.3, marginBottom: '8px' }}>
            Streamline Attendance, Timesheets & Payroll
          </h3>
          <p style={{ fontSize: '14px', opacity: 0.85, lineHeight: 1.6, margin: 0 }}>
            Unified human resources management designed for fast-growing global teams.
          </p>
        </div>

        <div style={{ zIndex: 1, borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '16px', fontSize: '12px', opacity: 0.8, display: 'flex', justifyContent: 'space-between' }}>
          <span>© 2026 CVM HRMS Inc. All rights reserved.</span>
          <span style={{ color: '#60F61B', fontWeight: 'bold' }}>99.98% System Uptime</span>
        </div>
      </div>
    </div>
  );
}

export default Login;
