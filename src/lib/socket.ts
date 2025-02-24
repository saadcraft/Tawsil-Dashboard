"use server"
import { cookies } from 'next/headers';




export default async function commandeSocket() {
    const access = (await cookies()).get("access_token")?.value

    const socket = new WebSocket(`ws://192.168.1.30:8000/ws/commandes/magasin/?token=${access}`);

    return socket
}