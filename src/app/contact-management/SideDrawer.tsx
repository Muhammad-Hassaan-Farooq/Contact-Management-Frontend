interface SideDrawerProps {
    onClose?: () => void,
    isOpen?: boolean,
    logout?: () => Promise<void>
}

export default function SideDrawer({onClose, isOpen, logout}: SideDrawerProps) {
    return (
        <>

            <div
                className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            ></div>


            <div
                className={`fixed left-0 top-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-semibold">Contact Management</h2>
                    <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
                        &times;
                    </button>
                </div>

                <div className="p-4">
                    <button
                        className="w-full text-left py-2 px-4 mb-2 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700"

                    >
                        Import Contacts
                    </button>
                    <button
                        className="w-full text-left py-2 px-4 mb-2 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700"

                    >
                        Export Contacts
                    </button>
                    <button
                        className="w-full text-left py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700"
                        onClick={logout}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </>
    )
}