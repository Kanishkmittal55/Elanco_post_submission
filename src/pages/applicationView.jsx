import React from "react";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AlertContext from "../context/alert/AlertContext";
import theContext from "../context/mainContext/theContext";
import NameChart from "../components/users/NameChart";
import CostChart from "../components/users/CostChart";
import Spinner from "../components/layout/Spinner";
import moment from "moment";

function ApplicationView() {
  // Importing Global States
  const {
    loading,
    applicationData,
    justsearchAllApplications,
    filterByServiceNameSearch,
    getUniqueName,
    getUniqueDates,
    AppSearchSet,
    ApplicationsDateSet,
    desc_sortedDates,
    makeNameGraph,
    filterApplicationByDate,
    applications_explain_cost,
    applications_names_cq_max,
    sortedDates
  } = useContext(theContext);

  const { setAlert } = useContext(AlertContext);

  // Using local State variable
  const [text2, setText2] = useState("");

  const [entry, setEntry] = useState("");

  const [highlight, setHighlight] = useState("");

  const [sortFlag, setSortFlag] = useState("No-filter");

  // Using the useParams to get name of the searched Application
  const params = useParams();
  console.log(params.login);

  // Use Effect hook and params object to populate the page
  useEffect(() => {
    justsearchAllApplications(params.login);
    getUniqueName(text2, params.login);
    getUniqueDates(text2, params.login);
    makeNameGraph(params.login);
  }, []);

  const handleChange = (e) => setText2(e.target.value);

  // Date Filter from input field handler function
  const DateFilter = (e) => {
    e.preventDefault();
    if (text2 === "") {
      setAlert("Please enter something", "error");
    } else {
      const str = moment(text2, "DD/MM/YYYY");
      if (typeof str === Date) {
        console.clear();
        console.log(text2);
        filterApplicationByDate(text2, params.login);
        setEntry(text2);
        setText2("");
        setHighlight("date");
      } else {
        setAlert(
          "You have entered a name, please press Service name search Button"
        );
      }
    }
  };

  // Date Filter from Unique Button field handler function
  const handleClickDateFilter = (e) => {
    e.preventDefault();
    const magicAgain = e.target.innerHTML;
    console.log(magicAgain);
    setEntry(magicAgain);
    filterApplicationByDate(magicAgain, params.login);
    setEntry(magicAgain);
    setHighlight("date");
  };

  // Service Name Filter from Input Field handler function
  const handleSubmitFilter = (e) => {
    e.preventDefault();
    if (text2 === "") {
      setAlert("Please enter something", "error");
    } else {
      filterByServiceNameSearch(text2, params.login);
      setEntry(text2);
      setText2("");
      setHighlight("name");
    }
  };

  // Service Name Filter from Button Field handler function
  const handleClickFilterSearch = (e) => {
    e.preventDefault();
    const magic = e.target.innerHTML;
    console.log(magic);
    setEntry(magic);
    filterByServiceNameSearch(magic, params.login);
    setHighlight("name");
  };

  // Clearing the Search Input and state to initiate a new search
  const ClearingFilterSearch = (e) => {
    e.preventDefault();
    justsearchAllApplications(params.login);
    setText2("");
    setEntry("");
    setHighlight("");
  };

  // Handling sort the date in Ascending order
  const handleOrderByClickAscSort = (e) => {
    e.preventDefault();
    setSortFlag("asc-filter");
  };

  // Handling sort the date in Ascending order
  const handleOrderByClickDscSort = (e) => {
    e.preventDefault();
    setSortFlag("dsc-filter");
  };

  let sum = 0;
  let ConsumedQuantity = 0;
  let countServiceNameArray = 0;

  applicationData.map(
    (abc, index) => (
      (sum += parseFloat(abc.Cost)), (countServiceNameArray += index)
    ) // I am just reassigning a variable, the power of React
  );

  applicationData.map(
    (abc) => (ConsumedQuantity += parseFloat(abc.ConsumedQuantity))
  );

  var flag = "0";
  if (text2.length === 0 && entry.length > 0) {
    flag = "01";
  } else if (text2.length > 0 && entry.length === 0) {
    flag = "10";
  }

  if (!loading) {
    return (
      <div>
        <div>
          <div className="flex flex-row-reverse mr-10">
            <button
              type="submit"
              className="rounded-2-none w-46 btn btn-lg"
              onClick={ClearingFilterSearch}
            >
              Clear
            </button>
          </div>

          <div className="w-[100%] flex flex-col items-center justify-center mb-4">
            <div className="flex flex-row mr-10"></div>
            {params.login} Application has {applicationData.length} entries,
            with total cost {sum.toFixed(2)}, and has total Consumed Quantity as{" "}
            {ConsumedQuantity.toFixed(2)}
            <div>
              Search Parameter Used :{" "}
              {flag === "01" ? entry : flag === "10" ? text2 : null}{" "}
            </div>
          </div>
          <div className="w-[100%] flex items-center justify-center">
            <input
              type="text"
              placeholder="Search with Service Name or a Date (DD/MM/YYYY)"
              className="m-auto mb-20 w-[70%] bg-gray-200 input input-lg text-black"
              value={text2}
              onChange={handleChange}
            />
          </div>

          <div className="w-[100%] flex items-center justify-center">
            <button
              type="submit"
              className="rounded-2-none w-46 btn btn-lg mr-5"
              onClick={handleSubmitFilter}
            >
              Search with Service Name
            </button>

            <button
              type="submit"
              className="rounded-2-none w-46 btn btn-lg"
              onClick={DateFilter}
            >
              Search with Date (DD/MM/YYYY)
            </button>
          </div>

          <div className="w-[100%] flex flex-col flex-wrap mb-[100px] mt-[100px] items-center justify-center">
            <div className="w-[100%] flex flex-row flex-wrap it items-center justify-center">
              {/* Automatic rendering of the unique Service Name search parameter*/}
              {AppSearchSet.map((entry1) => (
                <button
                  className="mb-3 ml-3 mr-3 shadow-md w-[20%] flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  onClick={(e) => handleClickFilterSearch(e)}
                >
                  {entry1}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-row gap-8 items-center justify-center">
            <div className="mt-[15vh] mb-[10vh] w-[40%] border-solid border-2 border-blue-900 p-[3vh] flex justify-center items-center flex-col">
              <h1>Pie Chart Analysis - </h1>
              <NameChart />

              <p>
                {" "}
                You can Answers to Questions like which service Consumes the
                most out of the Available Resources to a Specific Application ?
              </p>
              <p className="mb-[4vh] ">
                {" "}
                For Example - <u>{applications_names_cq_max}</u>, service
                consumes the <u>most</u> resources for an{" "}
                <u>{params.login} Application</u>
              </p>
            </div>

            <div className="mt-[15vh] mb-[10vh] w-[40%] border-solid border-2 border-red-900 p-[3vh] flex justify-center items-center flex-col">
              <h1>Pie Chart Analysis - </h1>
              <CostChart />

              <p>
                {" "}
                You can Answers to Questions like which service Cost the most in
                context of a specific Application ?
              </p>
              <p className="mb-[4vh] ">
                {" "}
                For Example - <u>{applications_explain_cost}</u>, Service costs
                the <u>most</u> for a/an <u>{params.login} Application</u>
              </p>
            </div>
          </div>

          <div className="flex flex-row items-center justify-evenly mt-20">
            {/* Ascending Order By Button*/}
            <div className="w-[22%] ">
              {/* Interaction with the dates Search Paramter created */}
              <button
                className=" shadow-md w-[100%] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={(e) => handleOrderByClickAscSort(e)}
              >
                {" "}
                Sort Dates (Ascending)
              </button>
            </div>

            {/* Ascending Order By Button*/}
            <div className="w-[22%]">
              {/* Interaction with the dates Search Paramter created */}
              <button
                className=" shadow-md w-[100%] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={(e) => handleOrderByClickDscSort(e)}
              >
                {" "}
                Sort Dates (Descending)
              </button>
            </div>
          </div>

          {sortFlag == "dsc-filter" ? (
            <div className="w-[100%] flex flex-row flex-wrap mb-[100px] mt-[100px] items-center justify-center">
              {desc_sortedDates.map((entry1) => (
                <button
                  className="mb-3 ml-3 mr-3 flex items-center justify-center shadow-md w-[20%] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  onClick={(e) => handleClickDateFilter(e)}
                >
                  {entry1}
                </button>
              ))}
            </div>
          ) : sortFlag == "asc-filter" ? (
            <div className="w-[100%] flex flex-row flex-wrap mb-[100px] mt-[100px] items-center justify-center">
              {sortedDates.map((entry1) => (
                <button
                  className="mb-3 ml-3 mr-3 card flex items-center justify-center shadow-md w-[20%] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  onClick={(e) => handleClickDateFilter(e)}
                >
                  {entry1}
                </button>
              ))}
            </div>
          ) : (
            <div className="w-[100%] flex flex-row flex-wrap mb-[100px] mt-[100px] items-center justify-center">
              {ApplicationsDateSet.map((entry1) => (
                <button
                  className="mb-3 ml-3 mr-3 shadow-md w-[20%] flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  onClick={(e) => handleClickDateFilter(e)}
                >
                  {entry1}
                </button>
              ))}
            </div>
          )}

          <div className="flex flex-row gap-4 flex-wrap items-center justify-center xl:flex-rows-1 lg:flex-rows-2 md:flex-cols-1">
            {applicationData.map((appData, index) => (
              <div className="card bg-[#FFFFFF] shadow-md compact side bg-opacity-97 m border-solid border-4 border-blue-600 mb-5 w-[33%] ">
                <div className="flex flex-col items-center justify-center pt-4 pb-4 ">
                  <p className="m-auto text-decoration-line underline">
                    {"Entry No : " + (index + 1)}
                  </p>
                  {highlight === "date" ? (
                    <p>
                      <mark>{"Date : " + appData.Date}</mark>
                    </p>
                  ) : (
                    <p>{"Date : " + appData.Date}</p>
                  )}
                  <p>{"InstanceId : " + appData.InstanceId}</p>
                  <p>{"Cost : " + parseFloat(appData.Cost).toFixed(3)}</p>
                  <p>
                    {"ConsumedQuantity : " +
                      parseFloat(appData.ConsumedQuantity).toFixed(3)}
                  </p>
                  <p>{"MeterCategory : " + appData.MeterCategory}</p>
                  <p>{"ResourceGroup : " + appData.ResourceGroup}</p>
                  <p>{"ResourceLocation : " + appData.ResourceLocation}</p>
                  <p>{"Tags : " + JSON.stringify(appData.Tags)}</p>
                  <p>{"UnitOfMeasure : " + appData.UnitOfMeasure}</p>
                  {highlight === "name" ? (
                    <p>
                      <mark>{"ServiceName : " + appData.ServiceName}</mark>
                    </p>
                  ) : (
                    <p>{"ServiceName : " + appData.ServiceName}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return <Spinner size={250} />;
  }
}
export default ApplicationView;
