'use client';

export interface IBadge {
  title: string;
  size: 'sm' | 'lg';
}

const Badge: React.FC<IBadge> = ({ title, size }) => {
  return (
    <span
      className={`bg-secondary_400/40 backdrop-blur-lg text-secondary_700 ${
        size !== 'lg' ? 'px-3 py-1 text-xs' : 'text-md w-[5.5rem] py-3 text-center'
      } rounded-3xl  z-20`}
    >
      {title}
    </span>
  );
};

export default Badge;
