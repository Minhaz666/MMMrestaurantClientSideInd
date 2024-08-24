import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext } from "react";
import { app } from '../firebase/firebsase.config';
import { GoogleAuthProvider } from "firebase/auth";
import useAxiosSecurePublic from '../hooks/useAxiosSecurePublic';

const auth = getAuth(app);
const axiosSecurePublic=useAxiosSecurePublic()

// context api er jonne ekti api creat korte hoy,eta export korte hobe jeno onno jaiga theke call kora jay
export const AuthContext = createContext() 

const provider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {


    const [user,setUser] = useState(null)
    const [loading,setLoading]=useState(true)
    
    const axiosSecurePublic=useAxiosSecurePublic()

    // for creatUser
    const creatUser=(email,password)=>{
        return createUserWithEmailAndPassword(auth,email,password);
        setLoading (false)
    }

    // for google signIn
    const GoogleSignIn =()=>
        {
            setLoading(true);
           return signInWithPopup(auth, provider)
        }

    //for signin
    const signinUser=(email,password)=>
    {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }
    //for signOut
    const signOutUser=()=>
    {
        setLoading(true)
        return signOut(auth);
    }

    //for keep user
    useEffect(()=>{
       const unsubscribe = onAuthStateChanged(auth,(currentUser=>{
            // console.log('currentUser=',currentUser)
            setUser(currentUser);
            if(currentUser){
                // get token from server and if there user available then set token in local storage
                // console.log(currentUser)
                const userinfo={email:currentUser.email}
                axiosSecurePublic.post('/jwt',userinfo)
                .then(res=>{
                    const token=res.data.token;
                    localStorage.setItem('access-token',token)
                    setLoading(false)
                })
            }
            if(!currentUser){
                // remove token if current user is null
                localStorage.removeItem('access-token')
            }
            setLoading(false)
        }))
        return()=>{
            return unsubscribe()
        }
    },[axiosSecurePublic])


    // update Profile
    const profileUpdate=(dName,photoURL)=>{
        return updateProfile(auth.currentUser, {
            displayName: dName, photoURL: photoURL
          })
    }

    const authinfo={
        user,
        loading,
        creatUser,
        signinUser,
        signOutUser,
        profileUpdate,
        GoogleSignIn,
    }

    return (
       <AuthContext.Provider value={authinfo}>
        {children}
       </AuthContext.Provider>
    );
};

export default AuthProvider;