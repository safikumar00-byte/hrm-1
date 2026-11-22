import React, { useEffect, useState } from 'react';
import { fetchPayslipMonths, downloadPayslipPDF } from '../../api/payslips';
import { getToken } from '../../utils/auth';

const PayslipSection = () => {
  const [payslips, setPayslips] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(null);

  const getMonthName = (month) => {
    if (!month && month !== 0) return 'Unknown Month';
    // If numeric month 1-12
    const num = Number(month);
    if (!isNaN(num) && num >= 1 && num <= 12) {
      return new Date(2000, num - 1).toLocaleString('default', { month: 'long' });
    }
    // If string already e.g. "October" or "October 2026"
    return String(month);
  };

  const handleDownload = async (month, year) => {
    const key = `${month}-${year}`;
    try {
      setDownloading(key);
      const token = getToken();
      await downloadPayslipPDF(token, month, year);
    } catch (err) {
      console.error('Download payslip error:', err);
      alert('Download failed. Please try again later.');
    } finally {
      setDownloading(null);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const loadPayslips = async () => {
      try {
        const token = getToken();
        if (!token) {
          if (isMounted) {
            setPayslips([]);
            setLoading(false);
          }
          return;
        }

        const data = await fetchPayslipMonths(token);
        if (!isMounted) return;

        // Safely extract array items
        const rawList = Array.isArray(data)
          ? data
          : Array.isArray(data?.months)
          ? data.months
          : Array.isArray(data?.data)
          ? data.data
          : [];

        // Normalize each payslip record
        const normalized = rawList
          .filter((p) => p && typeof p === 'object')
          .map((p, index) => {
            let m = p.month;
            let y = p.year;

            // Handle string formats like "October 2026"
            if (typeof m === 'string' && !y) {
              const parts = m.trim().split(/\s+/);
              if (parts.length >= 2) {
                m = parts[0];
                y = parseInt(parts[1], 10);
              }
            }

            return {
              id: p.id || `payslip-${index}`,
              month: m,
              year: y || new Date().getFullYear(),
              fileName: p.fileName,
              amount: p.amount,
            };
          });

        // Safe descending sort by year, then month
        normalized.sort((a, b) => {
          const yA = Number(a.year) || 0;
          const yB = Number(b.year) || 0;
          if (yB !== yA) return yB - yA;

          const mA = Number(a.month) || 0;
          const mB = Number(b.month) || 0;
          return mB - mA;
        });

        setPayslips(normalized);
      } catch (err) {
        console.error('Error fetching payslip months:', err);
        if (isMounted) setPayslips([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadPayslips();

    return () => {
      isMounted = false;
    };
  }, []);

  const safePayslips = Array.isArray(payslips) ? payslips : [];
  const visiblePayslips = showAll ? safePayslips : safePayslips.slice(0, 3);

  return (
    <div className="payslip-section">
      <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#21093D', marginBottom: '14px' }}>
        Recent Payslips
      </h3>

      {loading ? (
        <p style={{ color: '#71677D', fontSize: '14px', margin: '12px 0' }}>Loading payslips...</p>
      ) : safePayslips.length === 0 ? (
        <p style={{ color: '#71677D', fontSize: '14px', margin: '12px 0' }}>No payslips available.</p>
      ) : (
        <>
          <ul className="payslip-list">
            {visiblePayslips.map((p, idx) => {
              const key = `${p.month}-${p.year}`;
              const isItemDownloading = downloading === key;
              return (
                <li key={p.id || idx} className="payslip-item">
                  <span style={{ fontWeight: '500', color: '#21093D' }}>
                    {`${getMonthName(p.month)} ${p.year || ''}`}
                  </span>
                  <button
                    type="button"
                    disabled={isItemDownloading}
                    onClick={() => handleDownload(p.month, p.year)}
                    style={{
                      backgroundColor: isItemDownloading ? '#cccccc' : '#21093D',
                      color: isItemDownloading ? '#666666' : '#FFFFFF',
                      border: 'none',
                      padding: '6px 14px',
                      borderRadius: '6px',
                      cursor: isItemDownloading ? 'not-allowed' : 'pointer',
                      fontWeight: '600',
                      fontSize: '13px',
                      transition: 'background-color 0.2s ease',
                    }}
                  >
                    {isItemDownloading ? 'Downloading...' : 'Download'}
                  </button>
                </li>
              );
            })}
          </ul>

          {safePayslips.length > 3 && (
            <div
              className="view-more-toggle"
              onClick={() => setShowAll((prev) => !prev)}
              style={{
                cursor: 'pointer',
                color: '#21093D',
                fontWeight: '600',
                fontSize: '13px',
                marginTop: '10px',
                textAlign: 'right',
              }}
            >
              {showAll ? '− View Less' : `+ View More (${safePayslips.length - 3} older)`}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PayslipSection;
