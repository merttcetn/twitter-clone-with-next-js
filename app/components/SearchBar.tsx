interface SearchBarProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

export default function SearchBar({
    searchQuery,
    setSearchQuery,
}: SearchBarProps) {
    return (
        <div className="px-4 pb-4">
            <div className="relative flex items-center">
                <div className="absolute left-4 text-gray-400">
                    <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>
                <input
                    type="text"
                    placeholder="Search Posts"
                    className="w-full py-3.5 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-2xl 
                             text-[15px] placeholder-gray-500 focus:border-[#FF7452] focus:ring-1 
                             focus:ring-[#FF7452] transition-colors duration-200 ease-in-out
                             hover:border-gray-300"
                    value={searchQuery}
                    onChange={(e) => {
                        console.log(
                            "Search query for SearchBar: " + e.target.value
                        );
                        setSearchQuery(e.target.value);
                    }}
                />
            </div>
        </div>
    );
}
