interface HeaderProps {
    onMenuClick: () => void;
    title?: string;
}

export default function Header({ onMenuClick, title = "Home" }: HeaderProps) {
    return (
        <div className="flex justify-between items-center p-4">
            <h1 className="text-xl font-semibold">{title}</h1>
            <button
                className="p-2 rounded-full hover:bg-gray-100 transition-colors md:hidden"
                onClick={onMenuClick}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 6h16M4 12h16m-7 6h7"
                    />
                </svg>
            </button>
        </div>
    );
}
