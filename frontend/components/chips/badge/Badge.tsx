'use client';

export interface IBadge {
  title: string;
  size: 'sm' | 'lg';
}

const Badge: React.FC<IBadge> = ({ title, size }) => {
  return (
    <span
      className={`  bg-opacity-40 text-slate-100 backdrop-blur-3xl ${
        size !== 'lg' ? 'px-3 py-1 text-xs' : 'text-md w-[5rem] py-2 text-center'
      } rounded-3xl  z-20`}
    >
      {title}
    </span>
  );
};

export default Badge;
