import React from 'react';

const StatusBadge = ({ status }) => {
  const text = status || 'Pending';
  const normalized = text.trim().toLowerCase();

  let statusClass = 'status-pending';

  if (['approved', 'resolved', 'completed', 'active', 'available', 'paid', 'present'].includes(normalized)) {
    statusClass = 'status-approved';
  } else if (['pending', 'in progress', 'in-progress', 'inprogress', 'assigned', 'in repair', 'on leave', 'wfh'].includes(normalized)) {
    statusClass = 'status-pending';
  } else if (['rejected', 'failed', 'cancelled', 'retired', 'lost', 'disabled', 'inactive', 'absent'].includes(normalized)) {
    statusClass = 'status-rejected';
  }

  return <span className={`status-badge ${statusClass}`}>{text}</span>;
};

export default StatusBadge;
