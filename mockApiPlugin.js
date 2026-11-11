// mockApiPlugin.js
// Vite plugin that serves a comprehensive mock backend for CVM HRMS

export function mockApiPlugin() {
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
    bloodGroup: 'O+',
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
      phone: '+1 555-0101',
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
      phone: '+1 555-0102',
    },
    {
      id: 'EMP003',
      employeeId: 'EMP003',
      fullName: 'David Patel',
      firstName: 'David',
      lastName: 'Patel',
      email: 'david.p@cvm.com',
      department: 'Human Resources',
      position: 'HR Business Partner',
      role: ['HR', 'Employee'],
      status: 'Active',
      dateOfJoining: '2024-02-10',
      dateOfBirth: '1992-06-25',
      phone: '+1 555-0103',
    },
    {
      id: 'EMP004',
      employeeId: 'EMP004',
      fullName: 'Elena Rostova',
      firstName: 'Elena',
      lastName: 'Rostova',
      email: 'elena.r@cvm.com',
      department: 'Finance',
      position: 'Payroll Specialist',
      role: ['Finance', 'Employee'],
      status: 'Active',
      dateOfJoining: '2024-04-15',
      dateOfBirth: '1993-09-18',
      phone: '+1 555-0104',
    },
  ];

  const announcements = [
    {
      id: 1,
      title: 'Annual Company Offsite 2026',
      description: 'Mark your calendars! The annual winter summit will take place next month.',
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    },
    {
      id: 2,
      title: 'New Health & Wellness Benefits',
      description: 'Annual wellness reimbursements and gym allowances are now open for enrollment.',
      createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    },
    {
      id: 3,
      title: 'HRMS Platform 2.0 Released',
      description: 'Welcome to the upgraded HRMS interface with enhanced payroll and time tracking.',
      createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    },
  ];

  const events = [
    {
      id: 1,
      title: 'Quarterly All-Hands Meeting',
      eventDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
      eventTime: '10:00 AM',
    },
    {
      id: 2,
      title: 'Tech Tech-Talk & Demo Day',
      eventDate: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0],
      eventTime: '03:30 PM',
    },
  ];

  const holidays = [
    { id: 1, name: 'Thanksgiving Day', holidayDate: '2026-11-26' },
    { id: 2, name: 'Day After Thanksgiving', holidayDate: '2026-11-27' },
    { id: 3, name: 'Christmas Eve', holidayDate: '2026-12-24' },
    { id: 4, name: 'Christmas Day', holidayDate: '2026-12-25' },
    { id: 5, name: "New Year's Day", holidayDate: '2027-01-01' },
  ];

  const leavesSummary = {
    available: 18,
    casual: 8,
    sick: 6,
    earned: 4,
    taken: 4,
    pending: 1,
    requests: [
      {
        id: 101,
        employeeId: 'EMP001',
        employeeName: 'Admin User',
        leaveType: 'Casual Leave',
        startDate: '2026-11-18',
        endDate: '2026-11-19',
        days: 2,
        reason: 'Personal engagement',
        status: 'Approved',
        appliedOn: '2026-11-05',
      },
      {
        id: 102,
        employeeId: 'EMP002',
        employeeName: 'Sarah Johnson',
        leaveType: 'Sick Leave',
        startDate: '2026-11-20',
        endDate: '2026-11-21',
        days: 2,
        reason: 'Medical rest',
        status: 'Pending',
        appliedOn: '2026-11-10',
      },
    ],
  };

  const assets = [
    {
      id: 1,
      assetTag: 'AST-2024-001',
      name: 'MacBook Pro M3 Max 16"',
      category: 'Laptop',
      serialNumber: 'MBP982312A',
      assignedTo: 'Admin User',
      assignedDate: '2024-01-20',
      status: 'Assigned',
    },
    {
      id: 2,
      assetTag: 'AST-2024-002',
      name: 'Dell UltraSharp 32" 4K Monitor',
      category: 'Monitor',
      serialNumber: 'DEL994821B',
      assignedTo: 'Admin User',
      assignedDate: '2024-01-20',
      status: 'Assigned',
    },
    {
      id: 3,
      assetTag: 'AST-2024-003',
      name: 'Bose 700 Noise Cancelling Headphones',
      category: 'Audio',
      serialNumber: 'BOS778211C',
      assignedTo: 'Sarah Johnson',
      assignedDate: '2024-03-05',
      status: 'Assigned',
    },
  ];

  const hrRequests = [
    {
      id: 1,
      category: 'Letter Request',
      subject: 'Employment Verification & Salary Certificate',
      description: 'Official employment verification requested for visa filing.',
      status: 'In Progress',
      createdAt: '2026-11-09T08:30:00.000Z',
    },
    {
      id: 2,
      category: 'IT Access',
      subject: 'Cloud Infrastructure Staging Access',
      description: 'Elevated developer permissions requested for release QA.',
      status: 'Approved',
      createdAt: '2026-11-04T11:00:00.000Z',
    },
  ];

  return {
    name: 'cvm-mock-api-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url.split('?')[0];

        if (!url.startsWith('/api')) {
          return next();
        }

        // Set common response headers
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

        // 1. Auth Login
        if (url.includes('/auth/login')) {
          return sendJson(defaultUser);
        }

        // 2. Profile endpoints
        if (url === '/api/profile/me' || url === '/api/employee') {
          return sendJson(defaultProfile);
        }

        // 3. Emergency Contacts
        if (url.includes('/emergencycontacts')) {
          return sendJson([
            { id: 1, name: 'Sarah User', relationship: 'Spouse', phone: '+1 555-0199', email: 'sarah@example.com' },
          ]);
        }

        // 4. Clock & Sessions
        if (url.includes('/clock/today-sessions')) {
          return sendJson({
            sessions: [
              { clockIn: new Date(Date.now() - 3600000 * 4).toISOString(), clockOut: new Date(Date.now() - 3600000 * 2).toISOString() },
              { clockIn: new Date(Date.now() - 3600000).toISOString(), clockOut: null },
            ],
            currentStatus: 'Clocked In',
          });
        }
        if (url.includes('/clock/clockin') || url.includes('/clock/clockout')) {
          return sendJson({ success: true, message: 'Clock status updated successfully' });
        }

        // 5. Attendance
        if (url === '/api/attendance/my') {
          const now = new Date();
          const list = [];
          for (let i = 0; i < 7; i++) {
            const d = new Date(now);
            d.setDate(now.getDate() - (now.getDay() === 0 ? 6 : now.getDay() - 1) + i);
            list.push({
              date: d.toISOString(),
              totalHours: i < 5 ? 8 : 0,
            });
          }
          return sendJson(list);
        }
        if (url.includes('/attendance/team') || url === '/api/attendance') {
          return sendJson([
            { employeeId: 'EMP001', name: 'Admin User', date: '2026-11-11', status: 'Present', totalHours: 8 },
            { employeeId: 'EMP002', name: 'Sarah Johnson', date: '2026-11-11', status: 'Present', totalHours: 7.5 },
            { employeeId: 'EMP003', name: 'David Patel', date: '2026-11-11', status: 'Present', totalHours: 8 },
            { employeeId: 'EMP004', name: 'Elena Rostova', date: '2026-11-11', status: 'On Leave', totalHours: 0 },
          ]);
        }
        if (url.includes('/attendance/logs')) {
          return sendJson([
            { id: 1, employeeId: 'EMP001', name: 'Admin User', date: '2026-11-11', clockIn: '09:00 AM', clockOut: '05:30 PM', totalHours: 8.5 },
            { id: 2, employeeId: 'EMP002', name: 'Sarah Johnson', date: '2026-11-11', clockIn: '09:15 AM', clockOut: '05:45 PM', totalHours: 8.5 },
          ]);
        }

        // 6. General (Announcements, Events, Holidays, TDS)
        if (url.includes('/general/announcements')) {
          if (req.method === 'POST') return sendJson({ success: true, id: Date.now() });
          return sendJson(announcements);
        }
        if (url.includes('/general/events')) {
          if (req.method === 'POST') return sendJson({ success: true, id: Date.now() });
          return sendJson(events);
        }
        if (url.includes('/general/holidays')) {
          if (req.method === 'POST') return sendJson({ success: true, id: Date.now() });
          return sendJson(holidays);
        }
        if (url.includes('/general/tds')) {
          return sendJson({ year: '2026-2027', deducted: 18500, status: 'Compliant' });
        }
        if (url.includes('/feature/dob')) {
          return sendJson(employees);
        }

        // 7. Employees & Users & Onboarding
        if (url.includes('/employee/all') || url.includes('/employee/filtered') || url === '/api/users') {
          return sendJson(employees);
        }
        if (url.includes('/onboarding/all')) {
          return sendJson([
            { id: 1, employeeId: 'EMP005', fullName: 'Alex Rivera', email: 'alex.r@cvm.com', department: 'Engineering', stage: 'Background Verification', progress: 70, status: 'InProgress' },
            { id: 2, employeeId: 'EMP006', fullName: 'Maya Lin', email: 'maya.l@cvm.com', department: 'Design', stage: 'Hardware Setup', progress: 90, status: 'InProgress' },
          ]);
        }

        // 8. Leaves
        if (url.includes('/leaves/my')) {
          return sendJson(leavesSummary);
        }
        if (url.includes('/leaves/admin-leaves') || url.includes('/leaves/all') || url === '/api/leaves') {
          if (req.method === 'POST') return sendJson({ success: true, message: 'Leave submitted' });
          return sendJson(leavesSummary.requests);
        }

        // 9. Assets
        if (url.includes('/assets/my')) {
          return sendJson(assets.filter((a) => a.assignedTo === 'Admin User'));
        }
        if (url.includes('/assets/requests')) {
          return sendJson([
            { id: 1, assetName: 'Ergonomic Standing Desk Converter', category: 'Furniture', reason: 'Ergonomic health', status: 'Pending', requestDate: '2026-11-08' },
          ]);
        }
        if (url.includes('/assets')) {
          return sendJson(assets);
        }

        // 10. HR Requests
        if (url.includes('/hr/requests')) {
          if (req.method === 'POST') return sendJson({ success: true, message: 'Request created' });
          return sendJson(hrRequests);
        }

        // 11. Timesheets
        if (url.includes('/timesheets')) {
          if (req.method === 'POST') return sendJson({ success: true, message: 'Timesheet submitted' });
          return sendJson([
            {
              id: 1,
              weekStartDate: '2026-11-09',
              weekEndDate: '2026-11-15',
              totalHours: 40,
              status: 'Approved',
              entries: [{ project: 'HRMS Platform Modernization', task: 'Architecture & Verification', hours: 40 }],
            },
          ]);
        }

        // 12. Teams
        if (url.includes('/teams/my-team')) {
          return sendJson({
            teamName: 'Enterprise Platform Engineering',
            lead: 'Admin User',
            members: employees,
          });
        }
        if (url.includes('/teams')) {
          return sendJson([
            { id: 1, name: 'Enterprise Platform Engineering', membersCount: 8, lead: 'Admin User' },
            { id: 2, name: 'People Operations & HR', membersCount: 4, lead: 'David Patel' },
            { id: 3, name: 'Financial Governance', membersCount: 3, lead: 'Elena Rostova' },
          ]);
        }

        // 13. Organizations
        if (url.includes('/organizations')) {
          return sendJson([
            { id: 1, name: 'CVM Technologies Global Inc.', code: 'CVM-GLOBAL', status: 'Active', industry: 'Software & Cloud Solutions', website: 'https://cvm.com' },
          ]);
        }

        // 14. Payroll & Payslips
        if (url.includes('/pay/payrolls') || url === '/api/pay') {
          return sendJson({
            data: [
              { id: 'PAY-2026-10', month: 'October', year: 2026, totalEmployees: 42, processedAmount: 245000, status: 'Processed', disbursementDate: '2026-10-31' },
              { id: 'PAY-2026-09', month: 'September', year: 2026, totalEmployees: 41, processedAmount: 238000, status: 'Processed', disbursementDate: '2026-09-30' },
            ],
          });
        }
        if (url.includes('/payroll/employee') || url.includes('/payroll/self')) {
          return sendJson({
            data: [
              {
                id: 'PS-2026-10-EMP001',
                employeeId: 'EMP001',
                month: 'October',
                year: 2026,
                basic: 9000,
                hra: 3600,
                allowances: 2400,
                deductions: 1500,
                netPay: 13500,
                status: 'Paid',
              },
            ],
          });
        }
        if (url.includes('/payslips')) {
          return sendJson([
            { id: 1, month: 'October 2026', fileName: 'Payslip_Oct_2026.pdf', amount: 13500, date: '2026-10-31' },
            { id: 2, month: 'September 2026', fileName: 'Payslip_Sep_2026.pdf', amount: 13500, date: '2026-09-30' },
          ]);
        }
        if (url.includes('/pay-components')) {
          return sendJson([
            { id: 1, name: 'Basic Salary', type: 'Earning', taxable: true, calculationType: 'Fixed' },
            { id: 2, name: 'House Rent Allowance (HRA)', type: 'Earning', taxable: false, calculationType: 'Percentage' },
            { id: 3, name: 'Special Allowance', type: 'Earning', taxable: true, calculationType: 'Fixed' },
            { id: 4, name: 'Provident Fund (PF)', type: 'Deduction', taxable: false, calculationType: 'Percentage' },
          ]);
        }
        if (url.includes('/salary')) {
          return sendJson([
            { id: 1, templateName: 'Senior Leadership Package', ctc: 180000, basic: 108000, hra: 43200, specialAllowance: 28800 },
          ]);
        }
        if (url.includes('/tax/slabs') || url.includes('/tax/config')) {
          return sendJson([
            { id: 1, taxRegime: 'New', financialYear: '2026-2027', minIncome: 0, maxIncome: 300000, rate: 0 },
            { id: 2, taxRegime: 'New', financialYear: '2026-2027', minIncome: 300001, maxIncome: 700000, rate: 5 },
            { id: 3, taxRegime: 'New', financialYear: '2026-2027', minIncome: 700001, maxIncome: 1000000, rate: 10 },
            { id: 4, taxRegime: 'New', financialYear: '2026-2027', minIncome: 1000001, maxIncome: 1500000, rate: 15 },
          ]);
        }
        if (url.includes('/rmb')) {
          return sendJson([
            { id: 1, category: 'Travel & Client Visit', amount: 320, billDate: '2026-11-04', status: 'Approved', description: 'Transportation & Client Dinner' },
          ]);
        }
        if (url.includes('/declarations')) {
          return sendJson([
            { id: 1, section: '80C', component: 'Provident Fund / ELSS', declaredAmount: 150000, verifiedAmount: 150000, status: 'Verified' },
            { id: 2, section: '80D', component: 'Medical Health Insurance', declaredAmount: 25000, verifiedAmount: 25000, status: 'Verified' },
          ]);
        }
        if (url.includes('/helpdesk/faqs')) {
          return sendJson([
            { id: 1, question: 'What is the cutoff for submitting monthly reimbursement receipts?', answer: 'Reimbursement claims should be submitted by the 22nd of each month.' },
            { id: 2, question: 'How can I update tax declaration details?', answer: 'Navigate to Payroll -> Tax Declarations to submit or revise declarations before January 15th.' },
          ]);
        }
        if (url.includes('/helpdesk/tickets')) {
          if (req.method === 'POST') return sendJson({ success: true, message: 'Ticket raised' });
          return sendJson([
            { id: 1, ticketNumber: 'TKT-2026-004', subject: 'Tax deduction query for October cycle', status: 'Resolved', createdDate: '2026-11-02' },
          ]);
        }
        if (url.includes('/utilities/aadhar-pan-link')) {
          return sendJson({ linked: true, panNumber: 'ABCDE1234F', aadharLast4: '9988', status: 'Verified' });
        }

        // Generic 200 catch-all for any other /api endpoints so frontend screens never break
        return sendJson({
          success: true,
          message: 'Mock API Response',
          data: [],
        });
      });
    },
  };
}
