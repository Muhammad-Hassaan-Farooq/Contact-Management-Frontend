import React, {useState} from "react";
import {useRouter} from "next/navigation";

interface ChangePasswordModalProps {

}

interface ChangePasswordModalProps {
    close?: () => void
}

export default function ChangePasswordModal({close}: ChangePasswordModalProps) {
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isError, setIsError] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")

    const router = useRouter()


    const changePassword = async () =>{
        if (newPassword !== confirmPassword){
            setErrorMsg("Passwords do not match")
        }
        else {
            try {
                const body = {
                    oldPassword,
                    newPassword,
                }
                const response = await fetch('http://localhost:8080/api/auth/change-password', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body),
                    credentials: 'include'
                });

                if (response.ok) {
                    setIsError(false)
                    close()
                } else {
                    setIsError(true)
                    setErrorMsg(await response.text())
                }
            } catch (e) {
                router.push("/auth")
            }
        }
    }

    return (
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
                                        id="modal-title">Change Password</h3>
                                </div>

                            </div>
                            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                                <label className="mt-2 block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                    Old password
                                </label>
                                <input
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="lastName" type="password" placeholder="******"/>
                                <label className="mt-2 block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                    New password
                                </label>
                                <input
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="newPassword" type="password" placeholder="******"/>
                                <label className="mt-2 block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                    Confirm password
                                </label>
                                <input
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="confirmPassword" type="password" placeholder="******"/>
                            </form>
                            {isError ? <p className='text-red-700'>{errorMsg}</p> : <></>}
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button type="button"
                                    onClick={changePassword}
                                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">
                                Change Password
                            </button>
                            <button type="button"
                                    onClick={() => close()}
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}