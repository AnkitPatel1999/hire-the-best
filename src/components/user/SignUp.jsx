import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faEnvelope,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "./../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Home from "../home/Home";

const SignUp = () => {
  let navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [stage, setStage] = useState(1);
  const [iam, setIam] = useState(null);
  const { email, password, confirmPassword } = userData;

  const handleInput = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const onJobseeker = () => {
    console.log("onJobseeker SignUp");
    setIam("Jobseeker");
    setStage(2);
  };

  const onRecruiter = () => {
    console.log("onRecruiter SignUp");
    setIam("Recruiter");
    setStage(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      console.log(db.collection);
      createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
          const userRef = doc(db, "users", email);
          setDoc(userRef, {
            uid: res.user.uid,
            email: email,
            password: password,
            role: iam,
            stage:1
          })
            .then((res) => {
              console.log(res);
              navigate("/profile-setup");
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
      console.log(userData);
    } else {
      console.log("Password not match");
    }
  };

  const onBack = () => {
    setStage(1);
    setIam(null);
  };

  const signUpForm = () => {
    return (
      <div className="">
        <div onClick={onBack} className="onBackIcon">
          <FontAwesomeIcon className="onBack" icon={faArrowLeft} />
        </div>
        <div className="col-md-4 offset-sm-4 text-left">
          <h3 className="text-center m-3">Register Yourself</h3>
          <div>
            I am a <b>{iam}</b>
          </div>
          <form>
            <div className="form-group mb-3">
              <div className="input-group">
                <span className="input-group-text" id="basic-addon1">
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
                <input
                  className="form-control input-sm"
                  type="Email"
                  name="email"
                  placeholder="Email"
                  onChange={handleInput}
                />
              </div>
            </div>

            <div className="form-group mb-3">
              <div className="input-group">
                <span className="input-group-text" id="basic-addon1">
                  <FontAwesomeIcon icon={faLock} />
                </span>
                <input
                  className="form-control input-sm"
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleInput}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <span className="input-group-text" id="basic-addon1">
                  <FontAwesomeIcon icon={faLock} />
                </span>
                <input
                  className="form-control input-sm"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  onChange={handleInput}
                />
              </div>
            </div>
            <button
              onClick={handleSubmit}
              className="btn btn-outline-primary btn-block mt-3"
            >
              Register
            </button>
            <div>
              <p className="d-flex mt-2">
                <span>Already have account?</span>
                <Link to="/signin" className="createNew">
                  Sign In{" "}
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  };
  return (
    <div>
      {stage == 1 ? (
        <Home onJobseeker={onJobseeker} onRecruiter={onRecruiter} />
      ) : (
        signUpForm()
      )}
    </div>
  );
};

export default SignUp;
