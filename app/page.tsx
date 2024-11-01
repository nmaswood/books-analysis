import Hero from '@/components/Hero';
import SavedBooks from '@/components/SavedBooks';

export default async function Home() {
  return (
    <div className="px-6 md:px-24">
        <Hero />
        <SavedBooks />
    </div>
  );
}
