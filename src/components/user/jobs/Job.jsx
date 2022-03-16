import React, { useState, useEffect } from "react";
import "./Job.css";
import profilepic from "./../../../../src/assets/profilepic.png";
import { db } from "./../../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faWallet,
  faBriefcase,
  faGraduationCap,
  faClock
} from "@fortawesome/free-solid-svg-icons";

export default function Job() {
  const [job, setJob] = useState([]);

  const getJobs = async () => {
    const jobRef = await getDocs(collection(db, "jobs"));
    const recruiterRef = await getDocs(collection(db, "recruiter"));
    let recruiterData = [];
    recruiterRef.forEach((res) => {
      recruiterData.push(res.data());
    });
    let data = [];
    jobRef.forEach((res) => {
      recruiterData.forEach((rd) => {
        if (res.data().rid == rd.rid) {
          data.push([res.data(), rd]);
        }
      });
    });
    setJob(data);
  };

  const timeSince = (date) => {
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " Years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " Months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " Days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " Hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " Minutes";
    }
    return Math.floor(seconds) + " Seconds";
  };

  useEffect(() => {
    getJobs();
  }, []);

  return (
    <>
      {job.map((job, key) => {
        const {
          title,
          salary,
          experience,
          education,
          location,
          description,
          createdAt
        } = job[0];

        const { firstName, lastName, designation } = job[1].myProfile;

        const { fullName, size, location2 = location } = job[1].company;

        return (
          <div key={key} className="mt-2">
            <div className="card w-50 m-auto">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-6">
                    <h5 className="card-title jobTitle">{title}</h5>
                  </div>
                  <div className="col-sm-6 salary">
                    <p>
                      <FontAwesomeIcon className="FAIcon" icon={faWallet} />
                      {salary}
                    </p>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-sm-3">
                    <p className="experience">
                      <FontAwesomeIcon className="FAIcon" icon={faBriefcase} />
                      {experience}
                    </p>
                  </div>
                  <div className="col-sm-9">
                    <p className="degreeName">
                      <FontAwesomeIcon
                        className="FAIcon"
                        icon={faGraduationCap}
                      />
                      {education}
                    </p>
                  </div>
                </div>

                <div className="row3">
                  <div className="companyName">
                    <p>{fullName}</p>
                  </div>
                  <span className="">|</span>
                  <div className="">
                    <p>{size} Employees</p>
                  </div>
                </div>
                <div className="row row4">
                  <div className="col-sm-3 d-flex">
                    <img className="profilepic" src={profilepic} alt="pic" />
                    <p>
                      {firstName} {lastName}
                    </p>
                  </div>
                  <div className="col-sm-1 colCenter">|</div>
                  <div className="col-sm-3 desig">
                    <p>{designation}</p>
                  </div>

                  <div className="col-sm-1 colCenter">|</div>
                  <div className="col-sm-4 jobAddress">
                    <p>
                      <FontAwesomeIcon
                        className="FAIcon"
                        icon={faLocationDot}
                      />
                      {location}
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12 timeSince">
                    <FontAwesomeIcon className="FAIcon" icon={faClock} />
                    {timeSince(createdAt.seconds * 1000)} Ago
                  </div>
                </div>
                <div className="row">
                  <hr className="hr" />
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <p className="companyDescription">{description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
