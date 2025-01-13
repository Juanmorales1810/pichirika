import { persist, PersistStorage } from "zustand/middleware";
import { IUserSchema } from "@/models/user";
import { UserState } from "@/types";
import { create } from "zustand";

// Definir un almacenamiento personalizado para localStorage
const localStoragePersist: PersistStorage<UserState> = {
    getItem: (name) => {
        const value = localStorage.getItem(name);
        return value ? JSON.parse(value) : null;
    },
    setItem: (name, value) => {
        localStorage.setItem(name, JSON.stringify(value));
    },
    removeItem: (name) => {
        localStorage.removeItem(name);
    },
};

const useStore = create<UserState>()(
    persist(
        (set) => ({
            user: null,
            setUser: (user: IUserSchema) => set({ user }),
            clearUser: () => set({ user: null }),
        }),
        {
            name: "user-storage", // nombre de la clave en localStorage
            storage: localStoragePersist,
        }
    )
);

export default useStore;
