import React from 'react';

export interface IPrimaryLayout {
  children: React.ReactNode;
}

const PrimaryLayout: React.FC<IPrimaryLayout> = ({ children }) => {
  return <div className=" w-screen bg-secondary_d pt-16">{children}</div>;
};

export default PrimaryLayout;
