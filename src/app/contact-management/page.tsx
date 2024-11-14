'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import PaginationComponent from "@/app/contact-management/PaginationComponent";
import ContactTable from "@/app/contact-management/ContactTable";
import CreateContactModal from "@/app/contact-management/modals/CreateContactModal";
import UpdateContactModal from "@/app/contact-management/modals/UpdateContactModal";
import SideDrawer from "@/app/contact-management/SideDrawer";
import SearchBar from "@/app/contact-management/SearchBar";

const ListWithPagination = () => {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [contactToUpdate, setContactToUpdate] = useState(null);
    const [showDrawer, setShowDrawer] = useState(false);
    const [contacts,setContacts] = useState([]);
    const [totalPages,setTotalPages] = useState(0);
    const [currentPage,setCurrentPage] = useState(0);
    const [isLoading,setIsLoading] = useState(true);
    const router = useRouter();
    const [searchedContacts,setSearchedContacts] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

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

    function handleUpdateModalOpen(contact){
        setContactToUpdate(contact);
        setIsUpdateOpen(true);
    }

    function handleUpdateModalClose(){
        setContactToUpdate(null);
        setIsUpdateOpen(false);
    }




    useEffect(()=>{
        fetchData(0);   
    },[]);

    const logout = async()=>{
        try {
            const response = await fetch('http://localhost:8080/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });

            router.push('/auth');

        }
        catch (error) {
            console.log(error);
        }
    }


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
       <div className="bg-gray-100 h-dvh">
           <nav className="flex justify-between p-3">
               <div>
                   <button
                        onClick={() => setShowDrawer((prevState) => !prevState)}
                       type="button" >
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                            stroke="currentColor" className="size-6">
                           <path strokeLinecap="round" strokeLinejoin="round"
                                 d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"/>
                       </svg>
                   </button>
                   <SideDrawer refresh={()=>fetchData(0)} onClose = {()=>setShowDrawer((prevState) => !prevState)} isOpen = {showDrawer} logout = {logout}/>
               </div>
               <SearchBar setIsSearching = {setIsSearching} setSearchedContacts = {setSearchedContacts} />
               <div>
                   {isCreateOpen && <CreateContactModal closeModal={()=>setIsCreateOpen(false)} refresh={()=>fetchData(0)}/>}
                   {isUpdateOpen && <UpdateContactModal closeModal={()=> handleUpdateModalClose()} updateContact={contactToUpdate} refresh={()=>fetchData(0)}/>}
                   <button
                       onClick={() => setIsCreateOpen(true)}
                       type="button" className="text-white bg-blue-500 rounded-full p-3">
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
                  <ContactTable contacts = {isSearching?searchedContacts:contacts} refresh={()=>{fetchData(0)}} editContact = {(contact)=>handleUpdateModalOpen(contact)}/>
                   {!(contacts.length == 0) && <PaginationComponent handlePrevious={handlePrevPage} handleNext={handleNextPage} handlePageChange={handlePageChange}
                                        totalPages={totalPages} currentPage={currentPage}  />}
               </div>
           </div>
       </div>
    );
};

export default ListWithPagination;
