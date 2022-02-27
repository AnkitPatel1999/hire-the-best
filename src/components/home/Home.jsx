import React from "react";
import jobseeker from "../../../src/assets/jobseeker.svg";
import recruiter from "../../../src/assets/recruiter.svg";
import "./Home.css";

export default function Home({ onJobseeker, onRecruiter }) {
  return (
    <div className="home">
      <h4 className="mt-3 mb-3">Choose Your Role</h4>
      <img src={jobseeker} width="200" alt="jobseeker" />
      <button onClick={onJobseeker} className="btn btn-primary mt-3 mb-2">
        I am a Job Seeker
      </button>
      <h6>or</h6>
      <img src={recruiter} width="200" alt="recruiter" />
      <button onClick={onRecruiter} className="btn btn-primary mt-3 mb-2">
        I am a Recruiter
      </button>
    </div>
  );
}
