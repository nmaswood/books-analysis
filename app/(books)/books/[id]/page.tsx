import * as cheerio from 'cheerio';
import { Book } from '@/components/BookDetails';
import SavedBooks from '@/components/SavedBooks';
import BookDetails from '@/components/BookDetails';


async function fetchBookData(id: string) {
    try {
        const data = await fetch(`https://www.gutenberg.org/ebooks/${id}`)
        const metaText = await data.text()
        const $ = cheerio.load(metaText);
        const title = $("h1[itemprop='name']").text() || "Unknown Title";
        const author = $("a[itemprop='creator']").text() || "Unknown Author";
        const publishedDate = $("td[itemprop='datePublished']").text() || "Unknown Date";
        const coverArt = $("img.cover-art").attr("src");
        const downloadLink = $("a[type='application/zip']").attr("href") || "";
        const readOnlineLink = $("a[type='text/html']").attr("href") || "";
        const language = $("tr[itemprop='inLanguage'] td").text() || "Unknown Language";
        const updatedDate = $("td[itemprop='dateModified']").text() || "Unknown Date";

        const metaData: Book = {
            id,
            title: title,
            author: author,
            publishedDate: publishedDate,
            coverArt: coverArt as string,
            downloadLink: downloadLink,
            readOnlineLink: readOnlineLink,
            language: language,
            updatedDate: updatedDate
        }

        return metaData
    } catch (error) {
        console.error("Error fetching book data:", error);
        return null;
    }
}


export default async function BookPage({ params }: { params: { id: string } }) {
    const { id } = await params
    const bookData: Book | null = await fetchBookData(id)

    if (!bookData) {
        return <div className='text-red-500'>Error loading book data. Please try again later.</div>;
    }


    return (
        <div className='px-6 md:px-24'>
            <BookDetails book={bookData} />
            <SavedBooks book={bookData} />
        </div>
    )
}