import {create} from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface Item {
    id: string;
    name: string;
    quantity: number;
    weight: number;
    type: string;
}

interface ItemStore {
    items: Item[];
    addItem: (item: Item) => void;
    removeItem: (id: string) => void;
    clearItems: () => void;
    setItems: (items: Item[]) => void; // New method to set items
}

const useItemStore = create<ItemStore>()(
    persist(
        (set) => ({
            items: [],
            addItem: (item) => set((state) => ({ items: [...state.items, item] })),
            removeItem: (id) => set((state) => ({ items: state.items.filter(item => item.id !== id) })),
            clearItems: () => set({ items: [] }),
            setItems: (items) => set({ items }), // Set items directly
        }),
        {
            name: 'item-storage', // Name of the storage (key in local storage)
            storage: createJSONStorage(() => localStorage), // Use local storage
        }
    )
);

export default useItemStore;