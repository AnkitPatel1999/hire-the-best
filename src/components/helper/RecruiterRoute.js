import React, { useState, useEffect } from 'react'
import { auth, db } from "./../../firebase"
import { doc, getDoc } from "firebase/firestore";
import { Navigate } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"

export default function RecruiterRoute({ children }) {

    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user.email);
                getUserByEmail(user.email)
            } else {
                setUser(null);
            }
        });
    }, []);

    const getUserByEmail = async (email) => {
        const userRef = doc(db, "users", email);
        const docSnap = await getDoc(userRef);
        setRole(docSnap.data().role);
    };

    if (user && role == 'Recruiter') {
        console.log("user && role == 'Recruiter'" + true)
        return children
    } else {
        return <Navigate to="/dashboard" />
    }


}
