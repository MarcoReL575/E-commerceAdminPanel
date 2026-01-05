import { useAuthStore } from "@/store/useAuthStore"
import { supabase } from "@/supabase/supabaseClient"
import type { CreateUserForm, AppRole } from "@/types/auth"
import { createContext, useContext, useEffect, type ReactNode } from "react"
import type { Session } from "@supabase/supabase-js"

interface AuthContextType {
    signUpSession: (data: CreateUserForm) => Promise<void>
    signInWithEmail: (email: string, password: string) => Promise<void>
    signOutSession: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const { setUser, setSession, setRole, reset, setAuthInitialized } = useAuthStore()

    // 🔹 Obtiene el rol del usuario
    const fetchRole = async (userId: string): Promise<AppRole> => {
        const { data, error } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", userId)
            .single()

        if (error) return "user"
        return data?.role ?? "user"
    }

    // 🔹 Aplica sesión + rol (UN SOLO LUGAR)
    const applySession = async (session: Session | null) => {
        if (!session) {
            reset()
            return
        }

        setSession(session)
        setUser(session.user)

        const role = await fetchRole(session.user.id)
        setRole(role)
    }

    useEffect(() => {
    const init = async () => {
        const { data } = await supabase.auth.getSession()
        applySession(data.session)
        setAuthInitialized(true) // 🔥 SOLO AQUÍ
    }

    init()

    const { data: { subscription } } =
        supabase.auth.onAuthStateChange(async (_event, session) => {
           applySession(session)
        })

    return () => subscription.unsubscribe()
}, [])



    // 🔹 Auth actions
    const signUpSession = async ({ email, password, username }: CreateUserForm) => {
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { username } },
        })
        if (error) throw error
    }

    const signInWithEmail = async (email: string, password: string) => {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })
        if (error) throw error
    }

    const signOutSession = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
    }

    return (
        <AuthContext.Provider
            value={{ signUpSession, signInWithEmail, signOutSession }}
        >
            {children}
        </AuthContext.Provider>
    )
}

// 🔹 Hook de contexto
export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth debe usarse dentro de un AuthProvider")
    }
    return context
}
