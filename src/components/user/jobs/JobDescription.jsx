import React, { useState, useEffect } from "react";
import "./JobDescription.css";
import profilepic from "./../../../../src/assets/profilepic.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";
import {
  faLocationDot,
  faWallet,
  faBriefcase,
  faGraduationCap,
  faClock
} from "@fortawesome/free-solid-svg-icons";

export default function JobDescription() {
  const { state } = useLocation();
  const jobDesc = state;
  const {
    title,
    salary,
    experience,
    education,
    location,
    description,
    createdAt
  } = jobDesc[0];

  const { firstName, lastName, designation } = jobDesc[1].myProfile;

  const { fullName, size, location2 = location } = jobDesc[1].company;

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
    console.log(jobDesc);
  }, []);

  return (
    <>
      <div className="mt-4">
        <div className="card jobDescContainer m-auto">
          <div className="card-body">
            <div className="row">
              <div className="col-sm-10">
                <div className="row">{title}</div>
                <div className="row">{fullName}</div>
                <div className="row">
                  <span>
                    <FontAwesomeIcon className="FAIcon" icon={faBriefcase} />
                    {experience}
                  </span>
                </div>
                <div className="row">
                  <span>
                    <FontAwesomeIcon className="FAIcon" icon={faWallet} />
                    {salary}
                  </span>
                </div>
                <div className="row">
                  <span>
                    <FontAwesomeIcon className="FAIcon" icon={faLocationDot} />
                    {location}
                  </span>
                </div>
              </div>
              <div className="col-sm-2">
                <div className="row">
                  <img src={profilepic} width="100%" height="100%" />
                </div>
                <div className="row">
                  <button className="btn btn-primary">Apply</button>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-2">
                Posted: <FontAwesomeIcon className="FAIcon" icon={faClock} />
                {timeSince(createdAt.seconds * 1000)} Ago
              </div>
              <div className="col-sm-2">Openings: 10</div>
              <div className="col-sm-2">Job Applicants: 384</div>
              <div className="col-sm-6">Send Me Jobs Like This</div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="card jobDescContainer m-auto">
            <div className="card-body">
              <h5>Job Description</h5>
              <div className="jobDesc">{description}</div>

              <div className="companyDetails">
                <div className="row">
                  <div className="col-sm-2">Role</div>
                  <div className="col-sm-9">Software Development - Other</div>
                </div>
                <div className="row">
                  <div className="col-sm-2">Industry Type</div>
                  <div className="col-sm-9">IT Services & Consulting</div>
                </div>
                <div className="row">
                  <div className="col-sm-2">Functional Area</div>
                  <div className="col-sm-9">Engineering - Software</div>
                </div>
                <div className="row">
                  <div className="col-sm-2">Employment Type</div>
                  <div className="col-sm-9">Full Time, Permanent</div>
                </div>
                <div className="row">
                  <div className="col-sm-2">Role Category</div>
                  <div className="col-sm-9">Software Development</div>
                </div>
              </div>

              <div className="education">
                <b>Education</b>
                <div className="row">
                  <div className="col-sm-2">UG :</div>
                  <div className="col-sm-9">
                    <FontAwesomeIcon
                      className="FAIcon"
                      icon={faGraduationCap}
                    />
                    {education}
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-2">PG :</div>
                  <div className="col-sm-9">MCA in Computers</div>
                </div>
              </div>

              <div className="education">
                <b>Key Skills</b>
                <div className="row">
                  <div className="skill">HTML</div>
                  <div className="skill">CSS</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
