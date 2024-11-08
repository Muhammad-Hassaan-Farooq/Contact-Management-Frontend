import { useRouter } from 'next/router';

export const fetchWrapper = async (url: string, options?: RequestInit) => {
  //const router = useRouter();

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      if (response.status === 403) {
        // Redirect to login page on 403 Forbidden
        //router.push('/login');
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Re-throw the error to handle it in the calling component
  }
};
