import SavedBooks from '../components/SavedBooks';
import Hero from '@/components/Hero';

export default async function Home() {

  return (
    <div className="px-6 md:px-24">
        <Hero />
        <SavedBooks />
    </div>
  );
}
