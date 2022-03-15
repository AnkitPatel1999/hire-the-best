import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { auth, db } from "../../../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { BtnLoadingProcess } from "../../shared/CommanComponent";
import { useForm } from "react-hook-form";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const RecruiterForm = () => {
  let navigate = useNavigate();

  const {
    register: registerMP,
    handleSubmit: handleSubmitMP,
    reset: resetMP,
    formState: { errorsMP }
  } = useForm();

  const {
    register: registerRC,
    handleSubmit: handleSubmitRC,
    reset: resetRC,
    formState: { errorsRC }
  } = useForm();

  const [stage, setStage] = useState(1);
  const [docEmail, setDocEmail] = useState(null);
  const [companyName, setCompanyName] = useState();
  const [recruiterId, setRecruiterId] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setDocEmail(user.email);
        setRecruiterId(user.uid);
        console.log("user = " + user.email);
        getUserByEmail(user.email);
      } else {
        setDocEmail(null);
        console.log("user = " + user);
      }
    });
  }, []);

  const getUserByEmail = async (email) => {
    const userRef = doc(db, "recruiter", email);
    const docSnap = await getDoc(userRef);
    console.log(docSnap.data());
    console.log(docSnap.data().stage);
    setCompanyName(docSnap.data().company.fullName);
    setStage(parseInt(docSnap.data().stage));
  };

  const onSubmitMyProfile = async (data) => {
    const stageRef = parseInt(data.stage);
    console.log(stageRef);
    console.log(data);
    await onSaveandNext(stageRef, data, "myProfile");
  };

  const onSubmitRegisterCompany = async (data) => {
    const stageRef = parseInt(data.stage);
    console.log(stageRef);
    setCompanyName(data.fullName);
    console.log(data);
    await onSaveandNext(stageRef, data, "company");
  };

  const onSaveandNext = (stageRef, data, type) => {
    delete data["stage"];
    const collectionRef = doc(db, "recruiter", docEmail);
    setDoc(
      collectionRef,
      { [type]: data, stage: stageRef, rid: recruiterId },
      { merge: true }
    )
      .then(() => {
        setStage(stageRef);
      })
      .catch((error) => {
        console.log(error);
      });

    if (type == "myProfile") {
      resetMP();
      navigate("/post-job");
      console.log("resetMP");
    } else if (type == "company") {
      resetRC();
      console.log("resetRC");
    }
    return;
  };

  const onBack = (stage) => {
    setStage(stage);
  };

  const myProfile = (stage) => {
    return (
      <div>
        <div onClick={() => onBack(1)} className="onProfileBackIcon">
          <FontAwesomeIcon className="onBack" icon={faArrowLeft} />
        </div>
        <h5 className="mt-2">My Recruiter Profile</h5>
        <h6 className="mt-2 mb-2">Introduce yourself to the candidates</h6>
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
            <label>My Company Name</label>
            <input
              type="text"
              className="form-control"
              value={companyName}
              {...registerMP("companyName", { required: true })}
            />
          </div>

          <div className="form-group mt-2 mb-2">
            <label>Designation</label>
            <input
              type="text"
              className="form-control"
              {...registerMP("designation", { required: true })}
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

          <button type="submit" className="btn btn-primary mt-2 btn-block">
            <BtnLoadingProcess loading={false} btnMsg="Save & Next" />
          </button>
        </form>
      </div>
    );
  };

  const registerCompany = (stage) => {
    return (
      <div>
        <div onClick={() => onBack(1)} className="onProfileBackIcon">
          <FontAwesomeIcon className="onBack" icon={faArrowLeft} />
        </div>
        <h5 className="mt-2">Register a Company</h5>
        <h6 className="mt-2 mb-2">Introduce your company to candidates</h6>
        <form onSubmit={handleSubmitRC(onSubmitRegisterCompany)}>
          <input
            type="hidden"
            name="stage"
            value={stage}
            {...registerRC("stage")}
          />

          <div className="form-group mt-2 mb-2">
            <label>Company Full Name</label>
            <input
              type="text"
              className="form-control"
              {...registerRC("fullName", { required: true })}
            />
          </div>

          <div className="form-group mt-2 mb-2">
            <label>Company Short Name</label>
            <input
              type="text"
              className="form-control"
              {...registerRC("shortName", { required: true })}
            />
          </div>

          <div className="form-group mt-2 mb-2">
            <label>Industry</label>
            <input
              type="text"
              className="form-control"
              {...registerRC("industry", { required: true })}
            />
          </div>

          <div className="form-group mt-2 mb-2">
            <label>Company Size</label>
            <input
              type="text"
              className="form-control"
              {...registerRC("size", { required: true })}
            />
          </div>

          <div className="form-group mt-2 mb-2">
            <label>Company Location</label>
            <input
              type="text"
              className="form-control"
              {...registerRC("location", { required: true })}
            />
          </div>

          <div className="form-group mt-2 mb-2">
            <label>Company Website</label>
            <input
              type="text"
              className="form-control"
              {...registerRC("website", { required: true })}
            />
          </div>

          <button type="submit" className="btn btn-primary mt-2 btn-block">
            <BtnLoadingProcess loading={false} btnMsg="Save & Next" />
          </button>
        </form>
      </div>
    );
  };

  return (
    <>
      <div className="col-md-4 offset-sm-4 text-left">
        {stage === 1 ? registerCompany(2) : ""}
        {stage === 2 ? myProfile(3) : ""}
      </div>
    </>
  );
};

export default RecruiterForm;
