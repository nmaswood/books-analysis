import SavedBooks from '../components/SavedBooks';
import Hero from '@/components/Hero';
export async function fetchMetaData(query: string) {
  const data = await fetch(`https://www.gutenberg.org/ebooks/${query}`)
  const metaText = await data.text()
  return metaText
}

export default async function Home() {

  return (
    <div className="px-6 md:px-24">
        <Hero />
        <SavedBooks />
    </div>
  );
}
