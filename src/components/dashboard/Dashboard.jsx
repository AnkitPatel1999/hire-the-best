import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="dashboardContainer m-4">
      <div className="row">
        <div className="col-sm-2">
          <Link to="/post-job">
            <div className="btn btn-primary">Create a Post</div>
          </Link>
        </div>
        <div className="col-sm-10"></div>
      </div>
    </div>
  );
}
