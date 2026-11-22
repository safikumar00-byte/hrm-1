import React, { useEffect, useState } from 'react';
import './PayHome.css';
import DashboardCard from '../../../components/PayHome/DashboardCard';
import PayslipSection from '../../../components/PayHome/PayslipSection';
import { getToken } from '../../../utils/auth';
import { fetchAvailableLeaves } from '../../../api/leave';
import { fetchPayregister } from '../../../api/payslips';
import { PayrollSkeleton } from '../../../components/skeletons/PayrollSkeleton';

const PayHome = () => {
  const [lopDays, setLopDays] = useState(0);
  const [netSalary, setNetSalary] = useState(0);
  const [leaveBalance, setLeaveBalance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    const token = getToken();

    if (!token) {
      setError('Unauthorized. Please login again.');
      setLoading(false);
      return;
    }

    const loadData = async () => {
      try {
        const [leaveData, payRegisterData] = await Promise.all([
          fetchAvailableLeaves(token).catch((err) => {
            console.warn('Leaves fetch note:', err.message || err);
            return null;
          }),
          fetchPayregister(token).catch((err) => {
            console.warn('Pay register fetch note:', err.message || err);
            return [];
          }),
        ]);

        if (!isMounted) return;

        const currentYear = new Date().getFullYear();
        const registerList = Array.isArray(payRegisterData)
          ? payRegisterData
          : Array.isArray(payRegisterData?.payslips)
          ? payRegisterData.payslips
          : Array.isArray(payRegisterData?.data)
          ? payRegisterData.data
          : [];

        const currentYearPayslips = registerList.filter((p) => p && Number(p.year) === currentYear);

        const totalNetSalary = currentYearPayslips.reduce(
          (sum, p) => sum + (Number(p.netPay) || Number(p.amount) || 0),
          0
        );
        const totalLop = currentYearPayslips.reduce(
          (sum, p) => sum + (Number(p.lopDays) || 0),
          0
        );

        setNetSalary(totalNetSalary);
        setLopDays(totalLop);

        // Normalize leave balance safely
        let leavesList = [];
        if (Array.isArray(leaveData)) {
          leavesList = leaveData;
        } else if (Array.isArray(leaveData?.leaves)) {
          leavesList = leaveData.leaves;
        } else if (Array.isArray(leaveData?.data)) {
          leavesList = leaveData.data;
        } else if (leaveData?.summary?.total) {
          leavesList = Object.entries(leaveData.summary.total).map(([type, total]) => ({
            leaveType: `${type} Leave`,
            balance: total,
          }));
        }

        setLeaveBalance(leavesList);
      } catch (err) {
        console.error('PayHome loadData error:', err);
        if (isMounted) setError('Failed to load dashboard data');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) return <PayrollSkeleton />;
  if (error) return <div className="dashboard-container error-message">{error}</div>;

  return (
    <div className="dashboard-container">
      <h2>Payroll Dashboard</h2>

      {/* KPI Cards */}
      <div className="dashboard-grid">
        <DashboardCard title="Net Salary (YTD)" value={`₹ ${netSalary.toLocaleString()}`} />
        <DashboardCard title="LOP Days (YTD)" value={lopDays} />
      </div>

      {/* Leave Summary */}
      {Array.isArray(leaveBalance) && leaveBalance.length > 0 && (
        <div className="dashboard-section">
          <h3>Leave Balance</h3>
          <div className="dashboard-grid">
            {leaveBalance.map((leave, idx) => (
              <DashboardCard
                key={idx}
                title={leave.leaveType || 'Leave'}
                value={leave.balance ?? '—'}
              />
            ))}
          </div>
        </div>
      )}

      {/* Payslip Preview Section */}
      <div className="dashboard-section">
        <PayslipSection />
      </div>
    </div>
  );
};

export default PayHome;
