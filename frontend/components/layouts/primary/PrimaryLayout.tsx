import React from 'react';

export interface IPrimaryLayout {
  children: React.ReactNode;
}

const PrimaryLayout: React.FC<IPrimaryLayout> = ({ children }) => {
  return (
    <div className="w-screen bg-gradient-to-b from-gradient_t to-secondary_d pb-96">{children}</div>
  );
};

export default PrimaryLayout;
