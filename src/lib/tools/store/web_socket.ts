import { create } from 'zustand';

type Notification = {
    id: number;
    client__username: string;
    magasin__name: string;
    total_price: string;
    status: string;
    client__phone_number_1: string;
    created_at: string;
};

type NotificationStore = {
    notifications: Notification[];
    socket: WebSocket | null;
    notifme: boolean;
    setNotifications: (notifications: Notification[]) => void;
    addNotification: (notification: Notification) => void;
    removeNotification: (notificationId: number) => void;
    sendMessage: (message: {
        type: string;
        livreur_id: string;
        commande_id: number;
    } | {
        type: string;
        commande_id: number;
        wilaya: string;
    }) => void; // New function to send messages to WebSocket
    setSocket: (socket: WebSocket | null) => void; // Set the socket reference
    isConnected: boolean;
    setIsConnected: (value: boolean) => void;
    setIsNotif: (value: boolean) => void;
};

export const useNotificationStore = create<NotificationStore>((set, get) => ({
    notifications: [],
    socket: null,
    notifme: true,
    setNotifications: (notifications) => set({ notifications }),
    addNotification: (notification) => set((state) => {
        if (!notification?.id) return state;  // Prevent processing if id is undefined

        return { notifications: [notification, ...state.notifications] };
    }),
    removeNotification: (notificationId) => set((state) => ({
        notifications: state.notifications.filter(n => n.id !== notificationId),
    })),
    sendMessage: (message) => {
        const socket = get().socket;
        if (socket && socket.readyState === WebSocket.OPEN) {
            if (socket && socket.readyState === WebSocket.OPEN) {
                return new Promise((resolve, reject) => {
                    // Send the message
                    socket.send(JSON.stringify(message));

                    // Listen for a response from the server
                    const handleMessage = (event: MessageEvent) => {
                        try {
                            const response = JSON.parse(event.data);
                            resolve(response); // Resolve the promise with the server's response
                        } catch (error) {
                            reject(error); // Reject if parsing fails
                        } finally {
                            // Clean up the event listener
                            socket.removeEventListener('message', handleMessage);
                        }
                    };

                    // Listen for errors
                    const handleError = (error: Event) => {
                        reject(error); // Reject the promise if there's a WebSocket error
                        socket.removeEventListener('error', handleError);
                    };

                    // Attach event listeners
                    socket.addEventListener('message', handleMessage);
                    socket.addEventListener('error', handleError);
                });
            }
        } else {
            return Promise.reject('Problem de connection');
        }
    },
    setSocket: (socket) => set({ socket }),
    isConnected: false, // default to true
    setIsConnected: (value: boolean) => set({ isConnected: value }),
    setIsNotif: (value: boolean) => set({ notifme: value }),
}));

type UserInfo = {
    user: Users | null;
    setUser: (user: Users | null) => void;
}

export const userInformation = create<UserInfo>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
}));