import { create } from "zustand"

export const useAuthStore = create((set, get) => ({
    user: undefined,
    checkAuth: async () => {
        try {
            const res = await fetch("https://improved-train-g7jjg65vw5rfvwgg-3000.app.github.dev/auth/me", {
                credentials: "include"
            })

            if (!res.ok) throw new Error(res.error)

            const data = await res.json()

            if (!data) return

            set((state) => ({ ...state, user: data }))
        } catch (error) {
            console.error(error)
        }
    },
    clearUser: () => {
        set((state) => ({...state, user: undefined}))
    },
    csrfToken: undefined,
getCsrfToken: async () => {
        try {
            const res = await fetch("https://improved-train-g7jjg65vw5rfvwgg-3000.app.github.dev/csrf-token")

            if (!res.ok) throw new Error(res.error)

            const data = await res.json()

            if (data && data.token) {
                set((state) => ({...state, csrfToken: data.token }))
            }
        } catch (error) {
            console.error(error)
        }
    }
}));