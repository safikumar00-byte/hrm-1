import React, { useEffect, useState } from 'react';
import './PayPage.css';
import { getToken } from '../../../utils/auth';
import { fetchProfile } from '../../../api/services';
import { fetchPayregister } from '../../../api/payslips';
import formatDate from '../../../components/common/FormatDate'

const PayRegister = () => {
  const [registerData, setRegisterData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setError('Unauthorized: No token found');
      setLoading(false);
      return;
    }

    const loadData = async () => {
      try {
        const data = await fetchPayregister(token);
        const list = Array.isArray(data) ? [...data] : [];
        list.sort((a, b) =>
          Number(b.year) !== Number(a.year) ? Number(b.year) - Number(a.year) : Number(b.month) - Number(a.month)
        );
        setRegisterData(list);
        const profileData = await fetchProfile(token);
        setProfile(profileData);
      } catch (err) {
        setError('Failed to load pay register');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const getMonthName = (month) => {
    if (!month && month !== 0) return 'Unknown';
    const num = Number(month);
    if (!isNaN(num) && num >= 1 && num <= 12) {
      return new Date(2000, num - 1).toLocaleString('default', { month: 'long' });
    }
    return String(month);
  };

  return (
    <div className="pay-page">
    
      <table className="tax-table">
        <tbody>
          <tr>
            <td><strong>Employee ID</strong></td>
            <td>{profile?.employeeId}</td>
            <td><strong>Employee Name</strong></td>
            <td>{profile?.fullName}</td>
          </tr>
          <tr>
            <td><strong>Date of Joining</strong></td>
            <td>{formatDate(profile?.dateOfJoining)}</td>
            <td><strong>Designation</strong></td>
            <td>{profile?.position}</td>
          </tr>
        </tbody>
      </table>

      <h2>Pay Register</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : registerData.length === 0 ? (
        <p>No pay register data found.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Month</th>
              <th>Gross</th>
              <th>Deductions</th>
              <th>Net</th>
              <th>LOP</th>
              <th>Status</th>
              <th>Processed Date</th>
            </tr>
          </thead>
          <tbody>
            {registerData.map((row, idx) => (
              <tr key={row.id || idx}>
                <td>{`${getMonthName(row.month)} ${row.year || ''}`}</td>
                <td>₹{(row.gross ?? 0).toLocaleString()}</td>
                <td>₹{(row.deductions ?? 0).toLocaleString()}</td>
                <td>₹{(row.netPay ?? 0).toLocaleString()}</td>
                <td>{row.lopDays ?? 0}</td>
                <td>{row.status || 'Processed'}</td>
                <td>{formatDate(row.processedDate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PayRegister;
