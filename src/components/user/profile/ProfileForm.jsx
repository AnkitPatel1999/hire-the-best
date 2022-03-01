import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { auth, db } from "./../../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { BtnLoadingProcess } from "./../../shared/CommanComponent";
import { useForm } from "react-hook-form";

export default function ProfileForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [stage, setStage] = useState(1);
  const [values, setValues] = useState({
    jobType: "",
    functionalArea: "",
    preferredCity: "",
    expectedSalary: "",
    stage: 1,
  });
  const [whoIam, setWhoIam] = useState("Fresher");
  const jobTypeData = ["Full Time", "Part-time", "Internship", "Freelacer"];
  const functionalAreaData = [
    "Full Stack Engineer",
    "Data Entry",
    "Accoutant",
    "Human Resource",
    "Business Development Manager",
  ];
  const [process, setProcess] = useState({
    loadingJP: false,
    loadingMP: false,
    loadingHE: false,
    loadingWE: false,
    loadingMB: false,
    success: false,
    error: false,
  });
  const {
    loadingJP,
    loadingMP,
    loadingHE,
    loadingWE,
    loadingMB,
    success,
    error,
  } = process;
  const [docEmail, setDocEmail] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setDocEmail(user.email);
        console.log("user = " + user.email);
      } else {
        setDocEmail(null);
        console.log("user = " + user);
      }
    });
  }, []);

  const onSubmit =async (data) => {
    console.log(loadingJP);
    setProcess({ ...process, loadingJP: true });
    console.log(loadingJP);

    console.log(data);
    const stage = parseInt(data.stage);
    const jobPrefRef = doc(db, "users", docEmail);
    setDoc(jobPrefRef, data, { merge: true })
      .then((res) => {
        console.log(res);
        setStage(stage);
      })
      .catch((error) => {
        console.log(error);
      });
      console.log(loadingJP);

    setProcess({ ...process, loadingJP: false });
  };

  const onSaveandNext = (stage, data) => {
    // setProcess({ ...process, loadingJP: true });
    // if (stage === 2) {
    //   const jobPrefRef = doc(db, "users", docEmail);
    //   setDoc(jobPrefRef, data, { merge: true })
    //     .then((res) => {
    //       console.log(res);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // }
    // setProcess({ ...process, loadingJP: false });
    // setStage(stage);
  };

  const onBack = (stage) => {
    setStage(stage);
  };

  const handleInput = (e) => {
    console.log(e.target.value);
    // setWhoIam(e.target.value);
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const jobPreference = () => {
    return (
      <div>
        <h4 className="mt-2">Job Preference</h4>
        <h6>What type of job are looking for?</h6>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" name="stage" value="1" {...register("stage")} />
          <div className="form-group mt-2 mb-2">
            <label>Job Type</label>
            <select
              className="form-select"
              name="jobType"
              {...register("jobType", { required: true })}
            >
              <option value="">Select your job type</option>
              {jobTypeData.map((job) => (
                <option value={job}>{job}</option>
              ))}
            </select>
            <p className="text-danger">
              {errors.jobType ? "Job Type is required" : ""}
            </p>
          </div>

          <div className="form-group mt-2 mb-2">
            <label>Functional Area</label>
            <select
              className="form-select"
              name="functionalArea"
              {...register("functionalArea", { required: true })}
            >
              <option value="">Select your Functional Area</option>
              {functionalAreaData.map((data) => (
                <option value={data}>{data}</option>
              ))}
            </select>
            <p className="text-danger">
              {errors.functionalArea ? "Functional Area is required" : ""}
            </p>
          </div>

          <div className="form-group mt-2 mb-2">
            <label>Preferred City</label>
            <input
              type="text"
              className="form-control"
              name="preferredCity"
              {...register("preferredCity", { required: true })}
            />
            <p className="text-danger">
              {errors.preferredCity ? "Preferred City is required" : ""}
            </p>
          </div>

          <div className="form-group mt-2 mb-2">
            <label>Expected Salary</label>
            <select
              className="form-select"
              name="expectedSalary"
              {...register("expectedSalary", { required: true })}
            >
              <option value="">Select your Expected Salary</option>
              <option value="Rs 1 LPA">Rs 1 LPA</option>
              <option value="Rs 2 LPA">Rs 2 LPA</option>
              <option value="Rs 3 to 5 LPA">Rs 3 to 5 LPA</option>
              <option value="Rs 4 to 6 LPA">Rs 4 to 6 LPA</option>
              <option value="Rs 5 to 7 LPA">Rs 5 to 7 LPA</option>
            </select>
            <p className="text-danger">
              {errors.expectedSalary ? "Expected Salary is required" : ""}
            </p>
          </div>

          <button type="submit" className="btn btn-primary mt-2 btn-block">
            <BtnLoadingProcess loading={loadingJP} btnMsg="Save & Next" />
          </button>
        </form>
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" name="stage" value="2" {...register("stage")} />
          <div className="form-group d-flex justify-content-between mt-4 mb-2">
            <label>
              <h6>My Profile Picture</h6>
            </label>
            <input type="file" className="form-control-file" />
            {/* {...register("profilePic", { required: true })} */}
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
                {...register("gender", { required: true })}
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
                {...register("iam", { required: true })}
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
                {...register("iam", { required: true })}
                onChange={handleInput}
              />
              <label className="form-check-label" for="experienced">
                Experienced
              </label>
            </div>
          </div>

          <div className="form-group mt-2 mb-2">
            <label>First Name</label>
            <input
              type="text"
              className="form-control"
              {...register("firstName", { required: true })}
            />
          </div>

          <div className="form-group mt-2 mb-2">
            <label>Last Name</label>
            <input
              type="text"
              className="form-control"
              {...register("lastName", { required: true })}
            />
          </div>

          <div className="form-group mt-2 mb-2">
            <label>My Email</label>
            <input
              type="email"
              className="form-control"
              {...register("email", { required: true })}
            />
          </div>

          <div className="form-group mt-2 mb-2">
            <label>My Date of Birth</label>
            <input
              type="date"
              className="form-control"
              {...register("dateOfBirth", { required: true })}
            />
          </div>

          <button type="submit" className="btn btn-primary mt-2 btn-block">
            <BtnLoadingProcess loading={loadingMP} btnMsg="Save & Next" />
          </button>
        </form>
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
          <BtnLoadingProcess loading={loadingHE} btnMsg="Save & Next" />
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
          <BtnLoadingProcess loading={loadingWE} btnMsg="Save & Next" />
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
          <BtnLoadingProcess loading={loadingMB} btnMsg="Save" />
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
