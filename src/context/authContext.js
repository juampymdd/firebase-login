import React,{ createContext, useContext, useEffect, useState } from 'react'
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged, 
    signOut,
    GoogleAuthProvider,
    signInWithPopup
} from "firebase/auth";
import { auth } from '../firebase'
export const authContext = createContext()

export const useAuth = ()=>{
    
    const context = useContext(authContext)
    if(!context) throw new Error('useAuth must be used within AuthProvider')
    return  context

}

const AuthProvider = ({children}) => {
    
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const signup = (email, password)=> createUserWithEmailAndPassword(auth, email, password)
    const login = (email, password)=> signInWithEmailAndPassword(auth, email, password)
    const logout = ()=> signOut(auth)
    const googleLogin = ()=> {
        const googleProvider = new GoogleAuthProvider()
        return signInWithPopup(auth, googleProvider)
    }
    useEffect(()=>{ onAuthStateChanged( auth, user=>{
        setUser(user)
        setLoading(false)
    } ) }, [] )
    
    return (
        <authContext.Provider value={{signup, login, user, logout, loading, googleLogin}}>
            {children}
        </authContext.Provider>
    )
}

export default AuthProvider