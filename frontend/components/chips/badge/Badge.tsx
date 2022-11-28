'use client';

export interface IBadge {
  title: string;
}

const Badge: React.FC<IBadge> = ({ title }) => {
  return (
    <span className=" bg-slate-400 bg-opacity-80 text-slate-100 backdrop-blur-lg px-3 py-1 rounded-lg text-xs z-20 mb-4">
      {title}
    </span>
  );
};

export default Badge;
