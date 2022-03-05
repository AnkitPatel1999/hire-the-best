import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { auth, db } from "../../../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { BtnLoadingProcess } from "../../shared/CommanComponent";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";

const RecruiterForm = () => {
  const {
    register: registerMP,
    handleSubmit: handleSubmitMP,
    reset,
    formState: { errorsMP }
  } = useForm();
  const [stage, setStage] = useState(1);
  const [whoIam, setWhoIam] = useState("Fresher");
  const [values, setValues] = useState({});
  const [docEmail, setDocEmail] = useState(null);

  const onSubmitMyProfile = async (data) => {
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

  const myProfile = (stage) => {
    console.log(stage);
    console.log(errorsMP);
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
            <BtnLoadingProcess loading={false} btnMsg="Save & Next" />
          </button>
        </form>
      </div>
    );
  };
  return <>{myProfile(1)}</>;
};

export default RecruiterForm;
