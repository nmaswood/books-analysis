'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { ReloadIcon } from "@radix-ui/react-icons"

export default function SearchBar() {
    const [query, setQuery] = useState<null | string>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleSearch = () => {
        if (query) {
            setIsLoading(true)
            router.push(`/books/${query}`)
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
                    <Button
                        type="submit"
                        onClick={handleSearch}
                        disabled={isLoading}
                        aria-live="polite"
                        className="bg-primary dark:bg-primary-dark text-white flex items-center rounded-lg hover:opacity-90 py-2 px-4">

                        {isLoading ? (
                            <>
                                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                <span>Searching...</span>
                            </>
                        ) : (
                            <span>Search</span>
                        )}
                    </Button>
                </div>
            </form>
        </div >
    );
}