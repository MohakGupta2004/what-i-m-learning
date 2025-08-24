'use client'
import { auth } from "@/lib/firebase";
import { getAuth, User } from "firebase/auth";
import { Children, Context, useContext, useEffect, useState } from "react";
import React from "react";
import { createContext } from "react";
type AuthContextType = {
        user: User | null;
        loading: boolean;
        error: string | null

}
const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    error: null
})
const AuthProvider = ({children}: {children: React.ReactNode})=>{
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null> (null)
    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(firebaseuser => {
            setUser(firebaseuser)
            setLoading(false)
        })
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