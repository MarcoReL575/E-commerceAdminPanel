import { useAuthStore } from "@/store/useAuthStore";
import { supabase } from "@/supabase/supabaseClient";
import type { CreateUserForm } from "@/types/auth";
import { createContext, useContext, useEffect, type ReactNode } from "react";

interface AuthContextType{
    signUpSession: ({ email, password, username }: CreateUserForm) => Promise<void>
    signInWithEmail: (email: string, password: string) => Promise<void>
    signOutSession: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({children}:{children: ReactNode})=> {

    const { setUser, setSession, setIsLoading, setRole, reset } = useAuthStore()
    
    const fetchRole = async(userId: string)=> {
        const { data, error } = await supabase
            .from('profiles')
            .select('role')
            .eq("id", userId)
            .single()
        if (error) {
            console.error("Error fetching role:", error)
            return
        }
        return data.role ?? "user"
    }
    
    useEffect(()=>{
        const initSesion = async ()=> {
            const { data, error } = await supabase.auth.getSession();
            if(error){ 
                reset() 
                throw error
            };
            if(data.session) {
                setSession(data.session);
                setUser(data.session.user);
                setIsLoading(false);
                const role = await fetchRole(data.session.user.id)
                setRole(role)
            }
        };
        initSesion();

        const { data:{ subscription } } = supabase.auth.onAuthStateChange(async(_event, session)=> {
            if(session){
                setSession(session);
                setUser(session?.user);
            } else {
                reset()
            }
            setIsLoading(false)
        });

        return ()=> subscription.unsubscribe();
    },[ setUser, setSession, setIsLoading, reset]);

    
    const signUpSession = async({ email, password, username }: CreateUserForm)=> {
        const { data, error } = await supabase.auth.signUp({
            email, 
            password,
            options: { data: { username }}
        });
        if(error) throw error
    }

    const signInWithEmail = async(email: string, password:string)=> {
        const {data, error} = await supabase.auth.signInWithPassword({
            email, password
        });
        if(error) throw Error
    }

    const signOutSession = async()=> {
        const { error } = await supabase.auth.signOut()
        if(error) throw Error
    }

    const value = {
        signUpSession,
        signInWithEmail,
        signOutSession
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

//Hook para usar el Context
export const useAuth = ()=> {
    const context = useContext(AuthContext)
    if(context === undefined){
        throw new Error('useAuth debe de ser usado dentro de un AuthProvider')
    }
    return context;
}