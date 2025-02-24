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
    setNotifications: (notifications: Notification[]) => void;
    addNotification: (notification: Notification) => void;
    removeNotification: (notificationId: number) => void;
    sendMessage: (message: any) => void; // New function to send messages to WebSocket
    setSocket: (socket: WebSocket | null) => void; // Set the socket reference
};

export const useNotificationStore = create<NotificationStore>((set, get) => ({
    notifications: [],
    socket: null,
    setNotifications: (notifications) => set({ notifications }),
    addNotification: (notification) => set((state) => {
        if (!notification?.id) return state;  // Prevent processing if id is undefined

        const isExisting = state.notifications.some(n => n.id === notification.id);
        if (isExisting) {
            // Remove existing notification if same id
            const updatedNotifications = state.notifications.filter(n => n.id !== notification.id);
            return { notifications: updatedNotifications };
        } else {
            return { notifications: [notification, ...state.notifications] };
        }
    }),
    removeNotification: (notificationId) => set((state) => ({
        notifications: state.notifications.filter(n => n.id !== notificationId),
    })),
    sendMessage: (message) => {
        const socket = get().socket;
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify(message));
        } else {
            console.error('WebSocket is not connected');
        }
    },
    setSocket: (socket) => set({ socket }),
}));