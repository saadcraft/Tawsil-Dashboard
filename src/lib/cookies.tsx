"use server"

import { cookies } from 'next/headers';

export default async function CookiesRemover() {
    (await cookies()).delete('access_token');
    (await cookies()).delete('refresh_token');
}
