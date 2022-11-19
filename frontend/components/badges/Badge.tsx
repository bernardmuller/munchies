export interface IBadge {
  title: string;
}

const Badge: React.FC<IBadge> = ({ title }) => {
  return (
    <span className=" bg-orange-400 bg-opacity-40 text-orange-500 px-4 py-1.5 rounded-2xl text-sm z-20 mb-4">
      {title}
    </span>
  );
};

export default Badge;
