import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { auth } from "./../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const SignIn = () => {
  const [userInput, setUserInput] = useState({ email: "", password: "" });
  const { email, password } = userInput;
  const handleInput = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res.user);
      })
      .catch((error) => {
        console.log(error);
      });
    e.preventDefault();
  };
  const signInForm = () => {
    return (
      <div className="">
        <div className="col-md-4 offset-sm-4 text-left">
          <h3 className="text-center m-3">Login</h3>
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
  return <div>{signInForm()}</div>;
};

export default SignIn;
