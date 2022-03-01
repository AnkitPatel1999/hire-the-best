import React, { useState, useEffect } from "react";
import "./Header.css";
import { auth } from "./../../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { Link , useNavigate} from "react-router-dom";

export default function Header() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate()
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user.email);
        console.log("user = " + user.email);
      } else {
        setUser(null);
        console.log("user = " + user);
      }
    });
  }, []);

  const onSignout = () => {
    signOut(auth)
      .then((res) => {
        console.log(res);
        navigate('/signin')
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div className="container-fluid">
        <div className="main">
          <Link to="/">
            <h3>Hire The Best</h3>
          </Link>
          {user ? (
            <h6 onClick={onSignout}>Sign Out</h6>
          ) : (
            <Link to="/signin">Sign In</Link>
          )}
        </div>
      </div>
    </div>
  );
}
