import React from "react";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AlertContext from "../context/alert/AlertContext";
import theContext from "../context/mainContext/theContext";
import NameChartR from "../components/users/NameChartR";
import CostChartR from "../components/users/CostChartR";

function ResourceView() {
  // Importing Global States
  const {
    resourceData,
    justsearchAllResources,
    filterResourcesByResourceGroup,
    filterApplicationByDateResources,
    getUniqueDatesResources,
    ResourceDateSet,
    getUniqueNameResources,
    Resources_explain_cost,
    Resources_names_cq_max,
    makeNameGraphResources,
    sortedDates_R,
    desc_sortedDates_R,
    ResourceSearchSet // To get the Unique Resource Group Name
  } = useContext(theContext);

  const { setAlert } = useContext(AlertContext);

  // Using local State variable
  const [textr, setTextr] = useState("");

  const [sortFlag, setSortFlag] = useState("No-filter");

  // Using the useParams to get name of the searched Application
  const params = useParams();
  console.log(params.login2);

  // Use Effect hook and params object to populate the page
  useEffect(() => {
    justsearchAllResources(params.login2);
    getUniqueNameResources(textr, params.login2);
    getUniqueDatesResources(textr, params.login2);
    makeNameGraphResources(params.login2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // So that we type in the Input box
  const handleChange = (e) => setTextr(e.target.value);

  const handleSubmitFilter = (e) => {
    e.preventDefault();
    if (textr === "") {
      setAlert("Please enter something", "error");
    } else {
      filterResourcesByResourceGroup(textr, params.login2);
    }
  };

  const handleClickDateFilter = (e) => {
    e.preventDefault();
    const magicAgain = e.target.innerHTML;
    console.log(magicAgain);

    filterApplicationByDateResources(magicAgain, params.login2);
  };

  const handleClickResourceGroup = (e) => {
    e.preventDefault();
    const magic = e.target.innerHTML;
    console.log(magic);

    filterResourcesByResourceGroup(magic, params.login2);
  };

  // Filter resources By date filter
  const DateFilter = (e) => {
    e.preventDefault();
    if (textr === "") {
      setAlert("Please enter something", "error");
    } else {
      filterApplicationByDateResources(textr, params.login);
    }
  };

  // Clearing the Search Input and state to initiate a new search
  const ClearingFilterSearch = (e) => {
    e.preventDefault();
    justsearchAllResources(params.login2);
    setTextr("");
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

  resourceData.map(
    (abc) => (sum += parseFloat(abc.Cost)) // I am just reassigning a variable, the power of React
  );

  resourceData.map(
    (abc) => (ConsumedQuantity += parseFloat(abc.ConsumedQuantity))
  );
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
          {params.login2} Resources has {resourceData.length} entries, with
          total cost {sum.toFixed(2)}, and has total Consumed Quantity as{" "}
          {ConsumedQuantity.toFixed(2)}
          <div>Search Parameter Used : {textr} </div>
        </div>
        <div className="w-[100%] flex items-center justify-center">
          <input
            type="text"
            placeholder="Search with Service Name or a Date (DD/MM/YYYY)"
            className="m-auto mb-20 w-[70%] bg-gray-200 input input-lg text-black"
            value={textr}
            onChange={handleChange}
          />
        </div>

        <div className="w-[100%] flex items-center justify-center">
          <button
            type="submit"
            className="rounded-2-none w-46 btn btn-lg mr-5"
            onClick={handleSubmitFilter}
          >
            Search with Resource Name
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
            {ResourceSearchSet.map((entry1) => (
              <button
                className="mb-3 ml-3 mr-3 shadow-md w-[20%] flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={(e) => handleClickResourceGroup(e)}
              >
                {entry1}
              </button>
            ))}
          </div>

          <div className="mt-[15vh] mb-[10vh] w-[60%] border-solid border-2 border-blue-900 p-[3vh] flex justify-center items-center flex-col">
            <h1>Bar Chart Analysis - </h1>
            <p>
              X - Axis ( Resource Groups associated with <u>{params.login2}</u>{" "}
              resource)
            </p>
            <p className="mb-[5vh]">
              Y - Axis ( Total Consumed Quantity of the Resource Groups
              belonging to this resource){" "}
            </p>
            <p>
              {" "}
              This program currently answers Questions like which Resource Group
              consumes the most out of the Resources allocated to a specific
              resource ?
            </p>
            <p className="mb-[4vh] ">
              {" "}
              For Example - <u>{Resources_names_cq_max}</u>, Resource Group
              takes or consumes the <u>most</u> resources for{" "}
              <u>{params.login2} </u>
            </p>
            <NameChartR />
          </div>
          <div className="mt-[15vh] mb-[10vh] w-[60%] border-solid border-2 border-red-900 p-[3vh] flex justify-center items-center flex-col">
            <h1>Bar Chart Analysis - </h1>
            <p>
              X - Axis ( Resource Groups associated with <u>{params.login2}</u>{" "}
              resource)
            </p>
            <p className="mb-[5vh]">
              Y - Axis ( Assumed to be the Cost Incurred in managing the
              resource ){" "}
            </p>
            <p>
              {" "}
              This program could currently answers Questions like which Resource
              Group charges the most to manage a resource ?
            </p>
            <p className="mb-[4vh] ">
              {" "}
              For Example - <u>{Resources_explain_cost}</u>, is the most
              expensive of all in terms of cost for <u>{params.login2}</u>{" "}
              resource.
            </p>
            <CostChartR />
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

        {sortFlag === "dsc-filter" ? (
          <div className="w-[100%] flex flex-row flex-wrap mb-[100px] mt-[100px] items-center justify-center">
            {desc_sortedDates_R.map((entry1) => (
              <button
                className="mb-3 ml-3 mr-3 flex items-center justify-center shadow-md w-[20%] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={(e) => handleClickDateFilter(e)}
              >
                {entry1}
              </button>
            ))}
          </div>
        ) : sortFlag === "asc-filter" ? (
          <div className="w-[100%] flex flex-row flex-wrap mb-[100px] mt-[100px] items-center justify-center">
            {sortedDates_R.map((entry1) => (
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
            {ResourceDateSet.map((entry1) => (
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
          {resourceData.map((appData, index) => (
            <div className="card bg-[#FFFFFF] shadow-md compact side bg-opacity-97 m border-solid border-4 border-blue-600 mb-5 w-[33%] ">
              <div className="flex flex-col items-center justify-center pt-4 pb-4 ">
                <p className="m-auto text-decoration-line underline">
                  {"Entry No : " + (index + 1)}
                </p>
                <p>{"Date : " + appData.Date}</p>
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
                <p>{"ServiceName : " + appData.ServiceName}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ResourceView;
