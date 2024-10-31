import * as cheerio from 'cheerio';
import { Book } from '@/components/BookDetails';
import SavedBooks from '@/components/SavedBooks';
import BookDetails from '@/components/BookDetails';


async function fetchBookData(id: string) {
    const data = await fetch(`https://www.gutenberg.org/ebooks/${id}`)
    const metaText = await data.text()
    const $ = cheerio.load(metaText);
    const title = $("h1[itemprop = 'name']").text()
    const author = $("a[itemprop = 'creator']").text()
    const summary = $("th:contains('Summary')").next().text().replace("(This is an automatically generated summary.)", "")
    const publishedDate = $("td[itemprop = 'datePublished']").text()
    const coverArt = $("img.cover-art").attr("src");
    const downloadLink = $("a[type = 'application/zip']").parent().next().text()
    const readOnlineLink = $("a[type = 'text/html']").parent().next().text()
    const language = $("tr[itemprop= 'inLanguage'] td").text()
    const updatedDate = $("td[itemprop= 'dateModified']").text()

    const metaData: Book = {
        id,
        title: title,
        author: author,
        summary: summary,
        publishedDate: publishedDate,
        coverArt: coverArt as string,
        downloadLink: downloadLink,
        readOnlineLink: readOnlineLink,
        language: language,
        updatedDate: updatedDate
    }

    return metaData
}


export default async function BookPage({ params }: { params: { id: string } }) {
    const { id } = await params
    const bookData: Book = await fetchBookData(id)


    return (
        <div className='px-6 md:px-24'>
            <BookDetails book={bookData} />
            <SavedBooks book={bookData} />
        </div>
    )
}