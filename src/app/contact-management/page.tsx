'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import PaginationComponent from "@/app/contact-management/PaginationComponent";
import Contact from "@/utilities/dto/contact";
import ContactTable from "@/app/contact-management/ContactTable";

const ListWithPagination = () => {
    const fetchData = async (pageNumber:number) => {
        try {
            const response = await fetch(`http://localhost:8080/api/contacts?page=${pageNumber}&size=10`, {
                method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
            });
            if (response.status === 403) {
                router.push('/auth');
                return; 
            }

            if (!response.ok) {
                throw new Error(`HTTP error ${response.status}`);
            }
            const data = await response.json();
            setCurrentPage(data.currentPage+1);
            setTotalPages(data.totalPages);
            setContacts(data.contacts)
        } catch (error) {
            router.push("/auth");
        }
        finally{
            setIsLoading(false);
        }
    };


    const [contacts,setContacts] = useState([]);
    const [totalPages,setTotalPages] = useState(0);
    const [currentPage,setCurrentPage] = useState(0);
    const [isLoading,setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(()=>{
        fetchData(0);   
    },[]);


    const handlePageChange = (pageNumber:number) => {
        fetchData(pageNumber-1)
    };

    const handlePrevPage = () => {
        fetchData(currentPage-2);
    };

    const handleNextPage = () => {
        fetchData(currentPage);
    };

    const pageRange = 3;
    const startPage = Math.max(1, currentPage - pageRange);
    const endPage = Math.min(totalPages, currentPage + pageRange);

    return (
       <div className="bg-gray-100">
           <nav className="flex justify-between p-3">
               <div className="flex items-center space-x-4">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                        stroke="currentColor" className="size-6">
                       <path fill="#ecedf2" strokeLinecap="round" strokeLinejoin="round"
                             d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/>
                   </svg>
                   <input className="rounded-full p-3 bg-gray-300 text-gray-500 w-80" placeholder="Search....."/>
               </div>
               <div>
                   <button type="button" className="text-white bg-blue-500 rounded-full p-3">
                       <div className="flex items-center">
                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                stroke="currentColor" className="size-5">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                       </svg>
                       Create contact
                       </div>
                   </button>
               </div>
           </nav>
           <div className="p-4">
               <h1 className="font-bold text-3xl mb-4">All Contacts</h1>
               <div className="w-full">
                  <ContactTable contacts = {contacts}/>
                   <PaginationComponent handlePrevious={handlePrevPage} handleNext={handleNextPage} handlePageChange={handlePageChange}
                                        totalPages={totalPages} currentPage={currentPage} />
               </div>
           </div>
       </div>
    );
};

export default ListWithPagination;
