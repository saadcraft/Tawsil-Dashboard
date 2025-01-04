"use server"

import { cookies } from 'next/headers';

// Function to remove cookies and redirect user to login page
export default async function CookiesRemover() {
        const cookieStore = await cookies();
        // Delete access_token and refresh_token cookies from root path
        cookieStore.delete('access_token');
        cookieStore.delete('refresh_token');
}