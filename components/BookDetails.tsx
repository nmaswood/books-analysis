"use client";
import Link from "next/link";
import Image from "next/image";
// import {
//     Table,
//     TableBody,
//     TableCaption,
//     TableCell,
//     TableFooter,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"

import { IoSparklesSharp } from "react-icons/io5";
import { useState } from "react";
import { Button } from "@/components/ui/button"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useEffect } from "react";

export interface Book {
    id: string,
    title: string,
    author: string,
    summary: string,
    coverArt: string,
    downloadLink: string,
    readOnlineLink: string,
    publishedDate: string
}

export default function BookDetails({ book }: { book: Book }) {
    const [summary, setSummary] = useState("");
    const [isloading, setIsLoading] = useState(false)
    const { toast } = useToast()


    useEffect(() => {
        const storedSummary = localStorage.getItem(`summary-${book.id}`);
        if (storedSummary) {
            setSummary(storedSummary);
        }
    }, [book.id]);

    async function handleAnalysis(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        setIsLoading(true)
        try {
            const response = await fetch(`/api/text-analysis?id=${book.id}`)

            const updatedSummary = await response.json()
            setSummary(updatedSummary);
            localStorage.setItem(`summary-${book.id}`, updatedSummary);

            setIsLoading(false)
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: error.message,
                    className: "bg-red-500 text-white"
                });
            } else {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "An unknown error occurred.",
                    className: "bg-red-500 text-white"
                });
            }
        } finally {
            setIsLoading(false);
        }

    }

    return (
        <div className="flex gap-6 flex-col md:flex-row">
            <div className="flex-shrink-0">
                <Image src={book.coverArt} className="rounded-lg h-[300px] w-auto" width={200} height={300} alt={`Cover art of ${book.title}`} />
                <div className="flex gap-2 pt-2">
                    <Link href={`${book.downloadLink}`} className="text-primary dark:text-primary-dark underline hover:opacity-90">Download</Link>
                    <a target="_blank" href={`${book.readOnlineLink}`} rel="noopener noreferrer" className="text-primary dark:text-primary-dark underline hover:opacity-90">Read Online</a>
                </div>
            </div>

            <div>
                <h2 className="text-text dark:text-text-dark text-4xl font-semibold">{book.title}</h2>
                <p className="text-text dark:text-text-dark py-4">{summary}</p>
                {isloading ?
                    <Button disabled className="text-white"
                    >
                        Generating summary
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    </Button>
                    :
                    <Button
                        onClick={handleAnalysis}
                        className="bg-primary dark:bg-primary-dark text-white flex items-center rounded-lg hover:opacity-90 py-2 px-4">
                        <span>Generate summary</span>
                        <IoSparklesSharp className="mr-2 h-4 w-4" />
                    </Button>
                }
            </div>
        </div>
    )
}
