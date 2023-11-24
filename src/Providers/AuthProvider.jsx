import { createContext, useState } from "react";
import { app } from "../firebase/firebase.config";
import {GoogleAuthProvider,
     createUserWithEmailAndPassword, 
     getAuth, 
     signInWithEmailAndPassword, 
     signInWithPopup
    } 
     from 'firebase/auth';

const auth = getAuth(app);
export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();

    const signUp = (email,password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);
    }

    const logIn = (email,password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
    }

    const googleLogIn = () => {
        setLoading(true);
        return signInWithPopup(auth,googleProvider);
    }



    const authInfo = {
       user,
       loading,
       signUp,
       logIn,
       googleLogIn
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;