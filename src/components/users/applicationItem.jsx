import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function AppicationItem({ title }) {
  return (
    <div className="card bg-[#FFFFFF] shadow-md compact side bg-base-100 bg-opacity-97 m border-double border-4 border-blue-600">
      <div className="flex-col space-x-4 card-body">
        <h2 className="card-title text-black">{title}</h2>
        <div>
          <Link
            className="card shadow-md w-[55%] text-center text-black content-center text-base-content text-opacity-50 border-solid border-2 border-blue-200"
            to={`/applications/${title}`}
          >
            Get Details
          </Link>
        </div>
      </div>
    </div>
  );
}

AppicationItem.propTypes = {
  title: PropTypes.string.isRequired
};
export default AppicationItem;
