import {create} from 'zustand'
import {persist,createJSONStorage} from 'zustand/middleware'
import { mmkvStorage } from './storage';

interface authstore {
  user : Record<string,any> | null;
  setUser:(user:any) => void;
  settingData: Record<string,any> | null;
  setSettingData:(data:any) => void;
  setCurrentOrder: (order:any) => void;
  currentOrder : Record<string,any> | null;
  logout:()=> void;
}

export const useAuthStore = create<authstore>()(
  persist(
    (set,get)=>({
      user:null,
      settingData:null,
      setSettingData:(data)=>set({settingData:data}),
      currentOrder:null,
      setCurrentOrder:(order)=>set({currentOrder:order}),
      setUser:(data)=>set({user:data}),
      logout:()=>set({user:null,currentOrder:null})
    }),
    {
      name:'auth-storage',
      storage:createJSONStorage(()=>mmkvStorage)
    }
  )
)