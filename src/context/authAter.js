import React,{ createContext, useContext, useEffect, useState } from 'react'
import loginServices from '../services/loginServices'
export const authContext = createContext()

export const useAuth = ()=>{
    
    const context = useContext(authContext)
    if(!context) throw new Error('useAuth must be used within AuthProvider')
    return  context

}

const AuthProvider = ({children}) => {
    
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)


    const logIn = (email, password) => {
        loginServices.login(email, password)
        .then(user=>{
            window.localStorage.setItem('user', JSON.stringify(user))
        })
    }

    const logOut = () => window.localStorage.removeItem('user')
    

    useEffect(()=>{
        try{
            setUser(JSON.parse(window.localStorage.getItem('user')))
            setLoading(false)
        }
        catch(err){
            console.log(err)
        }

    }, [])

    return (
        <authContext.Provider value={{loading, user, logIn, logOut}}>
            {children}
        </authContext.Provider>
    )
}

export default AuthProvider