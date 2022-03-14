import React, { useState, useEffect } from "react";
import "./Job.css";
import profilepic from "./../../../../src/assets/profilepic.png";
import { useNavigate } from "react-router-dom";
import { db } from "./../../../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Job() {
  const [job, setJob] = useState([]);

  const getJobs = async () => {
    const jobRef = await getDocs(collection(db, "jobs"));
    let data = [];
    jobRef.forEach((res) => {
      data.push(res.data());
    });
    setJob(data);
    console.log(data);
  };
  useEffect(() => {
    getJobs();
  }, []);

  return (
    <>
      {job.map((job,key) => {
        const { title, salary, experience, education, location, description } =
          job;
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
                  {/*  <div className="companyName">
                    <p>{companyName}</p>
                  </div>
                  <span className="">|</span>
                  <div className="">
                    <p>{employeeSize}</p>
                  </div>
                </div>
                <div className="row row4">
                  <div className="col-sm-3 d-flex">
                    <img className="profilepic" src={profilepic} alt="pic" />
                    <p>{recruiterName}</p>
                  </div>
                  <div className="col-sm-1">|</div>
                  <div className="col-sm-3">
                    <p>{recruiterDesignation}</p>
                  </div> */}

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
