"use client"
import BookCard from "@/components/BookCard"
import { Book } from "@/components/BookDetails";

export default function Page() {
    const savedBooks: Book[] = JSON.parse(localStorage.getItem('books') || '[]');

    return (
        <div className="px-6 md:px-24">
            <div className="mb-10">
                <div className="flex justify-center pb-16">
                        <h2 className="text-3xl font-medium text-text dark:text-text-dark relative flex flex-col justify-end z-10 before:absolute before:content-[''] before:opacity-30 before:bg-accent before:dark:bg-accent-dark before:h-[13%] before:w-full before:transform before:-skew-x-12">
                            Recently Viewed
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {
                        savedBooks.map((book: Book, index: number) => (
                            <div key={index} className="bg-secondary dark:bg-secondary-dark rounded-lg p-6 bg-opacity-50">
                                <BookCard book={book} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}