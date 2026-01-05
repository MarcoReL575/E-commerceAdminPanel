import type { AppRole } from '@/types/auth';
import type { Session, User } from '@supabase/supabase-js'
import { create } from 'zustand'

interface AuthStoreProps {
    user: User | null
    session: Session | null
    role: AppRole | null
    isLoading: boolean
    authInitialized: boolean  
    setAuthInitialized: (v: boolean) => void
    setUser: (user: User | null) => void
    setSession: (session: Session | null) => void
    setRole: (role: AppRole | null) => void
    reset: () => void
}


export const useAuthStore = create<AuthStoreProps>((set) => ({
    user: null,
    session: null,
    role: null,
    isLoading: true,
    authInitialized: false,
    setAuthInitialized: (v) => set({ authInitialized: v, isLoading: false }),
    setUser: (user) => set({ user }),
    setSession: (session) => set({ session }),
    setRole: (role) => set({ role }),
    reset: () =>
        set({
            user: null,
            session: null,
            role: null,
            isLoading: false,
            authInitialized: true,
        }),
}))

