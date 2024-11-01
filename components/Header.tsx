import Link from "next/link"
export default function Header() {

    return (
        <div className="px-6 md:px-24 py-10 flex justify-between items-center">
            <Link href="/" className="text-primary dark:text-primary-dark font-semibold text-2xl">Gutenberg.</Link>
        </div>
    )
}