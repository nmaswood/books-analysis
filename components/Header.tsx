import Link from "next/link"
import ThemeSwitcher from "./ThemeSwitcher"
export default function Header() {

    return (
        <div className="px-6 md:px-24 py-10 flex justify-between items-center">
            <Link href="/" className="text-primary dark:text-primary-dark font-semibold text-xl">Gutenberg.</Link>
            <ThemeSwitcher/>
        </div>
    )
}