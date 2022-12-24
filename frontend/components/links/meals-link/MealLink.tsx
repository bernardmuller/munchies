import Link from 'next/link';
export interface IMealLink {
  sampleTextProp: string;
}

const MealLink = ({ label, path }: { label: string; path: string }) => {
  return (
    <Link href={path} passHref>
      <a>{label}</a>
    </Link>
  );
};

export default MealLink;
