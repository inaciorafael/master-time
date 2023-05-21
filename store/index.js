import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, createJSONStorage } from "zustand/middleware"
import { create } from 'zustand'

const useStore = create(persist((set, get) => ({
  rotinas: [
    {
      id: '3DLASJ1452394182203208321hfah@#',
      name: 'Exemplo',
      upTime: {
        minutes: 0,
        seconds: 30,
      },
      restTime: {
        minutes: 0,
        seconds: 15,
      }
    }
  ],
  adicionarRotina: (novaRotina) => set({
    rotinas: [...get().rotinas, novaRotina]
  }),
  removerRotinha: (rotinaID) => set({
    rotinas: get().rotinas.filter(rotina => rotina.id !== rotinaID)
  }),
  currentTimerId: '',
  changeCurrentTimerId: (timerID) => set({
    currentTimerId: timerID,
  })
}), {
  name: 'store-storage',
  storage: createJSONStorage(() => AsyncStorage)
}))

export default useStore
