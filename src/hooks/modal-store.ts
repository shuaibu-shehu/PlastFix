import { create } from "zustand";

export type ModalType = "logItem";

interface ModalStore {
    type: any;
    data?: Record<string, unknown>;
    isOpen: boolean;
    onOpen: (type: ModalType, data?: Record<string, unknown>) => void;
    onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
    type: null,
    data: {},
    isOpen: false,
    onOpen: (type, data) => set({ isOpen: true, type, data }),
    onClose: () => set({ type: null, isOpen: false, data: {} }),
}));


