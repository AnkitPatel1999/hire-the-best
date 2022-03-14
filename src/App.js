import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from './components/user/SignIn'
import SignUp from './components/user/SignUp'
import ForgotPassword from './components/user/ForgotPassword'
import Header from './components/home/Header'
import ProfileForm from './components/user/profileForm/ProfileForm'
import Profile from './components/user/profile/Profile'
import Job from './components/user/jobs/Job'
import RecruiterForm from './components/recruiter/recruiterForm/RecruiterForm'
import PostJob from './components/recruiter/PostJob'
// import Home from './components/home/Home'
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user.email);
        // console.log("user = " + user.email);
      } else {
        setUser(null);
        // console.log("user = " + user);
      }
    });
  }, []);
  return (
    <div>

      <BrowserRouter>
        <Header />
        <Routes>
        {/* {user?:} */} 
          <Route path="/" element={<Job />} />
          <Route path="signin" exact element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="profile-setup" element={<ProfileForm />} />
          <Route path="profile" element={<Profile />} />

          <Route path="recruiter-profile-setup" element={<RecruiterForm />} />
          <Route path="post-job" element={<PostJob />} />

        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
