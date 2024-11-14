import {useRef} from "react";
import {useRouter} from "next/navigation";

interface SideDrawerProps {
    onClose?: () => void,
    isOpen?: boolean,
    logout?: () => Promise<void>,
    refresh?: () => Promise<void>
}

export default function SideDrawer({onClose, isOpen, logout, refresh}: SideDrawerProps) {

    const fileInputRef = useRef(null);
    const router = useRouter();

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file && file.type === "text/vcard") {
            try {
                const formData = new FormData();
                formData.append('file', file);
                const response = await fetch(`http://localhost:8080/api/contacts/import`, {
                    method: 'POST',
                    body:formData,
                    credentials: 'include'
                });
                if (response.ok) {
                    refresh()
                }
                else {
                    if (response.status === 401 || response.status === 403) {
                        router.push('/auth');
                    }
                }
            } catch (e) {
                router.push("/auth")
            }
        } else {
            console.error('Please select a .vcf file');
        }
    };

    const handleExport = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/contacts/export`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            if (response.ok) {
                const url = window.URL.createObjectURL(new Blob([await response.blob()]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "contacts.vcf");
                document.body.appendChild(link);
                link.click();
                link.remove();
                window.URL.revokeObjectURL(url);
            }
        } catch (error) {

        }
    }

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
                        onClick={() => fileInputRef.current.click()}
                        className="w-full text-left py-2 px-4 mb-2 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700"

                    >
                        Import Contacts
                    </button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".vcf"
                        style={{display: 'none'}}  // Hide the file input
                        onChange={handleFileChange}
                    />
                    <button
                        onClick={handleExport}
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