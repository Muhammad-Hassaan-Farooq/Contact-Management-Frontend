import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import * as sea from "node:sea";


interface SearchBarProps {
    setIsSearching?: (value: (((prevState: boolean) => boolean) | boolean)) => void,
    setSearchedContacts?: (value: (((prevState: any[]) => any[]) | any[])) => void
}

export default function SearchBar({setIsSearching, setSearchedContacts}: SearchBarProps) {
    const [query, setQuery] = useState("")

    const [debouncedQuery, setDebouncedQuery] = useState(query);
    const router = useRouter();


    const search = async ()=>{
        try {
            const response = await fetch(`http://localhost:8080/api/contacts/search?page=0&size=10&query=${debouncedQuery}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
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
            setSearchedContacts(data.contacts);
        }
        catch (error) {
            router.push('/auth');
        }
    }

    useEffect(() => {
        // Set a timeout to update the debouncedQuery after 1 second
        const timeoutId = setTimeout(() => {
            setDebouncedQuery(query);
        }, 1000); // Adjust delay as needed (1000 ms = 1 second)

        // Cleanup function to clear the timeout when the component is re-rendered or query changes
        return () => clearTimeout(timeoutId);
    }, [query]); // Only re-run effect when query changes

    useEffect(() => {
        if (debouncedQuery && debouncedQuery.length >=3) {
            setIsSearching(true);
            search()
        }
        else{
            setIsSearching(false);
        }
    }, [debouncedQuery]);

    return (
        <div className="flex items-center space-x-4">
            <input
                className="rounded-full p-3 bg-gray-300 text-gray-500 w-96"
                placeholder="Search....."
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value)
                }}
            />
        </div>
    )
}