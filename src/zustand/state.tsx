import { create } from 'zustand'

export const useAudioURL = create((set) => ({
    globalAudioURL: "",
    skipTo: 0,
    duration: 0,
    updateGlobalAudioURL: (newURL: string) => set({ globalAudioURL: newURL }),
    updateSkipTo: (seconds: number) => set({ skipTo: seconds }),
    updateDuration: (duration: number) => set({ duration: duration })
}))

export const useUserDetails = create((set) => ({
    userDetails: null,
    updateUserDetails: (details: any) => set({ userDetails: details }),
}))

export const useAllYoudios = create((set) => ({
    allYoudios: null,
    updateAllYoudios: (youdios: any) => set({ allYoudios: youdios })
}))