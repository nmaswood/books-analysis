import SearchBar from "./SearchBar"
export default function Hero() {
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-text dark:text-text-dark text-6xl text-bold capitalize text-center">Serach & <span className="text-primary dark:text-primary-dark">Discover</span><br /> your next book</h1>
            <p className="text-text dark:text-text-dark py-4 text-center">Just need to put in an ID and you are seconds away <br/> from your next literary obsession for <span className="text-primary dark:text-primary-dark font-medium">FREE</span>.</p>
            <SearchBar />
        </div>
    )
}