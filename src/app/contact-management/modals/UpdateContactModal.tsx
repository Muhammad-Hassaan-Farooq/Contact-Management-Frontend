import {useState} from "react";
import {useRouter} from "next/navigation";

interface UpdateContactModalProps {
    closeModal?: () => void,
    updateContact?: any,
    refresh?: () => Promise<void>
}

export default function UpdateContactModal({closeModal, updateContact,refresh}: UpdateContactModalProps) {
    const router = useRouter();
    const [firstName, setFirstName] = useState(updateContact["firstName"]);
    const [lastName, setLastName] = useState(updateContact["lastName"]);
    const [title, setTitle] = useState(updateContact["title"]);
    const [emailAddresses, setEmailAddresses] = useState(updateContact["emailAddresses"]);
    const [phoneNumbers, setPhoneNumbers] = useState(updateContact["phoneNumbers"]);

    const handleUpdate = async() =>{
        const id = updateContact.id;
        const updatedContact = {
            firstName,
            lastName,
            title,
            emailAddresses,
            phoneNumbers
        };

        try {
            const response = await fetch(`http://localhost:8080/api/contacts/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedContact),
                credentials: 'include'
            });

            if (response.ok) {
                console.log('Contact updated successfully');
            } else {
                router.push('/auth');
                console.error('Failed to update contact');
            }
        } catch (error) {
            router.push('/auth');
        }
        closeModal();
        refresh();
    }

    const handlePhoneChange = (index, field, value) => {
        const updatedPhones = [...phoneNumbers];
        updatedPhones[index][field] = value;
        setPhoneNumbers(updatedPhones);
    };

    const addPhoneField = () => {
        setPhoneNumbers([...phoneNumbers, {number: '', label: ''}]);
    };
    const removePhoneField = (index) => {
        setPhoneNumbers(phoneNumbers.filter((_, i) => i !== index));
    };

    const addEmailField = () => {
        setEmailAddresses([...emailAddresses, {email: '', label: ''}]);
    };

    const removeEmailField = (index) => {
        setEmailAddresses(emailAddresses.filter((_, i) => i !== index));
    };

    const handleEmailChange = (index, field, value) => {
        const updatedEmails = [...emailAddresses];
        updatedEmails[index][field] = value;
        setEmailAddresses(updatedEmails);
    };



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
                            <div className="text-center">Update Contact</div>
                            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                    First Name
                                </label>
                                <input
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="firstName" type="text" placeholder="First Name"/>

                                <label className="mt-2 block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                    Last Name
                                </label>
                                <input
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="lastName" type="text" placeholder="Last Name"/>

                                <label className="mt-2 block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                    Title
                                </label>
                                <input
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="title" type="text" placeholder="Title"/>
                                <label className="block mt-2 text-sm font-medium text-gray-700">Phone Numbers</label>
                                {phoneNumbers.map((phone, index) => (
                                    <div key={index} className="flex space-x-2">
                                        <input
                                            type="tel"
                                            value={phone["number"]}
                                            onChange={(e) => handlePhoneChange(index, 'number', e.target.value)}
                                            className="p-2 border border-gray-300 rounded-md flex-1"
                                            placeholder="Phone Number"
                                        />
                                        <input
                                            type="text"
                                            value={phone["label"]}
                                            onChange={(e) => handlePhoneChange(index, 'label', e.target.value)}
                                            className="p-2 border border-gray-300 rounded-md w-1/3"
                                            placeholder="Label"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removePhoneField(index)}
                                            className="text-red-500"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addPhoneField}
                                    className="text-blue-600 text-sm mt-2 hover:underline"
                                >
                                    + Add Phone Number
                                </button>

                                <label className="block mt-2 text-sm font-medium text-gray-700">Email Addresses</label>
                                {emailAddresses.map((email, index) => (
                                    <div key={index} className="flex space-x-2 mt-2">
                                        <input
                                            type="email"
                                            value={email["email"]}
                                            onChange={(e) => handleEmailChange(index, 'email', e.target.value)}
                                            className="p-2 border border-gray-300 rounded-md flex-1"
                                            placeholder="Email"
                                        />
                                        <input
                                            type="text"
                                            value={email["label"]}
                                            onChange={(e) => handleEmailChange(index, 'label', e.target.value)}
                                            className="p-2 border border-gray-300 rounded-md w-1/3"
                                            placeholder="Label"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeEmailField(index)}
                                            className="text-red-500"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addEmailField}
                                    className="text-blue-600 text-sm mt-2 hover:underline"
                                >
                                    + Add Email Address
                                </button>
                            </form>
                            <div className="bg-white px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button type="button"
                                        onClick={handleUpdate}
                                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">
                                    Update
                                </button>
                                <button type="button"
                                        onClick={closeModal}
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}