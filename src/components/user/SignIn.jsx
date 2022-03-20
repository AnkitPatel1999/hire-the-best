import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faEnvelope,
  faArrowLeft
} from "@fortawesome/free-solid-svg-icons";

import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "./../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Home from "../home/Home";
import { useDispatch } from "react-redux";
import { Login } from "../redux/actions/userAction";

const SignIn = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [userInput, setUserInput] = useState({ email: "", password: "" });
  const [stage, setStage] = useState(1);
  const [process, setProcess] = useState({
    loading: false,
    success: false,
    error: false
  });
  let [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
    errorMsg: ""
  });
  const [iam, setIam] = useState(null);
  const { email, password } = userInput;
  const { loading, success, error } = process;
  const { emailError, passwordError, errorMsg } = errors;

  const handleInput = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const onJobseeker = () => {
    console.log("onJobseeker signin");
    setIam("Jobseeker");
    setStage(2);
  };

  const onRecruiter = () => {
    console.log("onRecruiter signin");
    setIam("Recruiter");
    setStage(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(false);

    if (!email && !password) {
      setErrors({
        emailError: "Email is required",
        passwordError: "Password is required"
      });
      throw new Error("Invalid email and password");
    } else if (!email) {
      setErrors({
        ...errors,
        emailError: "Email is required",
        passwordError: ""
      });
      throw new Error("Invalid email");
    } else if (!password) {
      setErrors({
        ...errors,
        emailError: "",
        passwordError: "Password is required"
      });
      throw new Error("Invalid  password");
    }

    console.log(errors);
    setProcess({ ...process, loading: true });
    const userRef = doc(db, "users", email);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      if (iam === docSnap.data().role) {
        signInWithEmailAndPassword(auth, email, password)
          .then((res) => {
            console.log(res.user);
            dispatch(Login(res.user.email));
            if (iam === "Recruiter") {
              navigate("/recruiter-profile-setup");
            } else {
              navigate("/profile-setup");
            }
          })
          .catch((error) => {
            setErrors({ ...errors, errorMsg: "Password Wrong" });
            console.log(error.message);
          });
      } else {
        setErrors({ ...errors, errorMsg: `${iam} not registered` });
        console.log("no " + iam + " available");
      }
    } else {
      // doc.data() will be undefined in this case
      setErrors({ ...errors, errorMsg: "User not registered" });
      console.log("user not found !");
    }
    setProcess({ ...process, loading: false });
  };

  const onBack = () => {
    setStage(1);
    setIam(null);
  };

  const signInForm = () => {
    return (
      <div className="">
        <div onClick={onBack} className="onBackIcon">
          <FontAwesomeIcon className="onBack" icon={faArrowLeft} />
        </div>

        <div className="col-md-4 offset-sm-4 text-left">
          <p className="text-warning text-center">{errorMsg}</p>
          <h3 className="text-center m-3">Login</h3>
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
                  placeholder="Email"
                  name="email"
                  onChange={handleInput}
                />
              </div>
              <p className="text-warning">{emailError}</p>
            </div>

            <div className="form-group">
              <div className="input-group">
                <span className="input-group-text" id="basic-addon1">
                  <FontAwesomeIcon icon={faLock} />
                </span>
                <input
                  className="form-control input-sm"
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleInput}
                />
              </div>
              <p className="text-warning">{passwordError}</p>
            </div>
            <button
              type="submit"
              className="btn btn-outline-primary btn-block mt-3"
              onClick={handleSubmit}
            >
              {loading ? (
                <div>
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Loading...
                </div>
              ) : (
                "Log in"
              )}
            </button>
            <div>
              <p className="d-flex mt-2">
                <span>Don't have account?</span>
                <Link to="/signup" className="createNew">
                  Create One
                </Link>
              </p>
              <Link to="/forgot-password">Forgot Password</Link>
            </div>
          </form>
        </div>
      </div>
    );
  };
  return (
    <div>
      {stage == 1 ? (
        <Home onRecruiter={onRecruiter} onJobseeker={onJobseeker} />
      ) : (
        signInForm()
      )}
    </div>
  );
};

export default SignIn;
