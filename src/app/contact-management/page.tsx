'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ContactList from './ContactList';

const ListWithPagination = () => {

    const [contacts,setContacts] = useState([]);
    const [totalPages,setTotalPages] = useState(0);
    const [currentPage,setCurrentPage] = useState(0);
    const [isLoading,setIsLoading] = useState(true);
    const router = useRouter();


    useEffect(()=>{

        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/contacts?page=0&size=5`, {
                    method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
                });
                if (response.status === 403) {
                    router.push('/auth');
                    return; // Exit the function to avoid further execution
                }

                if (!response.ok) {
                    throw new Error(`HTTP error ${response.status}`);
                }
                const data = await response.json();
                setCurrentPage(data.currentPage);
                setTotalPages(data.totalPages);
                setContacts(data.contacts)
            } catch (error) {
                router.push("/auth");
            }
            finally{
                setIsLoading(false);
            }
        };

        fetchData();   },[]);



        // Pagination button event handlers
        const handlePageChange = (pageNumber:number) => {
            setCurrentPage(pageNumber);
        };

        const handlePrevPage = () => {
            setCurrentPage(currentPage - 1);
        };

        const handleNextPage = () => {
            setCurrentPage(currentPage + 1);
        };

        // Calculate the range of page numbers to display
        const pageRange = 3; // Number of pages to show on each side of the current page
        const startPage = Math.max(1, currentPage - pageRange);
        const endPage = Math.min(totalPages, currentPage + pageRange);

        return (
            <div>
            {isLoading? <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                role="status">
                <span
                className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                >Loading...</span
                >
                </div>
                    :
                <ul className="space-y-4">
                <ContactList contacts={contacts}/>
                </ul>}


                <div className="mt-6 flex justify-center">
                <nav className="inline-flex -space-x-px">
                <button
                disabled={currentPage === 1}
                onClick={handlePrevPage}
                className={`px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 ${
                    currentPage === 1 ? 'cursor-not-allowed' : 'cursor-pointer'
                }`}
                >
                Previous
                </button>
                {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((pageNumber) => (
                    <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${
                        pageNumber === currentPage ? 'z-10 text-blue-600 bg-blue-50 border-blue-300' : ''
                    }`}
                    >
                    {pageNumber}
                    </button>
                ))}
                <button
                disabled={currentPage === totalPages}
                onClick={handleNextPage}
                className={`px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 ${
                    currentPage === totalPages ? 'cursor-not-allowed' : 'cursor-pointer'
                }`}
                >
                Next
                </button>
                </nav>
                </div>
                </div>
        );
};

export default ListWithPagination;
