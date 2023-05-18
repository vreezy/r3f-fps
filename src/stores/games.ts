import { create } from 'zustand'
import {
   devtools,
   //persist
} from 'zustand/middleware'

interface IGameVariables {
  lastFrameTime: number | null,
  assets: object,
  animFrameId: number
}


interface IGameState extends IGameVariables {
  reset: () => void
}

const initialState: IGameVariables = {
  lastFrameTime: null,
  assets: {},
  animFrameId: 0
}

// TODO: disabel devtools: devtools(..., { enabled: false, ... })
const useGameStore = create<IGameState>()(
   devtools(
      //persist(
      (set, get) => ({
         ...initialState,
         reset: () => set(initialState),
      }),
      {
         name: 'game-storage',
      }
      //)
   )
)

export default useGameStore