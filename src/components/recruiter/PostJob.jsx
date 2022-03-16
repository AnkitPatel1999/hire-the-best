import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { auth, db } from "../../firebase";
import {
  doc,
  addDoc,
  collection,
  getDoc,
  serverTimestamp
} from "firebase/firestore";
import { BtnLoadingProcess } from "../shared/CommanComponent";
import { useForm } from "react-hook-form";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const RecruiterForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const [docEmail, setDocEmail] = useState(null);
  const [recruiterId, setRecruiterId] = useState(null);
  const navigate = useNavigate();
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
  };

  const onSubmit = async (data) => {
    data.rid = recruiterId;
    data.createdAt = new Date();
    console.log(data);

    await onSaveandNext(data);
  };

  const onSaveandNext = async (data) => {
    const collectionRef = collection(db, "jobs");
    await addDoc(collectionRef, data)
      .then(() => {
        console.log("done");
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
    reset();
    return;
  };

  const onBack = () => {};

  const postJob = () => {
    return (
      <div>
        <div onClick={() => onBack()} className="onProfileBackIcon">
          <FontAwesomeIcon className="onBack" icon={faArrowLeft} />
        </div>
        <h5 className="mt-2">Post a Full Time Job</h5>
        {/* <h6 className="mt-2 mb-2">Introduce your company to candidates</h6> */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group mt-2 mb-2">
            <label>Job Title</label>
            <input
              type="text"
              className="form-control"
              {...register("title", { required: true })}
            />
          </div>

          <div className="form-group mt-2 mb-2">
            <label>Job Description</label>
            <input
              type="text"
              className="form-control"
              {...register("description", { required: true })}
            />
          </div>

          <div className="form-group mt-2 mb-2 jobReq">
            <h6>Job Requirements</h6>
            <div className="form-group mt-2 mb-2">
              <label>Experience</label>
              <input
                type="text"
                className="form-control"
                {...register("experience", { required: true })}
              />
            </div>

            <div className="form-group mt-2 mb-2">
              <label>Education</label>
              <input
                type="text"
                className="form-control"
                {...register("education", { required: true })}
              />
            </div>

            <div className="form-group mt-2 mb-2">
              <label>Salary</label>
              <input
                type="text"
                className="form-control"
                {...register("salary", { required: true })}
              />
            </div>
          </div>

          <div className="form-group mt-2 mb-2">
            <label>Job Location</label>
            <input
              type="text"
              className="form-control"
              {...register("location", { required: true })}
            />
          </div>

          <button type="submit" className="btn btn-primary mt-2 btn-block">
            <BtnLoadingProcess loading={false} btnMsg="Save" />
          </button>
        </form>
      </div>
    );
  };

  return (
    <>
      <div className="col-md-4 offset-sm-4 text-left">{postJob()}</div>
    </>
  );
};

export default RecruiterForm;
