"use server"

import {redirect} from "next/navigation";

export const fetchWrapper = async (url: string, options?: RequestInit) => {


  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      if (response.status === 403) {
        redirect("/auth")
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
