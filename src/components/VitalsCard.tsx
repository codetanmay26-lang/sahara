import React from 'react';

interface VitalsCardProps {
  title: string;
  value: string | number;
  subtext: string;
  icon: React.ReactNode;
  borderLeftColor: string;
}

export const VitalsCard: React.FC<VitalsCardProps> = ({
  title,
  value,
  subtext,
  icon,
  borderLeftColor
}) => {
  return (
    <div 
      className="glass-card" 
      style={{ 
        padding: '1.5rem', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '0.75rem', 
        borderLeft: `4px solid ${borderLeftColor}`,
        transition: 'var(--transition-smooth)'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
          {title}
        </span>
        {icon}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
        <span style={{ fontSize: '2rem', fontWeight: 800 }}>{value}</span>
      </div>
      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
        {subtext}
      </span>
    </div>
  );
};

export default VitalsCard;
