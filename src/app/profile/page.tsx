"use client"
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import ChangePasswordModal from "@/app/profile/modals/ChangePasswordModal";

export default function Page(){

    const[isLoading, setIsLoading] = useState(true);
    const[userDetail, setUserDetail] = useState(null)
    const[isModalOpen, setIsModalOpen] = useState(false);


    useEffect(()=>{
        fetchDetails()
    },[])

    const fetchDetails = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/auth/profile', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });
            if (response.ok) {
                setUserDetail(await response.json());
                setIsLoading(false);
            }
            else {
                router.push('/auth');
            }
        }
        catch (error) {
            router.push("/auth")
        }
    }

    const router = useRouter();
 return (
     <>
         {
             isModalOpen && <ChangePasswordModal close = {()=>setIsModalOpen(false)}/>
         }
     <div>
         <nav>
             <button
                 onClick={() => router.push("/contact-management")}
                 className="flex items-center p-2 text-gray-700 hover:bg-gray-200 rounded-lg focus:outline-none">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                      stroke="currentColor" className="w-5 h-5 mr-2">
                     <path strokeLinecap="round" strokeLinejoin="round"
                           d="M11.25 19.5l-7.5-7.5 7.5-7.5M3.75 12h17.25"/>
                 </svg>
                 Back
             </button>
         </nav>
         {!isLoading && <div className="bg-white overflow-hidden shadow rounded-lg border">
             <div className="px-4 py-5 sm:px-6">
                 <h3 className="text-lg leading-6 font-medium text-gray-900">
                     User Profile
                 </h3>

             </div>
             <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                 <dl className="sm:divide-y sm:divide-gray-200">
                     <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                         <dt className="text-sm font-medium text-gray-500">
                             Full name
                         </dt>
                         <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                             {userDetail["firstName"] + " " + userDetail["lastName"]}
                         </dd>
                     </div>
                     <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                         <dt className="text-sm font-medium text-gray-500">
                             Username
                         </dt>
                         <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                             {userDetail["username"]}
                         </dd>
                     </div>
                     <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                         <dt className="text-sm font-medium text-gray-500">
                             Email address
                         </dt>
                         <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                             {userDetail["email"]}
                         </dd>
                     </div>
                     <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                         <dt className="text-sm font-medium text-gray-500">
                             Created at
                         </dt>
                         <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                             {userDetail["createdAt"]}
                         </dd>
                     </div>
                     <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                         <dt className="text-sm font-medium text-gray-500">
                             Change Password
                         </dt>
                         <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                             <button
                                 type="button"
                                 onClick={() => setIsModalOpen(true)}
                             >
                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                      strokeWidth={1.5} stroke="currentColor" className="size-6">
                                     <path strokeLinecap="round" strokeLinejoin="round"
                                           d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"/>
                                 </svg>

                             </button>
                         </dd>
                     </div>
                 </dl>
             </div>
         </div>}
     </div>

     </>
 )
}