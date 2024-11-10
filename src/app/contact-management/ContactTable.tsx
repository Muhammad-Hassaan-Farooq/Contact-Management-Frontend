interface ContactTableProps {
    contacts?: any[]
}

export default function ContactTable({contacts}: ContactTableProps) {

    return (
        <table
            className="w-full border-collapse outline outline-8 outline-gray-400 rounded-3xl mb-4">
            <thead className="rounded-lg text-base text-white font-semibold w-full">
            <tr className="">

                <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap text-center">
                    Contact Name
                </th>
                <th className="py-3 px-3  text-[#212B36] sm:text-base font-bold whitespace-nowrap text-center">
                    Title
                </th>
                <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap text-left">
                    Emails
                </th>
                <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap text-left">
                    Phone Numbers
                </th>

            </tr>

            </thead>
            <tbody>
            {
                contacts?.map((contact) => {
                    return <tr key={contact['id']} className="rounded-lg text-base text-white font-semibold w-full">
                        <td className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap text-center">{contact["firstName"] + "  " + contact["lastName"]}</td>
                        <td className="py-3 px-3  text-[#212B36] sm:text-base font-bold whitespace-nowrap text-center">{contact["title"]}</td>
                        <td className="py-3 px-3 text-[#212B36] sm:text-base whitespace-nowrap text-left">
                            {contact["emailAddresses"] && contact["emailAddresses"].length > 0 ? (
                                <ul className="list-disc list-inside">
                                    {contact["emailAddresses"].map((email, index) => (
                                        <li key={index}>{email['email']}</li>
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
                                        <li key={index}>{phone["number"]}</li>
                                    ))}
                                </ul>
                            ) : (
                                "No phone numbers"
                            )}
                        </td>
                    </tr>
                })
            }
            </tbody>
        </table>
    )
}