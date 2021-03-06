import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignIn from './components/user/SignIn'
import SignUp from './components/user/SignUp'
import ForgotPassword from './components/user/ForgotPassword'
import Header from './components/home/Header'
import ProfileForm from './components/user/profileForm/ProfileForm'
import Profile from './components/user/profile/Profile'
import JobList from './components/user/jobs/JobList'
import JobDescription from './components/user/jobs/JobDescription'
import RecruiterForm from './components/recruiter/recruiterForm/RecruiterForm'
import PostJob from './components/recruiter/PostJob'
import Dashboard from './components/dashboard/Dashboard'
// import PrivateRoute from './components/helper/PrivateRoute'


import { useSelector, useDispatch } from "react-redux";

function App() {

  const user = useSelector(state =>state.user.user)
  console.log(user?.email)

  const PrivateRoute = ({ children }) => {
    const user = useSelector(state => state.user.user)

    console.log(user?.email)
    if (user) {
      return children
    } else {
      return <Navigate to="/signin" />
    }
  }

  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" exact element={<JobList />} />
          <Route path="/job-description" exact element={
            <PrivateRoute>
              <JobDescription />
            </PrivateRoute>} />
          <Route path="signin" exact element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="profile-setup" element={<ProfileForm />} />
          <Route path="profile" element={<Profile />} />

          <Route path="recruiter-profile-setup" element={<RecruiterForm />} />
          <Route path="post-job" exact element={<PostJob />} />
          <Route path="dashboard" element={<Dashboard />} />

        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
