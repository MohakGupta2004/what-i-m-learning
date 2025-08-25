'use client'
import { auth } from "@/lib/firebase";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { Children, Context, useContext, useEffect, useState } from "react";
import React from "react";
import { createContext } from "react";
type AuthContextType = {
        user: User | null;
        loading: boolean;
        error: string | null

}
export const AuthContext = createContext<AuthContextType>({
    user: null as User | null,
    loading: true,
    error: null as string | null
})
const AuthProvider = ({children}: {children: React.ReactNode})=>{
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null> (null)
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (user)=>{
            if(user){
                setUser(user)
                setLoading(false)
            } else {
                setUser(null)
                setLoading(false)
            }
        })

        return ()=>unsubscribe()
    }, []) 

    return (
        <AuthContext.Provider value={{user, loading, error}}>
            {children}
        </AuthContext.Provider>
    )
}
const useAuth = () => {
    return useContext(AuthContext)
}
export {
    AuthProvider,
    useAuth
}