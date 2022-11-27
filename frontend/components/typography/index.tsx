import React from 'react';

export const H1 = ({ children, className }: { children: string; className?: string }) => {
  return <h1 className={`text-xl text-white text-bold ${className}`}>{children}</h1>;
};

export const H2 = ({ children, className }: { children: string; className?: string }) => {
  return <h2 className={`text-lg text-white text-bold ${className}`}>{children}</h2>;
};

export const H3 = ({ children, className }: { children: string; className?: string }) => {
  return <h3 className={`text-bold text-white leading-4 ${className}`}>{children}</h3>;
};

export const H4 = ({ children, className }: { children: string; className?: string }) => {
  return <h4 className={`text-sm text-white text-bold leading-4 ${className}`}>{children}</h4>;
};

export const P = ({ children, className }: { children: string; className?: string }) => {
  return <p className={`text-sm text-white text-bold leading-4 ${className}`}>{children}</p>;
};
