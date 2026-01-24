import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    const googleProvider = new GoogleAuthProvider();

    const axiosPublic = useAxiosPublic();


    // create user
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // sign in user
    const logIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    // sign in with google
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    // log out user
    const logOut = () => {
        setLoading(true);
        return signOut(auth)
    }

    // update user profile
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        })
    }
    // observer
    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, currentUser => {
    //         setUser(currentUser);
    //         // if (currentUser) {
    //         //     // get token and store client
    //         //     const userInfo = {

    //         //         email: currentUser.email.toLowerCase().trim() };
    //         //     axiosPublic.post('/jwt', userInfo)
    //         //         .then(res => {
    //         //             if (res.data.token) {
    //         //                 localStorage.setItem('access-token', res.data.token)
    //         //             }
    //         //         })
    //         // }
    //         if (currentUser) {
    //             const userInfo = {
    //                 name: currentUser.displayName || "Anonymous",
    //                 email: currentUser.email.toLowerCase().trim(),
    //                 role: "employee" // default role
    //             };

    //             // 1️. ensure MongoDB user exists
    //             axiosPublic.post('/users', userInfo);

    //             // 2️. get JWT
    //             axiosPublic.post('/jwt', { email: userInfo.email })
    //                 .then(res => {
    //                     if (res.data.token) {
    //                         localStorage.setItem('access-token', res.data.token);
    //                     }
    //                     setLoading(false);
    //                 });
    //         }


    //         else {
    //             // remove token
    //             localStorage.removeItem('access-token')
    //         }
    //         setLoading(false);
    //         console.log('current user', currentUser);
    //     });
    //     return () => {
    //         return unsubscribe();
    //     }
    // }, [axiosPublic])
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);

            if (currentUser) {
                const userInfo = {
                    name: currentUser.displayName || "Anonymous",
                    email: currentUser.email.toLowerCase().trim(),
                    role: "employee",
                };

                try {
                    // ensure user exists in DB
                    await axiosPublic.post('/users', userInfo);

                    // get JWT
                    const res = await axiosPublic.post('/jwt', {
                        email: userInfo.email,
                    });

                    if (res.data.token) {
                        localStorage.setItem('access-token', res.data.token);
                    }
                } catch (error) {
                    console.error("Auth sync failed", error);
                }
            } else {
                localStorage.removeItem('access-token');
            }

            //Set loading false AFTER EVERYTHING
            setLoading(false);
        });

        return () => unsubscribe();
    }, [axiosPublic]);


    const authInfo = {
        user,
        loading,
        createUser,
        logIn,
        googleSignIn,
        logOut,
        updateUserProfile
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;