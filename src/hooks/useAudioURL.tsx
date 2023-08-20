import { create } from 'zustand'

const useAudioURL = create((set) => ({
  audioURL: "",
  updateAudioURL: (newURL: string) => set({ audioURL: newURL}),
//   removeAllBears: () => set({ bears: 0 }),
}))

export default useAudioURL