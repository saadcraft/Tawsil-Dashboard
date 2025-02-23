import { io } from "socket.io-client";
import { cookies } from 'next/headers';




export default async function commandeSocket() {
    const access = (await cookies()).get("access_token")?.value

    const socket = io(`ws://localhost:8000/ws/commandes/magasin/?token=${access}`, {
        auth: {
            token: access,
        },
    });

    socket.on("connect", () => {
        console.log("Connected to Socket.IO server");
    });

    socket.on("disconnect", () => {
        console.log("Disconnected from Socket.IO server");
    });

    socket.on("your-event", (data) => {
        console.log("Received data:", data);
    });

    // Return the socket instance if needed
    return socket;
}