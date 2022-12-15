import { useState, useContext } from "react";
import theContext from "../../context/mainContext/theContext";
import AlertContext from "../../context/alert/AlertContext";

function ResourcesSearch() {
  const { searchAllResources, getAllResources, clearResources, resources } =
    useContext(theContext);
  const { setAlert } = useContext(AlertContext);

  const [textr, setTextr] = useState("");

  const handleChange = (e) => setTextr(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (textr === "") {
      setAlert("Please enter something", "error");
    } else {
      searchAllResources(textr);

      setTextr("");
    }
  };

  const handleClickAllResources = (e) => {
    e.preventDefault();

    getAllResources();
  };

  const handleClick = () => clearResources();

  return (
    <div>
      <div className="flex flex-row-reverse">
        {resources.length > 0 && (
          <button
            onClick={handleClick}
            className="rounded-2-none w-46 btn btn-lg mr-10"
          >
            Clear
          </button>
        )}
      </div>

      <div className="flex flex-col items-center justify-center w-[100%] ">
        {/*Resources Search Form */}

        <div className="w-[100%] relative pl-5 flex items-center justify-center ">
          <button
            type="submit"
            className="rounded-2-none w-46 btn btn-lg"
            onClick={handleClickAllResources}
          >
            Get All Resources in the Database
          </button>
        </div>

        <div className=" mt-4 mb-4 text-decoration underline text-xl">OR</div>

        <div className="mb-4 m-auto text-xl">
          Search For a Specific Resource :
        </div>

        <div className=" w-[50%] flex flex-col ">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search"
              className="w-[100%] bg-gray-200 input input-lg text-black mb-5"
              value={textr}
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

export default ResourcesSearch;
