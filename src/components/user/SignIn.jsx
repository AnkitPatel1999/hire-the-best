import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faEnvelope,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { auth, db } from "./../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Home from "../home/Home";

const SignIn = () => {
  const [userInput, setUserInput] = useState({ email: "", password: "" });
  const [stage, setStage] = useState(1);
  const [iam, setIam] = useState(null);
  const { email, password } = userInput;
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

    const userRef = doc(db, "users", email);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      if (iam === docSnap.data().role) {
        signInWithEmailAndPassword(auth, email, password)
          .then((res) => {
            console.log(res.user);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.log("no " + iam + " available");
      }
    } else {
      // doc.data() will be undefined in this case
      console.log("user not found !");
    }
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
            </div>
            <button
              type="submit"
              className="btn btn-outline-primary btn-block mt-3"
              onClick={handleSubmit}
            >
              Log in
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
