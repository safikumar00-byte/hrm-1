import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import PageSkeleton from './components/skeletons/PageSkeleton';
import './index.css';

// Layouts (Loaded eagerly for stable navigation chrome)
import Layout from './components/Layout';
import LeaveNavbar from './components/Layouts/LeaveNavbar';
import AttendanceNavbar from './components/Layouts/AttendanceNavbar';
import SelfServiceNavbar from './components/Layouts/SelfServiceNavbar';
import PayNavbar from './components/Layouts/PayNavbar';
import AssetsNavbar from './components/Layouts/AssetsNavbar';
import OnboardNavbar from './components/Layouts/OnboardNavbar';
import OnboardingNavbar from './components/Layouts/OnboardingNavbar';
import MgmtNavbar from './components/Layouts/MgmtNavbar';
import TeamNavbar from './components/Layouts/TeamNavbar';

// Modern V2 Theme & Shadcn Screens (Unchanged)
import ModernLayout from './v2/layouts/ModernLayout';
import ModernHome from './v2/pages/ModernHome';
import ModernEmployees from './v2/pages/ModernEmployees';
import ModernAttendance from './v2/pages/ModernAttendance';
import ModernLeaves from './v2/pages/ModernLeaves';
import ModernPayroll from './v2/pages/ModernPayroll';
import ModernProfile from './v2/pages/ModernProfile';
import ModernLogin from './v2/pages/ModernLogin';
import ModernTeams from './v2/pages/ModernTeams';
import ModernRequests from './v2/pages/ModernRequests';

// V1 Pages - Route-Level Code Splitting (lazy loading)
const Login = lazy(() => import('./pages/Login'));
const Home = lazy(() => import('./pages/Home'));
const Attendance = lazy(() => import('./pages/Attendance/Attendance'));
const Profile = lazy(() => import('./pages/profile/Profile'));
const RaiseHRRequests = lazy(() => import('./pages/profile/HRRequests'));
const MyAssets = lazy(() => import('./pages/profile/MyAssets'));

const ApplyLeave = lazy(() => import('./pages/leaves/ApplyLeave'));
const LeaveDashboard = lazy(() => import('./pages/leaves/LeaveDashboard'));
const LeaveManagement = lazy(() => import('./pages/leaves/LeaveManagement'));

const AssetDashboard = lazy(() => import('./pages/assets/AssetDashboard'));
const AssetListTab = lazy(() => import('./pages/assets/AssetListTab'));
const AssetRequests = lazy(() => import('./pages/assets/AssetRequests'));

const AttendanceHistory = lazy(() => import('./pages/Attendance/AttendanceHistory'));
const Timesheet = lazy(() => import('./pages/Timesheet/Timesheet'));
const TimesheetDashboard = lazy(() => import('./pages/Attendance/TimesheetDashboard'));

const NewEmployee = lazy(() => import('./pages/EmployeeHub/NewEmployee'));
const OnboardingProgress = lazy(() => import('./pages/EmployeeHub/OnboardingProgress'));
const EmployeeManagement = lazy(() => import('./pages/EmployeeHub/EmployeeManagement'));
const HubDashboard = lazy(() => import('./pages/EmployeeHub/HubDashboard'));

const HRRequests = lazy(() => import('./pages/HRRequests/HRRequests'));
const Management = lazy(() => import('./pages/Management/Management'));
const Teams = lazy(() => import('./pages/Teamss/Teams'));
const MyTeam = lazy(() => import('./pages/Teamss/MyTeam'));

const Events = lazy(() => import('./pages/Management/Events'));
const Holidays = lazy(() => import('./pages/Management/Holidays'));
const MgmtAnnouncements = lazy(() => import('./pages/Management/MgmtAnnouncements'));

// Onboarding Forms
const PersonalInfoForm = lazy(() => import('./pages/Onboarding/PersonalInfoForm'));
const ContactAddressForm = lazy(() => import('./pages/Onboarding/ContactAddressForm'));
const EducationForm = lazy(() => import('./pages/Onboarding/EducationForm'));
const ExperienceForm = lazy(() => import('./pages/Onboarding/ExperienceForm'));
const SkillsCertsForm = lazy(() => import('./pages/Onboarding/SkillsCertsForm'));
const BankForm = lazy(() => import('./pages/Onboarding/BankForm'));
const ReviewSubmitForm = lazy(() => import('./pages/Onboarding/ReviewSubmitForm'));

// V1 Payroll Pages
const PayHome = lazy(() => import('./pages/PayRollall/pay/PayHome'));
const SalarySlip = lazy(() => import('./pages/PayRollall/pay/SalarySlip'));
const OffCyclePayslip = lazy(() => import('./pages/PayRollall/pay/OffCyclePayslip'));
const PayRegister = lazy(() => import('./pages/PayRollall/pay/PayRegister'));
const CompensationPlan = lazy(() => import('./pages/PayRollall/pay/CompensationPlan'));
const VPF = lazy(() => import('./pages/PayRollall/pay/VPF'));

const ReimbursementSubmission = lazy(() => import('./pages/PayRollall/reiumbursment/ReimbursementSubmission'));
const ReimbursementSlip = lazy(() => import('./pages/PayRollall/reiumbursment/ReimbursementSlip'));
const ReimbursementClaimHistory = lazy(() => import('./pages/PayRollall/reiumbursment/ClaimHistory'));

const TaxComputation = lazy(() => import('./pages/PayRollall/Tax/TaxComputation'));
const TaxCalculations = lazy(() => import('./pages/PayRollall/Tax/TaxCalculations'));
const TaxDeclarations = lazy(() => import('./pages/PayRollall/Tax/TaxDeclarations'));
const ProofSubmission = lazy(() => import('./pages/PayRollall/Tax/ProofSubmission'));
const Form16Details = lazy(() => import('./pages/PayRollall/Tax/Form16Details'));

const MyTickets = lazy(() => import('./pages/PayRollall/Helpdesk/MyTickets'));
const EmployeeProfile = lazy(() => import('./pages/PayRollall/Utilities/EmployeeProfile'));
const AadharPanLink = lazy(() => import('./pages/PayRollall/Utilities/AadharPanLink'));
const ESI = lazy(() => import('./pages/PayRollall/Utilities/ESI'));
const Form11 = lazy(() => import('./pages/PayRollall/Utilities/Form11'));
const ContributionFund = lazy(() => import('./pages/PayRollall/Utilities/ContributionFund'));

const PayDashboard = lazy(() => import('./pages/PayRollall/Admin/PayDashboard'));
const SalaryStructure = lazy(() => import('./pages/PayRollall/HR/SalaryStructure'));
const EmployeePaySettings = lazy(() => import('./pages/PayRollall/HR/EmployeePaySettings'));
const LeaveAdjustments = lazy(() => import('./pages/PayRollall/HR/LeaveAdjustments'));
const PayrollRemarks = lazy(() => import('./pages/PayRollall/HR/PayrollRemarks'));
const PayrollSettings = lazy(() => import('./pages/PayRollall/HR/PayrollSettings'));
const OffCyclePay = lazy(() => import('./pages/PayRollall/HR/OffCyclePay'));
const AttendanceImport = lazy(() => import('./pages/PayRollall/HR/AttendanceImport'));

const RunPayroll = lazy(() => import('./pages/PayRollall/Finance/RunPayroll'));
const DeclarationsApproval = lazy(() => import('./pages/PayRollall/Finance/DeclarationsApproval'));
const ReimbursmentApprovals = lazy(() => import('./pages/PayRollall/Finance/ReimbursmentApprovals'));
const BankAdvice = lazy(() => import('./pages/PayRollall/Finance/BankAdvice'));
const FinalSettlement = lazy(() => import('./pages/PayRollall/Finance/FinalSettlement'));
const TDSSummary = lazy(() => import('./pages/PayRollall/Finance/TDSSummary'));
const FinanceReports = lazy(() => import('./pages/PayRollall/Finance/FinanceReports'));
const AuditLog = lazy(() => import('./pages/PayRollall/Finance/AuditLog'));
const PayoutApprovals = lazy(() => import('./pages/PayRollall/Finance/PayoutApprovals'));

const TaxSetupMock = lazy(() => import('./pages/PayRollall/Admin/TaxSetupMock'));
const OrganizationSetup = lazy(() => import('./pages/PayRollall/Admin/OrganizationSetup'));
const PayComponentMaster = lazy(() => import('./pages/PayRollall/Admin/PayComponentMaster'));
const SalaryStructureTemplates = lazy(() => import('./pages/PayRollall/Admin/SalaryStructureTemplates'));
const PayrollConfiguration = lazy(() => import('./pages/PayRollall/Admin/PayrollConfiguration'));
const ImportTools = lazy(() => import('./pages/PayRollall/Admin/ImportTools'));
const DocumentManagement = lazy(() => import('./pages/PayRollall/Admin/DocumentManagement'));
const AuditLogs = lazy(() => import('./pages/PayRollall/Admin/AuditLogs'));
const TaxConfig = lazy(() => import('./pages/PayRollall/Admin/TaxConfig'));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <Suspense fallback={<PageSkeleton />}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="/v1/login"
          element={
            <Suspense fallback={<PageSkeleton />}>
              <Login />
            </Suspense>
          }
        />
        <Route path="/v2/login" element={<ModernLogin />} />

        {/* Modern V2 Theme & Screens — DEFAULT Experience */}
        <Route
          path="/v2"
          element={
            <ProtectedRoute>
              <ModernLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/v2/home" replace />} />
          <Route path="home" element={<ModernHome />} />
          <Route path="employees" element={<ModernEmployees />} />
          <Route path="teams" element={<ModernTeams />} />
          <Route path="attendance" element={<ModernAttendance />} />
          <Route path="leaves" element={<ModernLeaves />} />
          <Route path="payroll" element={<ModernPayroll />} />
          <Route path="requests" element={<ModernRequests />} />
          <Route path="profile" element={<ModernProfile />} />
        </Route>

        <Route
          path="/onboarding"
          element={
            <ProtectedRoute>
              <OnboardingNavbar />
            </ProtectedRoute>
          }
        >
          <Route path="personal-info" element={<PersonalInfoForm />} />
          <Route path="contact-address" element={<ContactAddressForm />} />
          <Route path="education" element={<EducationForm />} />
          <Route path="experience" element={<ExperienceForm />} />
          <Route path="skills-certs" element={<SkillsCertsForm />} />
          <Route path="bank-tax" element={<BankForm />} />
          <Route path="review" element={<ReviewSubmitForm />} />
        </Route>

        {/* Root Route — Defaults to V2 Modern UI */}
        <Route path="/" element={<Navigate to="/v2/home" replace />} />

        {/* Dedicated V1 Classic UI Application Route */}
        <Route
          path="/v1"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<Home />} />

          <Route path="attendance" element={<Attendance />} />

          <Route path="profile" element={<SelfServiceNavbar />}>
            <Route index element={<Profile />} />
            <Route path="profile" element={<Profile />} />
            <Route path="assets" element={<MyAssets />} />
            <Route path="hr-requests" element={<RaiseHRRequests />} />
          </Route>

          <Route path="assets" element={<AssetsNavbar />}>
            <Route path="dashboard" element={<AssetDashboard />} />
            <Route path="list" element={<AssetListTab />} />
            <Route path="requests" element={<AssetRequests />} />
          </Route>

          <Route path="leaves/*" element={<LeaveNavbar />}>
            <Route index element={<Navigate to="apply" replace />} />
            <Route path="apply" element={<ApplyLeave />} />
            <Route path="dashboard" element={<LeaveDashboard />} />
            <Route path="management" element={<LeaveManagement />} />
          </Route>

          <Route path="attendance" element={<AttendanceNavbar />}>
            <Route path="daily" element={<Attendance />} />
            <Route path="AttendanceHistory" element={<AttendanceHistory />} />
            <Route path="timesheet" element={<Timesheet />} />
            <Route path="timesheetdashboard" element={<TimesheetDashboard />} />
          </Route>

          <Route path="employeehub" element={<OnboardNavbar />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<HubDashboard />} />
            <Route path="new-employee" element={<NewEmployee />} />
            <Route path="progress" element={<OnboardingProgress />} />
            <Route path="employeesdata" element={<EmployeeManagement />} />
          </Route>

          <Route path="mgmt" element={<MgmtNavbar />}>
            <Route path="announcements" element={<MgmtAnnouncements />} />
            <Route path="events" element={<Events />} />
            <Route path="holidays" element={<Holidays />} />
          </Route>

          <Route path="team" element={<TeamNavbar />}>
            <Route path="allteams" element={<Teams />} />
            <Route path="myteam" element={<MyTeam />} />
          </Route>

          <Route path="hrrequests" element={<HRRequests />} />
          <Route path="management" element={<Management />} />

          <Route path="pay" element={<PayNavbar />}>
            <Route path="pay" element={<PayHome />} />
            <Route path="pay/pay-slip" element={<SalarySlip />} />
            <Route path="pay/offcycle-slip" element={<OffCyclePayslip />} />
            <Route path="pay/pay-register" element={<PayRegister />} />
            <Route path="pay/compensation-plan" element={<CompensationPlan />} />
            <Route path="pay/vpf" element={<VPF />} />
            <Route path="reimbursment/submission" element={<ReimbursementSubmission />} />
            <Route path="reimbursment/slip" element={<ReimbursementSlip />} />
            <Route path="reimbursment/history" element={<ReimbursementClaimHistory />} />
            <Route path="tax/computation" element={<TaxComputation />} />
            <Route path="tax/calculations" element={<TaxCalculations />} />
            <Route path="tax/declarations" element={<TaxDeclarations />} />
            <Route path="tax/proof-submission" element={<ProofSubmission />} />
            <Route path="tax/form16" element={<Form16Details />} />
            <Route path="helpdesk/tickets" element={<MyTickets />} />
            <Route path="utilities/profile" element={<EmployeeProfile />} />
            <Route path="utilities/aadharpan" element={<AadharPanLink />} />
            <Route path="utilities/esi" element={<ESI />} />
            <Route path="utilities/form11" element={<Form11 />} />
            <Route path="utilities/fund" element={<ContributionFund />} />
            <Route path="dashboard" element={<PayDashboard />} />
            <Route path="hr/salary-structure" element={<SalaryStructure />} />
            <Route path="hr/employee-pay-settings" element={<EmployeePaySettings />} />
            <Route path="hr/leave-adjustments" element={<LeaveAdjustments />} />
            <Route path="hr/payroll-remarks" element={<PayrollRemarks />} />
            <Route path="hr/payroll-settings" element={<PayrollSettings />} />
            <Route path="hr/offcycle-pay" element={<OffCyclePay />} />
            <Route path="hr/attendance-import" element={<AttendanceImport />} />
            <Route path="finance/payroll-run" element={<RunPayroll />} />
            <Route path="finance/declarations" element={<DeclarationsApproval />} />
            <Route path="finance/rmb" element={<ReimbursmentApprovals />} />
            <Route path="finance/bank-advice" element={<BankAdvice />} />
            <Route path="finance/final-settlement" element={<FinalSettlement />} />
            <Route path="finance/tds-summary" element={<TDSSummary />} />
            <Route path="finance/reports" element={<FinanceReports />} />
            <Route path="finance/audit-log" element={<AuditLog />} />
            <Route path="finance/payout-approvals" element={<PayoutApprovals />} />
            <Route path="admin/tax-config" element={<TaxSetupMock />} />
            <Route path="admin/organization-setup" element={<OrganizationSetup />} />
            <Route path="admin/pay-component-master" element={<PayComponentMaster />} />
            <Route path="admin/salary-structure-templates" element={<SalaryStructureTemplates />} />
            <Route path="admin/payroll-config" element={<PayrollConfiguration />} />
            <Route path="admin/import-tools" element={<ImportTools />} />
            <Route path="admin/document-management" element={<DocumentManagement />} />
            <Route path="admin/audit-logs" element={<AuditLogs />} />
            <Route path="admin/tax-slab-setup" element={<TaxConfig />} />
          </Route>
        </Route>

        {/* Legacy Unprefixed Route Compatibility Redirects */}
        <Route path="/home" element={<Navigate to="/v1/home" replace />} />
        <Route path="/attendance/*" element={<Navigate to="/v1/attendance/daily" replace />} />
        <Route path="/profile/*" element={<Navigate to="/v1/profile/profile" replace />} />
        <Route path="/assets/*" element={<Navigate to="/v1/assets/dashboard" replace />} />
        <Route path="/leaves/*" element={<Navigate to="/v1/leaves/dashboard" replace />} />
        <Route path="/employeehub/*" element={<Navigate to="/v1/employeehub/dashboard" replace />} />
        <Route path="/mgmt/*" element={<Navigate to="/v1/mgmt/announcements" replace />} />
        <Route path="/team/*" element={<Navigate to="/v1/team/allteams" replace />} />
        <Route path="/hrrequests" element={<Navigate to="/v1/hrrequests" replace />} />
        <Route path="/management" element={<Navigate to="/v1/management" replace />} />
        <Route path="/pay/*" element={<Navigate to="/v1/pay/pay" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
