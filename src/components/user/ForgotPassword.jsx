import React, { useRef, useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./../../firebase";

export default function ForgotPassword() {
  const [values, setValues] = useState({
    error: false,
    success: false,
    loading: false,
    didRedirect: false,
  });
  const emailRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, emailRef.current.value)
      .then((res) => {
        setValues({ success: true });
        console.log("mail sent successfully ", res);
      })
      .catch((error) => {
        setValues({ error: true });
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
      });
  };

  return (
    <div>
      <div className="bg-light h-100 d-flex justify-content-center">
        <div className="card w-50 min-h mt-5">
          <div className="card-body p-4">
            <h5 className="card-title">Change Password</h5>
            <hr className="hr-text" />

            <form>
              <div className="form-group mb-3">
                <label>Email</label>
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  ref={emailRef}
                />
              </div>

              <div className="btn-row">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="btn btn-outline-primary btn-block mt-2"
                >
                  Submit
                </button>
              </div>
            </form>

            {values.success && (
              <div className="alert alert-success mt-5">
                <h4 className="alert-heading">Success!</h4>
                <p>Email sent successfully</p>
              </div>
            )}

            {values.error && (
              <div className="alert alert-danger mt-5">
                <h4 className="alert-heading">Error!</h4>
                <p>User Not Found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
