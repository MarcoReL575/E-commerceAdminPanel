import type { AppRole, Profile } from '@/types/auth';
import type { Session, User } from '@supabase/supabase-js'
import { create } from 'zustand'

interface AuthStoreProps {
    user: User | null;
    session: Session | null;
    isLoading: boolean;
    role: AppRole | null
    profile: Profile | null; 
    setProfile: (profile: Profile | null) => void; 
    setUser: (user: User | null) => void;
    setRole: (role: AppRole | null) => void;
    setSession: (session: Session | null) => void;
    setIsLoading: (loading: boolean) => void;
    reset: () => void;
}

export const useAuthStore = create<AuthStoreProps>()((set) => ({
    user: null,
    session: null,
    profile: null,
    isLoading: true,
    role: null,
    setUser: (user)=> set({ user }),
    setRole: (role) => set({ role }),
    setProfile: (profile) => set({ profile }),
    setSession: (session)=> set({ session }),
    setIsLoading: (loading)=> set({ isLoading: loading }),
    reset: () => set({
        user: null,
        session: null,
        profile: null,
        role: null,
        isLoading: false,
    }),
}));
