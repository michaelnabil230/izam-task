interface PaginationProps {
    last_page: number;
    page: number;
    paginate: (page: number) => void;
}

function Pagination({ last_page, page, paginate }: PaginationProps) {
    const handlePaginate = (page: number, event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        paginate(page);
    };

    return (
        <div className="mt-6 flex items-center justify-between gap-2">
            <button
                onClick={(e) => handlePaginate(page - 1, e)}
                disabled={page === 1}
                className="inline-flex items-center gap-1 rounded border border-gray-300 px-3 py-1 text-sm disabled:opacity-50"
            >
                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M12.6668 8.26286H3.3335M3.3335 8.26286L8.00016 12.9295M3.3335 8.26286L8.00016 3.59619"
                        stroke="black"
                        strokeWidth="1.67"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                Previous
            </button>

            {Array.from({ length: last_page }, (_, i) => i + 1).map((number) => (
                <button
                    key={number}
                    onClick={(e) => handlePaginate(number, e)}
                    className={`rounded px-3 py-1 text-sm ${page === number ? 'bg-black text-white' : 'border border-gray-300'}`}
                >
                    {number}
                </button>
            ))}

            <button
                onClick={(e) => handlePaginate(page + 1, e)}
                disabled={page === last_page}
                className="inline-flex items-center gap-1 rounded border border-gray-300 px-3 py-1 text-sm disabled:opacity-50"
            >
                Next
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M3.96484 8.75212H13.2982M13.2982 8.75212L8.63151 4.08545M13.2982 8.75212L8.63151 13.4188"
                        stroke="black"
                        strokeWidth="1.67"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
        </div>
    );
}

export default Pagination;
