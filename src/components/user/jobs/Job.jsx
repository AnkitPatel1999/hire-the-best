import React from "react";
import "./Job.css"
import profilepic from "./../../../../src/assets/profilepic.png"

export default function Job() {
  const jobs = {
    jobName: "Python Developer",
    expectedSalary: "Rs 4 - 9 LPA",
    experience: "0 - 1 Year",
    degreeName: "Graduation/Diploma",
    companyName: "Azim Premiji Foundation",
    employeeSize: "0 - 20 Employees People",
    recruiterName: "Manjeet Hooda",
    recruiterDesignation: "Founder & CEO",
    companyLocation: "Delhi,DL",
    companyDescription: "Azim Premiji Foundation is tech first start-up...",
  };

  const {
    jobName,
    expectedSalary,
    experience,
    degreeName,
    companyName,
    employeeSize,
    recruiterName,
    recruiterDesignation,
    companyLocation,
    companyDescription,
  } = jobs;

  return (
    <div className="mt-2">
      <div class="card w-50 m-auto">
        <div class="card-body">
          <div className="row">
            <div className="col-sm-6">
              <h5 class="card-title">{jobName}</h5>
            </div>
            <div className="col-sm-6 salary">
              <p>{expectedSalary}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-3">
              <p className="experience">{experience}</p>
            </div>
            <div className="col-sm-9">
              <p className="degreeName">{degreeName}</p>
            </div>
          </div>
          <div className="row3">
            <div className="companyName">
              <p>{companyName}</p>
            </div>
            <div className="">
              <p>{employeeSize}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-4 d-flex">
                <img className="profilepic" src={profilepic} alt="pic" />
              <p >{recruiterName}</p>
            </div>
            <div className="col-sm-4">
              <p>{recruiterDesignation}</p>
            </div>
            <div className="col-sm-4">
              <p>{companyLocation}</p>
            </div>
          </div>
          <div className="row">
              <hr className="hr" />
          </div>
          <div className="row">
            <div className="col-sm-12">
              <p>{companyDescription}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
