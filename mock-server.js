// mock-server.js
// Standalone Node.js Mock API Server for CVM HRMS (Port 5000)
// Run with: node mock-server.js

import http from 'http';

const PORT = process.env.PORT || 5000;

const mockJwt =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
  Buffer.from(
    JSON.stringify({
      id: 'EMP001',
      employeeId: 'EMP001',
      roles: ['Admin', 'HR', 'Manager', 'IT', 'Employee', 'Finance'],
      email: 'admin@cvm.com',
      exp: 2000000000,
    })
  ).toString('base64url') +
  '.mock_signature';

const defaultUser = {
  id: 'EMP001',
  employeeId: 'EMP001',
  employeeInternalId: 'INT001',
  reportingManagerId: 'MGR001',
  email: 'admin@cvm.com',
  roles: ['Admin', 'HR', 'Manager', 'IT', 'Employee', 'Finance'],
  firstName: 'Admin',
  lastName: 'User',
  token: mockJwt,
  onboardingStatus: 'Completed',
};

const defaultProfile = {
  id: 'EMP001',
  employeeId: 'EMP001',
  fullName: 'Admin User',
  firstName: 'Admin',
  lastName: 'User',
  email: 'admin@cvm.com',
  position: 'Lead HR Architect / Platform Admin',
  department: 'People Operations & Engineering',
  reportingManagerName: 'Executive Director',
  dateOfJoining: '2024-01-15T00:00:00.000Z',
  profileImageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
  phone: '+1 (555) 234-5678',
  address: '100 Innovation Blvd, Suite 400',
  onboardingStatus: 'Completed',
  roles: ['Admin', 'HR', 'Manager', 'IT', 'Employee', 'Finance'],
  employmentType: 'Full-time Permanent',
  location: 'Headquarters',
};

const employees = [
  {
    id: 'EMP001',
    employeeId: 'EMP001',
    fullName: 'Admin User',
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@cvm.com',
    department: 'Operations',
    position: 'HRMS Lead Administrator',
    role: ['Admin', 'HR', 'Manager', 'IT', 'Employee', 'Finance'],
    status: 'Active',
    dateOfJoining: '2024-01-15',
    dateOfBirth: new Date().toISOString(),
  },
  {
    id: 'EMP002',
    employeeId: 'EMP002',
    fullName: 'Sarah Johnson',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.j@cvm.com',
    department: 'Engineering',
    position: 'Senior Full Stack Engineer',
    role: ['Employee'],
    status: 'Active',
    dateOfJoining: '2024-03-01',
    dateOfBirth: '1995-11-12',
  },
];

const server = http.createServer((req, res) => {
  const url = req.url.split('?')[0];

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  }

  const sendJson = (data, status = 200) => {
    res.statusCode = status;
    res.end(JSON.stringify(data));
  };

  if (url.includes('/auth/login')) return sendJson(defaultUser);
  if (url === '/api/profile/me' || url === '/api/employee') return sendJson(defaultProfile);
  if (url.includes('/clock/today-sessions')) {
    return sendJson({
      sessions: [{ clockIn: new Date(Date.now() - 3600000 * 3).toISOString(), clockOut: null }],
      currentStatus: 'Clocked In',
    });
  }
  if (url === '/api/attendance/my') {
    return sendJson([
      { date: new Date().toISOString(), totalHours: 8 },
    ]);
  }
  if (url.includes('/employee/all') || url.includes('/employee/filtered') || url === '/api/users') {
    return sendJson(employees);
  }
  if (url.includes('/feature/dob')) return sendJson(employees);

  return sendJson({ success: true, message: 'Mock response', data: [] });
});

server.listen(PORT, () => {
  console.log(`HRMS Mock Backend running at http://localhost:${PORT}/api`);
});
