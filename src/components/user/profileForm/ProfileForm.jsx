import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { auth, db } from "../../../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { BtnLoadingProcess } from "../../shared/CommanComponent";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";

export default function ProfileForm() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const {
    register: registerJP,
    handleSubmit: handleSubmitJP,
    formState: { errorsJP }
  } = useForm();

  const {
    register: registerMP,
    handleSubmit: handleSubmitMP,
    formState: { errorsMP }
  } = useForm();

  const {
    register: registerHE,
    handleSubmit: handleSubmitHE,
    formState: { errorsHE }
  } = useForm();
  const {
    register: registerWE,
    handleSubmit: handleSubmitWE,
    formState: { errorsWE }
  } = useForm();
  const {
    register: registerMB,
    handleSubmit: handleSubmitMB,
    formState: { errorsMB }
  } = useForm();
  const [stage, setStage] = useState(1);
  const [values, setValues] = useState({
    jobType: "",
    functionalArea: "",
    preferredCity: "",
    expectedSalary: "",
    stage: 1
  });
  const [whoIam, setWhoIam] = useState("Fresher");
  const jobTypeData = ["Full Time", "Part-time", "Internship", "Freelacer"];
  const functionalAreaData = [
    "Full Stack Engineer",
    "Data Entry",
    "Accoutant",
    "Human Resource",
    "Business Development Manager"
  ];
  const [process, setProcess] = useState({
    loadingJP: false,
    loadingMP: false,
    loadingHE: false,
    loadingWE: false,
    loadingMB: false,
    success: false,
    error: false
  });
  const {
    loadingJP,
    loadingMP,
    loadingHE,
    loadingWE,
    loadingMB,
    success,
    error
  } = process;
  const [docEmail, setDocEmail] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setDocEmail(user.email);
        console.log("user = " + user.email);
        getUserByEmail(user.email);
      } else {
        setDocEmail(null);
        console.log("user = " + user);
      }
    });
  }, []);

  const getUserByEmail = async (email) => {
    const userRef = doc(db, "users", email);
    const docSnap = await getDoc(userRef);
    console.log(docSnap.data());

    setStage(parseInt(docSnap.data().stage));
    setWhoIam(docSnap.data().iam);
  };

  // useEffect(() => {
  //   // setWhoIam(1)

  // }, [whoIam]);

  const onSubmit = async (data) => {
    const stageRef = parseInt(data.stage);
    console.log(stageRef);
    console.log(data);
    await onSaveandNext(stageRef, data);
  };

  const onSubmitMyProfile = async (data) => {
    const stageRef = parseInt(data.stage);
    console.log(stageRef);
    console.log(data);
    await onSaveandNext(stageRef, data);
  };
  const onSubmitHighestEducation = async (data) => {
    const stageRef = parseInt(data.stage);
    console.log(stageRef);
    console.log(data);
    await onSaveandNext(stageRef, data);
  };
  const onSubmitWorkExperience = async (data) => {
    const stageRef = parseInt(data.stage);
    console.log(stageRef);
    console.log(data);
    await onSaveandNext(stageRef, data);
  };
  const onSubmitMyBio = async (data) => {
    const stageRef = parseInt(data.stage);
    console.log(stageRef);
    console.log(data);
    await onSaveandNext(stageRef, data);
  };

  const onSaveandNext = (stageRef, data) => {
    const jobPrefRef = doc(db, "users", docEmail);
    setDoc(jobPrefRef, data, { merge: true })
      .then((res) => {
        console.log(res);
        setStage(stageRef);
        console.log(stage);
      })
      .catch((error) => {
        console.log(error);
      });
    reset();
    return;
  };

  const onBack = (stage) => {
    setStage(stage);
  };

  const handleInput = (e) => {
    console.log(e.target.value);
    setWhoIam(e.target.value);
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const jobPreference = (stage) => {
    return (
      <div>
        <h4 className="mt-2">Job Preference</h4>
        <h6>What type of job are looking for?</h6>
        <form onSubmit={handleSubmitJP(onSubmit)}>
          <input
            type="hidden"
            name="stage"
            value={stage}
            {...registerJP("stage")}
          />
          <div className="form-group mt-2 mb-2">
            <label>Job Type</label>
            <select
              className="form-select"
              name="jobType"
              {...registerJP("jobType", { required: true })}
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
              {...registerJP("functionalArea", { required: true })}
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
              {...registerJP("preferredCity", { required: true })}
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
              {...registerJP("expectedSalary", { required: true })}
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

  const myProfile = (stage) => {
    console.log(stage)
    console.log(errorsMP)
    return (
      <div>
        <div onClick={() => onBack(1)} className="onProfileBackIcon">
          <FontAwesomeIcon className="onBack" icon={faArrowLeft} />
        </div>
        <h6 className="mt-2 mb-2">
          Complete Profile will help you connect with more recruiters
        </h6>
        <form onSubmit={handleSubmitMP(onSubmitMyProfile)}>
          <input
            type="hidden"
            name="stage"
            value={stage}
            {...registerMP("stage")}
          />
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
                {...registerMP("gender", { required: true })}
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
                {...registerMP("iam", { required: true })}
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
                {...registerMP("iam", { required: true })}
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
              {...registerMP("firstName", { required: true })}
            />
          </div>

          <div className="form-group mt-2 mb-2">
            <label>Last Name</label>
            <input
              type="text"
              className="form-control"
              {...registerMP("lastName", { required: true })}
            />
          </div>

          <div className="form-group mt-2 mb-2">
            <label>My Email</label>
            <input
              type="email"
              className="form-control"
              {...registerMP("email", { required: true })}
            />
          </div>

          <div className="form-group mt-2 mb-2">
            <label>My Date of Birth</label>
            <input
              type="date"
              className="form-control"
              {...registerMP("dateOfBirth", { required: true })}
            />
          </div>

          <button type="submit" className="btn btn-primary mt-2 btn-block">
            <BtnLoadingProcess loading={loadingMP} btnMsg="Save & Next" />
          </button>
        </form>
      </div>
    );
  };

  const highestEducation = (stage) => {
    return (
      <div>
        <div onClick={() => onBack(2)} className="onProfileBackIcon">
          <FontAwesomeIcon className="onBack" icon={faArrowLeft} />
        </div>
        <h5 className="mt-2">Highest Education</h5>
        <b>Please fill in your highest education details</b>
        <form onSubmit={handleSubmitHE(onSubmitHighestEducation)}>
          <input
            type="hidden"
            name="stage"
            value={stage}
            {...registerHE("stage")}
          />

          <div className="form-group mt-2 mb-2">
            <label>Institute Name</label>
            <input
              type="text"
              {...registerHE("instituteName", { required: true })}
              className="form-control"
            />
          </div>

          <div className="form-group mt-2 mb-2">
            <label>Education Level and Degree</label>
            <input
              type="text"
              {...registerHE("degree", { required: true })}
              className="form-control"
            />
          </div>

          <div className="form-group mt-2 mb-2">
            <label>Field of Study</label>
            <input
              type="text"
              {...registerHE("fieldOfStudy", { required: true })}
              className="form-control"
            />
          </div>

          <div className="form-group mt-2 mb-2">
            <label>Start & End Time</label>
            <input
              type="text"
              {...registerHE("startEndTime", { required: true })}
              className="form-control"
            />
          </div>

          <button type="submit" className="btn btn-primary mt-2 btn-block">
            <BtnLoadingProcess loading={loadingHE} btnMsg="Save & Next" />
          </button>
        </form>
      </div>
    );
  };

  const workExperience = (stage) => {
    return (
      <div>
        <div onClick={() => onBack(2)} className="onProfileBackIcon">
          <FontAwesomeIcon className="onBack" icon={faArrowLeft} />
        </div>
        <h5 className="mt-2">Work Experience</h5>
        <form onSubmit={handleSubmitWE(onSubmitWorkExperience)}>
          <input
            type="hidden"
            name="stage"
            value={stage}
            {...registerWE("stage")}
          />
          <div className="form-group mt-2 mb-2">
            <label>Company Name</label>
            <input
              type="text"
              className="form-control"
              {...registerWE("companyName")}
            />
          </div>

          <div className="form-group mt-2 mb-2">
            <label>Start & End Date</label>
            <input
              type="text"
              className="form-control"
              {...registerWE("startEndDate")}
            />
          </div>

          <div className="form-group mt-2 mb-2">
            <label>My Designation</label>
            <input
              type="text"
              className="form-control"
              {...registerWE("designation")}
            />
          </div>

          <div className="form-group mt-2 mb-2">
            <label>Role & Responsibility</label>
            <input
              type="text"
              className="form-control"
              {...registerWE("roleAndResponsibilty")}
            />
          </div>

          <button type="submit" className="btn btn-primary mt-2 btn-block">
            <BtnLoadingProcess loading={loadingWE} btnMsg="Save & Next" />
          </button>
        </form>
      </div>
    );
  };

  const myBio = (stage) => {
    return (
      <div>
        <div onClick={() => onBack(3)} className="onProfileBackIcon">
          <FontAwesomeIcon className="onBack" icon={faArrowLeft} />
        </div>
        <h5 className="mt-2">The Last Step!</h5>
        <form onSubmit={handleSubmitMB(onSubmitMyBio)}>
          <input
            type="hidden"
            name="stage"
            value={stage}
            {...registerMB("stage")}
          />
          <div className="form-group mt-2 mb-2">
            <label>
              <h4>My Bio</h4>
            </label>
            <textarea
              rows="4"
              className="form-control mt-3"
              {...registerMB("MyBio")}
            />
          </div>

          <button type="submit" className="btn btn-primary mt-2 btn-block">
            <BtnLoadingProcess loading={loadingMB} btnMsg="Save" />
          </button>
        </form>
      </div>
    );
  };

  return (
    <div className="col-md-4 offset-sm-4 text-left">
      {stage === 1 ? jobPreference(2) : ""}
      {stage === 2 ? myProfile(3) : ""}
      {stage === 3 && whoIam === "Fresher" ? highestEducation(5) : ""}
      {stage === 3 && whoIam === "Experienced" ? highestEducation(4) : ""}
      {stage === 4 && whoIam === "Experienced" ? workExperience(5) : ""}

      {stage === 5 ? myBio(6) : ""}
      {stage === 6 ? (
        <h4>
          <Navigate to="/profile" />
        </h4>
      ) : (
        ""
      )}
    </div>
  );
}
