import React, { useState, useEffect } from "react";
import profilePic from "../../../../src/assets/profilepic.png";
import "./Profile.css";
import { getUserData, auth } from "../../../firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Profile() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getUserData(user.email).then((res) => {
          setUser(res);
          console.log("res = " + res);
        });
        console.log("user = " + user.email);
      } else {
        console.log("user = " + user);
      }
    });
  }, []);

  const getAge = (dateString) => {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };
  return (
    <div className="profileMain">
      <div className="container">
        <div className="mybio">
          <div className="row">
            <div className="col-sm-6">
              <div className="row h2">
                {user?.firstName} {user?.lastName}
              </div>
              <div className="row">
                {" "}
                {getAge(user?.dateOfBirth)} Year old | {user?.degree}
              </div>
            </div>
            <div className="col-sm-6 profilePicUp">
              <img
                src={profilePic}
                className="profilePic"
                width="50"
                alt="profilePic"
              />
            </div>
          </div>
        </div>
        <div className="mybio">
          <div className="row">
            <div className="col-sm-12">
              <h5>My Bio</h5>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">{user?.MyBio}</div>
          </div>
        </div>

        <div className="mybio">
          <div className="row">
            <div className="col-sm-12">
              <h5>Job Preference</h5>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">{user?.functionalArea}</div>
            <div className="col-sm-6 text-right">{user?.expectedSalary}</div>
          </div>
          <div className="row">
            <div className="col-sm-6">Any Industry</div>
            <div className="col-sm-6 text-right">{user?.preferredCity}</div>
          </div>
        </div>

        <div className="mybio">
          <div className="row">
            <div className="col-sm-12">
              <h5>Education</h5>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6 h6">{user?.instituteName}</div>
            <div className="col-sm-6 text-right">{user?.startEndTime}</div>
          </div>
          <div className="row">
            <div className="col-sm-4">{user?.degree}</div>
            <div className="col-sm-1">|</div>

            <div className="col-sm-4">{user?.fieldOfStudy}</div>
          </div>
        </div>

        {user?.iam === "Experienced" ? (
          <div className="mybio">
            <div className="row">
              <div className="col-sm-12">
                <h5>Work Experience</h5>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6">{user?.companyName}</div>
              <div className="col-sm-6 text-right">{user?.startEndDate}</div>
            </div>
            <div className="row">
              <div className="col-sm-6">{user?.designation}</div>
              <div className="col-sm-6 text-right">
                {user?.roleAndResponsibilty}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
