import { create } from "zustand";

const useAppStore = create((set, get) => ({
    currentClicks: 0,
    setCurrentClicks: (amount) => set((state) =>
        ({ ...state, currentClicks: amount })),
    leaderboard: [],
    setLeaderboard: (board) => set((state) => ({
        ...state,
        leaderboard:board
    }))
}))

export default useAppStore