import Link from "next/link"
import { FaGithub } from "react-icons/fa";


export default function Footer() {
    return (
        <div className="mt-10 bg-secondary dark:bg-secondary-dark bg-opacity-50">
            <div className=" px-6 md:px-24 py-6 flex justify-between bottom-0 w-full">
                <Link href="/" className="text-primary dark:text-primary-dark font-semibold text-xl">Gutenberg.</Link>
                <span className="hidden sm:block text-text dark:text-text-dark text-sm">Copyright &copy; 2024 Gutenberg</span>
                <a href="/" target="_blank" rel="noopener noreferrer" className="hover:opacity-90">
                    <FaGithub className="text-text dark:text-text-dark h-6 w-6" />
                </a>
            </div>
            <span className="pt-2 text-center block sm:hidden text-text dark:text-text-dark text-sm">Copyright &copy; 2024 Gutenberg</span>
            </div>
    )
}