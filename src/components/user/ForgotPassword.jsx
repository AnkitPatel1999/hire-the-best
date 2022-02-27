import React, { useState } from "react";

export default function ForgotPassword() {
  const [values, setValues] = useState({
    error: false,
    success: false,
    loading: false,
    didRedirect: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
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
                <label>Current Password</label>
                <input
                  className="form-control"
                  type="text"
                  name="current-password"
                />
              </div>

              <div className="form-group mb-3">
                <label>New Password</label>
                <input
                  className="form-control"
                  type="password"
                  name="new-password"
                />
              </div>

              <div className="form-group mb-3">
                <label>Confirm Password</label>
                <input
                  className="form-control"
                  type="password"
                  name="confirm-password"
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
            {/* <!-- *ngIf="success" --> */}

            {values.success && (
              <div className="alert alert-success mt-5">
                <h4 className="alert-heading">Success!</h4>
                <p>Password Changed Successfully</p>
              </div>
            )}

            {values.error && (
              <div className="alert alert-danger mt-5">
                <h4 className="alert-heading">Error!</h4>
                <p>Password Change failed</p>
              </div>
            )}

            {/* <div *ngIf="error" className="alert alert-danger mt-5">
            <h4 className="alert-heading">Error!</h4>
            <p>{{error}}</p>
        </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
