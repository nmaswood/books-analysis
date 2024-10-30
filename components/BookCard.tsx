import { Book } from "./BookDetails"
import Link from "next/link"
import Image from "next/image"

export default function BookCard({ book }: { book: Book }) {
    return (
        <div className="flex flex-col h-full">
            <div className="flex justify-center">
                <Image src={book.coverArt} className="rounded-lg h-[300px] w-auto" width={200} height={300} alt={`Cover art of ${book.title}`} />

            </div>
            <span className="text-sm text-primary dark:text-primary-dark pt-4">Published on {book.publishedDate}</span>
            <div className="flex flex-col flex-grow justify-between">
                <h4 className="text-text dark:text-text-dark text-xl py-3">{book.title}</h4>
                <Link href={`/books/${book.id}`}
                    className="py-2 px-4 rounded-lg bg-primary dark:bg-primary-dark text-white w-fit hover:opacity-90">
                    <span>Details</span>
                </Link>

            </div>
        </div>
    )
}
