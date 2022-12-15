import { useState, useContext } from "react";
import theContext from "../../context/mainContext/theContext";
import AlertContext from "../../context/alert/AlertContext";

function ApplicationsSearch() {
  const {
    applicationData,
    clearApplications,
    searchAllApplications,
    getAllApplications
  } = useContext(theContext);
  const { setAlert } = useContext(AlertContext);

  const [text, setText] = useState("");

  const handleChange = (e) => setText(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text === "") {
      setAlert("Please enter something", "error");
    } else {
      searchAllApplications(text);

      setText("");
    }
  };

  const handleClickAllApplications = (e) => {
    e.preventDefault();

    getAllApplications();
  };

  const handleClick = () => clearApplications();

  return (
    <div>
      <div className="flex flex-row-reverse mr-10">
        {applicationData.length > 0 && (
          <button
            type="submit"
            className="rounded-2-none w-46 btn btn-lg"
            onClick={handleClick}
          >
            Clear
          </button>
        )}
      </div>

      <div className="flex flex-col items-center justify-center w-[100%] ">
        <div className="w-[100%] relative pl-5 flex items-center justify-center ">
          <button
            type="submit"
            className="rounded-2-none w-46 btn btn-lg"
            onClick={handleClickAllApplications}
          >
            Get All Applications in the Database
          </button>
        </div>

        <div className=" mt-4 mb-4 text-decoration underline text-xl">OR</div>

        <div className="mb-4 m-auto text-xl">
          Search For a Specific Application :
        </div>

        <div className=" w-[50%] flex flex-col ">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search"
              className="w-[100%] bg-gray-200 input input-lg text-black mb-5"
              value={text}
              onChange={handleChange}
            />
          </form>

          <button
            type="submit"
            className=" rounded-1-none w-36 btn btn-lg m-auto mb-10"
            onClick={handleSubmit}
          >
            Go
          </button>
        </div>
      </div>
    </div>
  );
}

export default ApplicationsSearch;
