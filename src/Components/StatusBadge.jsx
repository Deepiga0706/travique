import React from 'react';

const STATUS_STYLE = {
  'Pending Review': { label: 'Pending Review', style: { background: 'rgba(245, 158, 11, 0.12)', color: '#92400E', border: '1px solid rgba(245, 158, 11, 0.35)' } },
  'Quote Sent': { label: 'Quote Sent', style: { background: 'rgba(59, 130, 246, 0.10)', color: '#1D4ED8', border: '1px solid rgba(59, 130, 246, 0.30)' } },
  Accepted: { label: 'Accepted', style: { background: 'rgba(16, 185, 129, 0.10)', color: '#047857', border: '1px solid rgba(16, 185, 129, 0.30)' } },
  Rejected: { label: 'Rejected', style: { background: 'rgba(239, 68, 68, 0.10)', color: '#B91C1C', border: '1px solid rgba(239, 68, 68, 0.30)' } },
  Cancelled: { label: 'Cancelled', style: { background: 'rgba(148, 163, 184, 0.15)', color: '#334155', border: '1px solid rgba(148, 163, 184, 0.35)' } },
};

export default function StatusBadge({ status }) {
  const key = status || '';
  const cfg = STATUS_STYLE[key] || { label: status || 'Pending Review', style: { background: 'rgba(0,0,0,0.05)', color: '#0f172a', border: '1px solid rgba(0,0,0,0.12)' } };

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '6px 10px',
        borderRadius: 999,
        fontWeight: 900,
        fontSize: '0.82rem',
        gap: 8,
        ...cfg.style,
      }}
    >
      {key}
    </span>
  );
}

