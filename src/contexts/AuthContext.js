import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'

const AuthContext = React.createContext()

export function AuthUse(){
   return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState()
    const [email, setEmail] = useState("")

    function signup(email, password){
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function login(email, password){
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout(email){
        return auth.signOut(email)
    }

    function forgotpassword(email){
        return auth.sendPasswordResetEmail(email)
    }

    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setEmail(user.email)
        })
        return unsubscribe
    },[])

    const value ={currentUser, signup, login, logout, forgotpassword, email}

  return (
    <AuthContext.Provider value = {value}>
        {children}        
    </AuthContext.Provider>
  )
}