import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInput = (e) => {
    console.log(e.target.name+" "+e.target.value)
    setUserData({...userData,[e.target.name]:e.target.value})
    console.log(userData)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(userData)
  }

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
