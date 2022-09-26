import Link from 'next/link';
export interface IMealLink {
  sampleTextProp: string;
}

const MealLink = ({ name, path }: { label: string; path: string }) => {
  return (
    <Link href={path} passHref>
      <a>{name}</a>
    </Link>
  );
};

export default MealLink;
