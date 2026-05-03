import { createContext, useEffect, useRef, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { io } from "socket.io-client";
import { useQueryClient } from "@tanstack/react-query";

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    const socketRef = useRef(null);

    const queryClient = useQueryClient();

    const googleProvider = new GoogleAuthProvider();

    const axiosPublic = useAxiosPublic();

    // Socket Connect
    useEffect(() => {
        socketRef.current = io("https://asset-management-api-tf4m.onrender.com", {
            transports: ["websocket"],
            reconnection: true
        });

        return () => {
            socketRef.current?.disconnect();
        };
    }, []);

    // Join + Listen
    const [newNotification, setNewNotification] = useState(null);

    useEffect(() => {
        if (!socketRef.current || !user?.email) return;

        const socket = socketRef.current;

        const handleNotification = (data) => {
            console.log("New notification:", data);

            // Real-time update
            queryClient.invalidateQueries({
                queryKey: ["notifications"],
            });

            queryClient.invalidateQueries({
                queryKey: ["unread-count"],
            });

            setNewNotification(data);
        };

        if (user?.email) {
            socket.emit("join", user.email);
        }

        socket.on("new-notification", handleNotification);

        return () => {
            socket.off("connect");
            socket.off("new-notification", handleNotification);
        };
    }, [user]);

    // Create user
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // Sign in user
    const logIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    // Sign in with google
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    // Log out user
    const logOut = () => {
        setLoading(true);
        return signOut(auth)
    }

    // Update user profile
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        })
    }
    // Observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {

            setUser(currentUser);

            if (currentUser?.email) {
                try {
                    const userInfo = {
                        name: currentUser.displayName || "Anonymous",
                        email: currentUser.email.toLowerCase().trim(),
                        role: "employee",
                    };

                    await axiosPublic.post('/users', userInfo);

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
        updateUserProfile,
        newNotification
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;