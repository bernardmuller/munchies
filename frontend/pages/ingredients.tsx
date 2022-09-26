import PageHeader from '../components/headers/page-header/PageHeader';
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import NavBar from '../components/navbar/navbar/NavBar';
import { NextPageWithLayout } from './page';

const Ingredients: NextPageWithLayout = () => {
  return <section>Ingredients</section>;
};

export default Ingredients;

Ingredients.getLayout = (page) => {
  return (
    <PrimaryLayout>
      <PageHeader heading="Ingredients" />
      <div className="px-4">{page}</div>
      <NavBar />
    </PrimaryLayout>
  );
};
