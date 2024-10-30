'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SearchBar() {
    const [query, setQuery] = useState<null | string>(null)
    const router = useRouter();

    const handleSearch = () => {
        if (query) {
            router.push(`/books/${query}`);
        }
    }

    return (
        <div className="flex w-full max-w-sm items-center space-x-2">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSearch();
                }}
            >
                <div className='flex gap-1'>
                    <input className='rounded-md border py-2 px-3 text-sm focus-visible:ring-1  focus-visible:outline-none shadow-sm'
                        placeholder="Enter book id"
                        onChange={(e) => {
                            setQuery(e.target.value);
                        }}
                    />
                    <button type="submit"
                        onClick={() => handleSearch()}
                        className="py-2 px-4 rounded-lg bg-primary dark:bg-primary-dark text-white w-fit hover:opacity-90">Search</button>

                </div>


            </form>
        </div >
    );
}