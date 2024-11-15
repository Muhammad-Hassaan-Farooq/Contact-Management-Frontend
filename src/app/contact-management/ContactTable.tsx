import {useState} from "react";
import {useRouter} from "next/navigation";

interface ContactTableProps {
    contacts?: any[],
    refresh?: () => void,
    editContact?: (contact) => void
}

export default function ContactTable({contacts, refresh, editContact}: ContactTableProps) {
    const router = useRouter();
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [contactToDelete, setContactToDelete] = useState(null);

    const openDialog = (contact) => {
        setContactToDelete(contact)
        setIsDeleteOpen(true);
    }
    const closeDialog = () => {
        setContactToDelete(null)
        setIsDeleteOpen(false);
    }
    const handleDelete = async () => {
        if (contactToDelete === null) closeDialog()
        else {
            try {
                const response = await fetch(`http://localhost:8080/api/contacts/${contactToDelete["id"]}`, {
                    method: 'DELETE',
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


            } catch (error) {
                console.log(error);
                router.push('/auth');
            } finally {
                closeDialog()
                if (refresh) {
                    refresh()
                }
            }
        }
    }

    return (
        <>{isDeleteOpen && (
            <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                     aria-hidden="true"></div>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div
                        className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <div
                            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div
                                        className="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24"
                                             strokeWidth="1.5" stroke="currentColor" aria-hidden="true"
                                             data-slot="icon">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"/>
                                        </svg>
                                    </div>
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <h3 className="text-base font-semibold text-gray-900"
                                            id="modal-title">Delete contact</h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">Are you sure you want to delete
                                                {contactToDelete ? ` ${contactToDelete['firstName']} ${contactToDelete['lastName']}` : ""} from
                                                your contacts? This
                                                action cannot be undone.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button type="button"
                                        onClick={handleDelete}
                                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">
                                    Delete
                                </button>
                                <button type="button"
                                        onClick={() => setIsDeleteOpen(false)}
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
            <table
                className="w-full border-collapse outline outline-8 outline-gray-400 rounded-3xl mb-4">

                <thead className="rounded-lg text-base text-white font-semibold w-full">
                <tr className="border-b-2 border-gray-300">

                    <th className="py-3 px-3 text-gray-500 sm:text-base font-bold whitespace-nowrap text-center">
                        Contact Name
                    </th>
                    <th className="py-3 px-3  text-gray-500 sm:text-base font-bold whitespace-nowrap text-center">
                        Title
                    </th>
                    <th className="py-3 px-3 text-gray-500 sm:text-base font-bold whitespace-nowrap text-left">
                        Emails
                    </th>
                    <th className="py-3 px-3 text-gray-500 sm:text-base font-bold whitespace-nowrap text-left">
                        Phone Numbers
                    </th>

                </tr>

                </thead>
                <tbody>
                {
                    contacts?.map((contact) => {
                        return <tr key={contact['id']}
                                   className="border-b-2 border-gray-300 rounded-lg text-base text-white font-semibold w-full">
                            <td className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap text-center">{contact["firstName"] + "  " + contact["lastName"]}</td>
                            <td className="py-3 px-3  text-[#212B36] sm:text-base font-bold whitespace-nowrap text-center">{contact["title"]}</td>
                            <td className="py-3 px-3 text-[#212B36] sm:text-base whitespace-nowrap text-left">
                                {contact["emailAddresses"] && contact["emailAddresses"].length > 0 ? (
                                    <ul className="list-disc list-inside">
                                        {contact["emailAddresses"].map((email, index) => (
                                            <li key={index}><a
                                                href={`mailto:${email["email"]}`}>{email["email"]}({email["label"]})</a>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    "No emails"
                                )}
                            </td>
                            <td className="py-3 px-3 text-[#212B36] sm:text-base whitespace-nowrap text-left">
                                {contact["phoneNumbers"] && contact["phoneNumbers"].length > 0 ? (
                                    <ul className="list-disc list-inside">
                                        {contact["phoneNumbers"].map((phone, index) => (
                                            <li key={index}><a href={`tel:${phone["number"]}`}>{phone["number"]}({phone["label"]})</a></li>
                                        ))}
                                    </ul>
                                ) : (
                                    "No phone numbers"
                                )}
                            </td>
                            <td className="py-3 px-3 text-center border-t-2 border-gray-300 space-x-4">
                                <button
                                    onClick={()=>editContact(contact)}
                                    className="text-gray-500 hover:text-gray-700 focus:outline-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"/>
                                    </svg>

                                </button>
                                <button
                                    onClick={() => openDialog(contact)}
                                    className="text-gray-500 hover:text-gray-700 focus:outline-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="red" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                                    </svg>

                                </button>
                            </td>
                        </tr>
                    })
                }
                </tbody>
            </table>
        </>

    )
}