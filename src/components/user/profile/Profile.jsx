import React from "react";
import profilePic from "../../../../src/assets/profilepic.png";
import "./Profile.css";

export default function Profile() {
  return (
    <div className="profileMain">
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <div className="row h2">Ankit Patel</div>
            <div className="row"> 5 Years | 23 Year old | B.Tech/B.E.</div>
          </div>
          <div className="col-sm-6 profilePicUp">
            <img src={profilePic} className="profilePic" width="50" alt="profilePic" />
          </div>
        </div>
      </div>
    </div>
  );
}
