export default function PaginationComponent({currentPage, totalPages, handlePrevious, handleNext, handlePageChange}: {
    currentPage: number,
    totalPages: number,
    handlePrevious: () => void,
    handleNext: () => void,
    handlePageChange: (pageNumber: number) => void
}) {

    // Calculate the range of page numbers to display
    const pageRange = 1; // Number of pages to show on each side of the current page
    const startPage = Math.max(1, currentPage - pageRange);
    const endPage = Math.min(totalPages, currentPage + pageRange);

    return (
        <div className="flex space-x-1 justify-center">
            <button
                disabled={currentPage === 1}
                onClick={handlePrevious}
                className="rounded-md border border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2">
                Prev
            </button>

            {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((pageNumber) => (
                <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`min-w-9 rounded-md py-2 px-3 text-center text-sm transition-all shadow-md ${
                        pageNumber === currentPage
                            ? 'bg-slate-800 text-white border-transparent' // Apply styles for the current page
                            : 'border border-slate-300 text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800' // Apply styles for other pages
                    } ml-2`}
                >
                    {pageNumber}
                </button>
            ))}

            <button
                disabled={currentPage== totalPages}
                onClick={handleNext}
                className="min-w-9 rounded-md border border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2">
                Next
            </button>
        </div>
    );
}