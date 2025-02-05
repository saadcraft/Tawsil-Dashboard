import { getUser } from '@/lib/auth'
import { create } from 'zustand'

interface StoreState {
    user: Users | null;
    setUser: (newUser: Users) => void;
    fetchUser: () => void;
}

const useStore = create<StoreState>((set) => ({ // Initialize with user data or null
    user: null, // Initialize user as null
    setUser: (newUser: Users) => set({ user: newUser }), // Function to update the user
    fetchUser: async () => {
        const user = await getUser(); // Call your `getUser` function
        set({ user });
    },
}));

export default useStore;
