import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function ProfileForm() {
  const [stage, setStage] = useState(1);
  const [whoIam, setWhoIam] = useState("Fresher");
  const jobTypeData = ["Full Time", "Part-time", "Internship", "Freelacer"];
  const functionalAreaData = [
    "Full Stack Engineer",
    "Data Entry",
    "Accoutant",
    "Human Resource",
    "Business Development Manager",
  ];

  const onSaveandNext = (stage) => {
    setStage(stage);
    console.log(typeof stage);
    console.log(stage);
  };

  const onBack = (stage) => {
    setStage(stage);
  };

  const handleInput = (e) => {
    console.log(e.target.value);
    setWhoIam(e.target.value);
  };

  const jobPreference = () => {
    return (
      <div>
        {/* <div onClick={() => onBack(1)} className="onProfileBackIcon">
          <FontAwesomeIcon className="onBack" icon={faArrowLeft} />
        </div> */}
        <h4 className="mt-2">Job Preference</h4>
        <h6>What type of job are looking for?</h6>
        <div className="form-group mt-2 mb-2">
          <label>Job Type</label>
          <select className="form-select">
            <option value="">Select your job type</option>
            {jobTypeData.map((job) => (
              <option value={job}>{job}</option>
            ))}
          </select>
        </div>

        <div className="form-group mt-2 mb-2">
          <label>Functional Area</label>
          <select className="form-select">
            <option value="">Select your Functional Area</option>
            {functionalAreaData.map((data) => (
              <option value={data}>{data}</option>
            ))}
          </select>
        </div>

        <div className="form-group mt-2 mb-2">
          <label>Preferred City</label>
          <input type="text" className="form-control" />
        </div>

        <div className="form-group mt-2 mb-2">
          <label>Expected Salary</label>
          <select className="form-select">
            <option value="">Select your Expected Salary</option>
            <option value="Rs 1 LPA">Rs 1 LPA</option>
            <option value="Rs 2 LPA">Rs 2 LPA</option>
            <option value="Rs 3 to 5 LPA">Rs 3 to 5 LPA</option>
            <option value="Rs 4 to 6 LPA">Rs 4 to 6 LPA</option>
            <option value="Rs 5 to 7 LPA">Rs 5 to 7 LPA</option>
          </select>
        </div>

        <button
          type="button"
          onClick={() => onSaveandNext(2)}
          className="btn btn-primary mt-2 btn-block"
        >
          Save & Next
        </button>
      </div>
    );
  };

  const myProfile = () => {
    return (
      <div>
        <div onClick={() => onBack(1)} className="onProfileBackIcon">
          <FontAwesomeIcon className="onBack" icon={faArrowLeft} />
        </div>
        <h6 className="mt-2 mb-2">
          Complete Profile will help you connect with more recruiters
        </h6>
        <div className="form-group d-flex justify-content-between mt-4 mb-2">
          <label>
            <h6>My Profile Picture</h6>
          </label>
          <input type="file" className="form-control-file" />
        </div>

        <label>My Gender</label>
        <div className="form-group d-flex">
          <div className="form-check m-2">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              id="male"
              value="Male"
              checked
            />
            <label className="form-check-label" for="male">
              Male
            </label>
          </div>
          <div className="form-check m-2">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              id="female"
              value="Female"
            />
            <label className="form-check-label" for="female">
              Female
            </label>
          </div>
        </div>

        <label>I am </label>
        <div className="form-group d-flex">
          <div className="form-check m-2">
            <input
              className="form-check-input"
              type="radio"
              name="iam"
              id="fresher"
              value="Fresher"
              onChange={handleInput}
            />
            <label className="form-check-label" for="fresher">
              Fresher
            </label>
          </div>
          <div className="form-check m-2">
            <input
              className="form-check-input"
              type="radio"
              name="iam"
              id="experienced"
              value="Experienced"
              onChange={handleInput}
            />
            <label className="form-check-label" for="experienced">
              Experienced
            </label>
          </div>
        </div>

        <div className="form-group mt-2 mb-2">
          <label>First Name</label>
          <input type="text" className="form-control" />
        </div>

        <div className="form-group mt-2 mb-2">
          <label>Last Name</label>
          <input type="text" className="form-control" />
        </div>

        <div className="form-group mt-2 mb-2">
          <label>My Email</label>
          <input type="email" className="form-control" />
        </div>

        <div className="form-group mt-2 mb-2">
          <label>My Date of Birth</label>
          <input type="date" className="form-control" />
        </div>

        <button
          type="button"
          onClick={() => onSaveandNext(3)}
          className="btn btn-primary mt-2 btn-block"
        >
          Save & Next
        </button>
      </div>
    );
  };

  const highestEducation = () => {
    return (
      <div>
        <div onClick={() => onBack(2)} className="onProfileBackIcon">
          <FontAwesomeIcon className="onBack" icon={faArrowLeft} />
        </div>
        <h5 className="mt-2">Highest Education</h5>
        <b>Please fill in your highest education details</b>

        <div className="form-group mt-2 mb-2">
          <label>Institute Name</label>
          <input type="text" className="form-control" />
        </div>

        <div className="form-group mt-2 mb-2">
          <label>Education Level and Degree</label>
          <input type="text" className="form-control" />
        </div>

        <div className="form-group mt-2 mb-2">
          <label>Field of Study</label>
          <input type="text" className="form-control" />
        </div>

        <div className="form-group mt-2 mb-2">
          <label>Start & End Time</label>
          <input type="text" className="form-control" />
        </div>

        <button
          type="button"
          onClick={() => onSaveandNext(4)}
          className="btn btn-primary mt-2 btn-block"
        >
          Save & Next
        </button>
      </div>
    );
  };

  const workExperience = () => {
    return (
      <div>
        <div onClick={() => onBack(2)} className="onProfileBackIcon">
          <FontAwesomeIcon className="onBack" icon={faArrowLeft} />
        </div>
        <h5 className="mt-2">Work Experience</h5>

        <div className="form-group mt-2 mb-2">
          <label>Company Name</label>
          <input type="text" className="form-control" />
        </div>

        <div className="form-group mt-2 mb-2">
          <label>Start & End Date</label>
          <input type="text" className="form-control" />
        </div>

        <div className="form-group mt-2 mb-2">
          <label>My Designation</label>
          <input type="text" className="form-control" />
        </div>

        <div className="form-group mt-2 mb-2">
          <label>Role & Responsibility</label>
          <input type="text" className="form-control" />
        </div>

        <button
          type="button"
          onClick={() => onSaveandNext(4)}
          className="btn btn-primary mt-2 btn-block"
        >
          Save & Next
        </button>
      </div>
    );
  };

  const myBio = () => {
    return (
      <div>
        <div onClick={() => onBack(3)} className="onProfileBackIcon">
          <FontAwesomeIcon className="onBack" icon={faArrowLeft} />
        </div>
        <h5 className="mt-2">The Last Step!</h5>

        <div className="form-group mt-2 mb-2">
          <label>
            <h4>My Bio</h4>
          </label>
          <textarea rows="4" className="form-control mt-3" />
        </div>

        <button
          type="button"
          onClick={() => onSaveandNext(5)}
          className="btn btn-primary mt-2 btn-block"
        >
          Save
        </button>
      </div>
    );
  };

  return (
    <div className="col-md-4 offset-sm-4 text-left">
      {stage === 1 ? jobPreference() : ""}
      {stage === 2 ? myProfile() : ""}
      {stage === 3
        ? whoIam === "Fresher"
          ? highestEducation()
          : workExperience()
        : ""}
      {stage === 4 ? myBio() : ""}
      {stage === 5 ? <h4>All Done</h4> : ""}
    </div>
  );
}
