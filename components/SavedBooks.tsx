"use client"
import { Book } from "./BookDetails"
import { useEffect, useState } from "react"
import Link from "next/link"
import BookCard from "./BookCard"
import { FaArrowRightLong } from "react-icons/fa6";


export default function SavedBooks({ book }: { book?: Book }) {
    const [savedBooks, setSavedBooks] = useState<Book[]>([]);
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
        const booksFromLocalStorage: Book[] = JSON.parse(localStorage.getItem('books') || '[]');
        setSavedBooks(booksFromLocalStorage);
    }, [])

    useEffect(() => {
        if (book) {
            setSavedBooks((prevBooks) => {
                // ignore the current book
                if (!prevBooks.find((savedBook) => savedBook.id === book.id)) {
                    const updatedBooks = [...prevBooks, book];
                    localStorage.setItem("books", JSON.stringify(updatedBooks));
                    return updatedBooks;
                }
                return prevBooks;
            });
        }
    }, [book]);

    if (!isClient) return null;


    return savedBooks && savedBooks.filter((savedBook) => savedBook.id !== book?.id).length >= 1 ? (
        <div className="mb-10">
            <div className="flex justify-between pt-24 pb-16">
                <div className="flex-1 flex justify-center">
                    <h2 className="text-3xl font-medium text-text dark:text-text-dark relative flex flex-col justify-end z-10 before:absolute before:content-[''] before:opacity-30 before:bg-accent before:dark:bg-accent-dark before:h-[13%] before:w-full before:transform before:-skew-x-12">
                        Recently Viewed
                    </h2>
                </div>
                <Link href="/books/viewed" className="hidden border sm:border-primary dark:border-primary-dark text-primary dark:text-primary-dark sm:flex items-center rounded-lg md:px-4 px-2 md:py-2 py-1 gap-2 md:gap-3 group hover:opacity-90">
                    <span className="text-lg">See all</span>
                    <FaArrowRightLong className="h-5 w-5 transform transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
                </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {
                    savedBooks.filter((savedBook) => savedBook.id !== book?.id).slice(0, 8).map((book: Book) => (
                        <div key={book.id} className="bg-secondary dark:bg-secondary-dark rounded-lg p-6 bg-opacity-50">
                            <BookCard book={book} />
                        </div>
                    ))
                }
            </div>
            <div className="flex justify-center pt-6">
                <Link href="/books/viewed" className="border border-primary dark:border-primary-dark text-primary dark:text-primary-dark flex sm:hidden items-center rounded-lg px-6 py-2 gap-5 group hover:opacity-90 w-fit">
                    <span className="text-lg">See all</span>
                    <FaArrowRightLong className="h-5 w-5 transform transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
                </Link>
            </div>
        </div>
    ) : null;
}

