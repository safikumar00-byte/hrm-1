import React from 'react';
import './Skeleton.css';

export function Skeleton({ className = '', style = {}, width, height, radius }) {
  const inlineStyle = {
    ...style,
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
    ...(radius ? { borderRadius: radius } : {}),
  };

  return <span className={`cvm-skeleton ${className}`} style={inlineStyle} aria-hidden="true" />;
}

export function SkeletonCard({ className = '', children, style = {} }) {
  return (
    <div className={`cvm-skeleton-card ${className}`} style={style} aria-busy="true" aria-live="polite">
      {children}
    </div>
  );
}
