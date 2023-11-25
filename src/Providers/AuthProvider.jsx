import { createContext, useEffect, useState } from "react";
import { app } from "../firebase/firebase.config";
import {GoogleAuthProvider,
     createUserWithEmailAndPassword, 
     getAuth, 
     onAuthStateChanged, 
     signInWithEmailAndPassword, 
     signInWithPopup,
     signOut,
     updateProfile
    } 
     from 'firebase/auth';
import useAxiosPublic from "../hooks/useAxiosPublic";

const auth = getAuth(app);
export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
    const axiosPublic = useAxiosPublic();
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

    const updateUserProfile = (name, photo) => {
		return updateProfile(auth.currentUser, {
			displayName: name,
			photoURL: photo,
		});
	};
    const logOut = () => {
		setLoading(true);
		return signOut(auth);
	};

    useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			if (currentUser) {
				setLoading(false);
                //get token
                const userInfo = { email: currentUser.email};
                axiosPublic.post('/jwt',userInfo)
                .then(res => {
                    if(res.data.token){
                        localStorage.setItem('token', res.data.token);
                    }
                })
			} 
			else{
                  localStorage.removeItem('token');
            }
			
		});
		return () => {
			return unsubscribe();
		};
	}, [axiosPublic]);




    const authInfo = {
       user,
       loading,
       signUp,
       logIn,
       googleLogIn,
       updateUserProfile,
       logOut
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;