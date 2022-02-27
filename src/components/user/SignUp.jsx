import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { auth } from "./../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { email, password, confirmPassword } = userData;

  const handleInput = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((user) => {
          console.log(user);
        })
        .catch((error) => {
          console.log(error);
        });
      console.log(userData);
    } else {
      console.log("Password not match");
    }
  };

  const signUpForm = () => {
    return (
      <div className="">
        <div className="col-md-4 offset-sm-4 text-left">
          <h3 className="text-center m-3">Register Yourself</h3>
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
  return <div>{signUpForm()}</div>;
};

export default SignUp;
