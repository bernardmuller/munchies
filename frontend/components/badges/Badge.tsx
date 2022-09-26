export interface IBadge {
  title: string;
}

const Badge: React.FC<IBadge> = ({ title }) => {
  return <span className=" text-highlight text-sm z-20 mb-4">{title}</span>;
};

export default Badge;
