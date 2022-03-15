import React, { useState, useEffect } from "react";
import "./Job.css";
import profilepic from "./../../../../src/assets/profilepic.png";
import { useNavigate } from "react-router-dom";
import { db } from "./../../../firebase";
import { collection, getDoc, getDocs, doc } from "firebase/firestore";

export default function Job() {
  const [job, setJob] = useState([]);

  const getJobs = async () => {
    const jobRef = await getDocs(collection(db, "jobs"));
    const recruiterRef = await getDocs(collection(db, "recruiter"));
    let recruiterData = [];
    recruiterRef.forEach((res) => {
      console.log(res.data());
      recruiterData.push(res.data());
    });
    let data = [];
    jobRef.forEach((res) => {
      console.log(res.data().rid);
      recruiterData.forEach((rd) => {
        console.log(rd.rid);
        if (res.data().rid == rd.rid) {
          data.push([res.data(), rd]);
        }
      });
    });
    setJob(data);
    console.log(data);
  };
  useEffect(() => {
    getJobs();
  }, []);

  return (
    <>
      {job.map((job, key) => {
        const { title, salary, experience, education, location, description } =
          job[0];

        const { firstName, lastName, designation } = job[1].myProfile;

        const { fullName, size, location2 = location } = job[1].company;

        console.log(fullName);
        return (
          <div key={key} className="mt-2">
            <div className="card w-50 m-auto">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-6">
                    <h5 className="card-title">{title}</h5>
                  </div>
                  <div className="col-sm-6 salary">
                    <p>{salary}</p>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-sm-3">
                    <p className="experience">{experience}</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="degreeName">{education}</p>
                  </div>
                </div>

                <div className="row3">
                  <div className="companyName">
                    <p>{fullName}</p>
                  </div>
                  <span className="">|</span>
                  <div className="">
                    <p>{size} Employees People</p>
                  </div>
                </div>
                <div className="row row4">
                  <div className="col-sm-3 d-flex">
                    <img className="profilepic" src={profilepic} alt="pic" />
                    <p>
                      {firstName} {lastName}
                    </p>
                  </div>
                  <div className="col-sm-1">|</div>
                  <div className="col-sm-3">
                    <p>{designation}</p>
                  </div>

                  <div className="col-sm-1">|</div>
                  <div className="col-sm-4">
                    <p>{location}</p>
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
