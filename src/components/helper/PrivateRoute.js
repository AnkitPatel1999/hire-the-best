import React, { useState, useEffect } from 'react'
import { auth } from "../../firebase"
import { Navigate } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"

export default function PrivateRoute({ children }) {

    const [user, setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user.email);
            }
        });
    }, []);
    
    console.log(user)
    console.log(children)

    if (user) {
        return children
    } else {
        return <Navigate to="/signin" />
    }


}
