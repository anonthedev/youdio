import { create } from 'zustand'
import { YoudioWithId } from '../../types'

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
    updateAllYoudios: (youdios: YoudioWithId) => set({ allYoudios: youdios })
}))

export const useSearch = create((set) => ({
    searchResults: null,
    updateSearchResults: (results: any) => set({ searchResults: results })
}))