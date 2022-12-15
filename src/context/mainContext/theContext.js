import { createContext, useReducer } from "react";
import theReducer from "./theReducer";
import Moment from "moment";

const theContext = createContext();

const URI = process.env.REACT_APP_URL;

export const GithubProvider = ({ children }) => {
  const initialState = {
    // ----------------------------------State Variables of the Applicaton Section

    applications: [], // The main variable where all the application objects arrive after fetch call
    applicationData: [], //
    ApplicationsDateSet: [], // To get the Unique Date in the Applications
    sortedDates: [],
    desc_sortedDates: [],
    applications_explain_cost: "",
    applications_names_cq_max: "",
    nameCostSet: [],
    AppSearchSet: [], // To get the Unique Service Names
    nameCQSet: [],

    // --------------------------- State variables of the Resources Section

    resources: [],
    resourceData: [],
    ResourceDateSet: [],
    sortedDates_R: [],
    desc_sortedDates_R: [],
    Resources_explain_cost: "",
    Resources_names_cq_max: "",
    nameCostSetR: [],
    ResourceSearchSet: [], // To get the Unique Resource Group Name
    nameCQSetR: [],
    loading: false
  };

  const [state, dispatch] = useReducer(theReducer, initialState);

  // Get All Applications
  const getAllApplications = async (text) => {
    setLoading();
    const response = await fetch(`${URI}/applications`);
    if (response.status === 404) {
      window.location = "/notFound";
    } else {
      const data = await response.json();

      dispatch({
        type: "GET_ALL_APPLICATIONS",
        payload: data
      });
    }
  };

  // Search all Applications
  const searchAllApplications = async (text) => {
    console.log(`${URI}/applications`);
    setLoading();

    const response = await fetch(`${URI}/applications/${text}`);

    if (response.status === 404) {
      window.location = "/notFound";
    } else {
      const data = await response.json();
      window.location = `/applications/${text}`; // this link takes the user from the Application search page to the Application View Page
      dispatch({
        type: "GET_APPLICATION",
        payload: data
      });
    }
  };

  // just Search all Applications ( No such Link present to avoid endless loop )
  const justsearchAllApplications = async (text) => {
    // console.log(`${URI}/applications`);
    setLoading();

    const response = await fetch(`${URI}/applications/${text}`);

    if (response.status === 404) {
      window.location = "/notFound";
    } else {
      const data = await response.json();

      console.log("The type of application array is " + typeof data);

      dispatch({
        type: "GET_APPLICATION",
        payload: data
      });
    }
  };

  // Filter the Applications according to Service Name
  const filterByServiceNameSearch = async (text2, login) => {
    setLoading();

    const response = await fetch(`${URI}/applications/${login}`);
    const data = await response.json();

    console.log("this is what you searched " + text2);

    const dataNew = data.filter(function (eachResponse, index) {
      if (eachResponse.ServiceName === text2) {
        return true;
      } else {
        return false;
      }
    });

    console.log("Data after search");
    console.log(dataNew);

    dispatch({
      type: "GET_BY_SERVICE_NAME",
      payload: dataNew
    });
  };

  // Get Unique name in the Application Data
  const getUniqueName = async (text2, login) => {
    setLoading();

    const response = await fetch(`${URI}/applications/${login}`);
    const data = await response.json();
    // console.log("i HAVE THE DATA ")
    console.log("this is what you searched " + text2);

    const dataProcess1 = data.map((appData) => appData.ServiceName);
    console.log(dataProcess1);

    let unique = [...new Set(dataProcess1)];
    console.log(unique);

    dispatch({
      type: "GET_UNIQUE_SEARCHES",
      payload: unique
    });
  };

  // Filter the Applications according to Date
  const filterApplicationByDate = async (text2, login) => {
    setLoading();

    const response = await fetch(`${URI}/applications/${login}`);
    const data = await response.json();

    console.log("this is the date you wanted " + text2);

    const dates = data.filter(function (eachResponse) {
      if (eachResponse.Date === text2) {
        return true;
      } else {
        return false;
      }
    });

    dispatch({
      type: "GET_APPLICATION_BY_DATE",
      payload: dates
    });
  };

  // Get Unique Date in the Application Data
  const getUniqueDates = async (text2, login) => {
    setLoading();

    const response = await fetch(`${URI}/applications/${login}`);
    const data = await response.json();
    // console.log("i HAVE THE DATA ")
    console.log("this is what you searched " + text2);

    const dataProcess1 = data.map((appData) => appData.Date);
    console.log(dataProcess1);

    let unique = [...new Set(dataProcess1)];
    console.log(unique);

    let date = "";
    var sorted_results = [];

    let date2 = "";
    var sorted_results_String = [];

    var desc_sorted_dates = [];
    var desc_sorted_dates_string = [];

    for (let i = 0; i <= unique.length - 1; i++) {
      const str = Moment(unique[i], "DD/MM/YYYY");
      date = str.format("YYYY-MM-DD");
      let date_obj = new Date(date);
      sorted_results.push(date_obj);
      desc_sorted_dates.push(date_obj);
    }

    sorted_results.sort(function (a, b) {
      // Using Comparison function of JS to sort dates array
      return a - b;
    });

    desc_sorted_dates.sort(function (a, b) {
      // Again Using comaparison function of JS to sorts dates array in reverse order.
      return b - a;
    });

    for (let i = 0; i < sorted_results.length; i++) {
      const str = Moment(sorted_results[i]);
      date2 = str.format("DD/MM/YYYY");
      sorted_results_String.push(date2);
    }

    for (let i = 0; i < desc_sorted_dates.length; i++) {
      const str = Moment(desc_sorted_dates[i]);
      let date3 = str.format("DD/MM/YYYY");
      desc_sorted_dates_string.push(date3);
    }

    console.log(desc_sorted_dates_string);

    dispatch({
      type: "GET_UNIQUE_DATES",
      payload: unique
    });

    dispatch({
      type: "SORT_DATE_ASC",
      payload: sorted_results_String
    });

    dispatch({
      type: "SORT_DATE_DESC",
      payload: desc_sorted_dates_string
    });
  };

  // Populate graph data
  const makeNameGraph = async (login) => {
    setLoading();
    const response = await fetch(`${URI}/applications/${login}`);
    if (response.status === 404) {
      window.localStorage = "/notFound";
    } else {
      const data = await response.json();
      const dataProcess1 = data.map((appData) => appData.ServiceName);
      let unique2 = [...new Set(dataProcess1)];

      let costSet = [];
      let cqSet = [];
      let TCost = 0;
      let TConQuan = 0;

      for (let i = 0; i < unique2.length; i++) {
        const searchApi = await fetch(`${URI}/applications/${login}`);
        const entireResponse = await searchApi.json();
        const filteredResponse = entireResponse.filter(function (eachResponse) {
          if (eachResponse.ServiceName === unique2[i]) {
            return true;
          } else {
            return false;
          }
        });

        for (let i = 0; i < filteredResponse.length; i++) {
          TCost = TCost + parseFloat(filteredResponse[i].Cost);
        }

        for (let i = 0; i < filteredResponse.length; i++) {
          TConQuan =
            TConQuan + parseFloat(filteredResponse[i].ConsumedQuantity);
        }

        costSet.push(TCost);
        cqSet.push(TConQuan);
        TCost = 0;
        TConQuan = 0;
      }

      console.log("Final Step :", costSet);
      console.log("Final Step 2 :", cqSet);

      const max_user_by_Cost_value = Math.max(...costSet);
      const index_of_max_number = costSet.indexOf(max_user_by_Cost_value);
      const the_max_cost_holder = unique2[index_of_max_number];

      const max_user_by_CQ_value = Math.max(...cqSet);
      const index_of_max_Cq = cqSet.indexOf(max_user_by_CQ_value);
      const the_max_cq_holder = unique2[index_of_max_Cq];

      dispatch({
        type: "MAKE_NAME_COST_SET",
        payload: costSet
      });

      dispatch({
        type: "MAKE_NAME_CQ_SET",
        payload: cqSet
      });

      dispatch({
        type: "APPLICATION_NAME_COST_DETAILS",
        payload: the_max_cost_holder
      });

      dispatch({
        type: "APPLICATIONS_NAME_CQ_DETAILS",
        payload: the_max_cq_holder
      });
    }
  };

  // ---------------------------------------------------Resources Section -----------------------------------------------------------------

  // Get All Resources
  const getAllResources = async () => {
    setLoading();
    const response = await fetch(`${URI}/resources`);
    if (response.status === 404) {
      window.location = "/notFound";
    } else {
      const data = await response.json();

      dispatch({
        type: "GET_ALL_RESOURCES",
        payload: data
      });
    }
  };

  // Search all Resources
  const searchAllResources = async (textr) => {
    console.log(`${URI}/resources`);
    setLoading();

    const response = await fetch(`${URI}/resources/${textr}`);
    if (response.status === 404) {
      window.location = "/notFound";
    } else {
      const data = await response.json();
      window.location = `/resources/${textr}`; // Setting up the route for every Resource page to be created.
      dispatch({
        type: "GET_RESOURCE",
        payload: data
      });
    }
  };

  // just Search all Resources
  const justsearchAllResources = async (textr) => {
    // console.log(`${URI}/resources`);
    setLoading();

    const response = await fetch(`${URI}/resources/${textr}`);

    if (response.status === 404) {
      window.location = "/notFound";
    } else {
      const data = await response.json();

      dispatch({
        type: "GET_RESOURCE",
        payload: data
      });
    }
  };

  // Filter the Resources according to Resource Group
  const filterResourcesByResourceGroup = async (textr, login2) => {
    console.clear();
    setLoading();
    console.log("-----------------------------", login2);

    const response = await fetch(`${URI}/resources/${login2}`);
    const data = await response.json();
    console.log(data);

    console.log("this is what you searched " + textr);

    const dataNew = data.filter(function (eachResponse, index) {
      if (eachResponse.ResourceGroup === textr) {
        return true;
      } else {
        return false;
      }
    });

    console.log("Data after search");
    console.log(dataNew);

    dispatch({
      type: "GET_BY_RESOURCE_GROUP",
      payload: dataNew
    });
  };

  // Get Unique name in the Resource Data
  const getUniqueNameResources = async (textr, login2) => {
    setLoading();

    const response = await fetch(`${URI}/resources/${login2}`);
    const data = await response.json();
    // console.log("i HAVE THE DATA ")
    console.log("this is what you searched " + textr);

    const dataProcess1 = data.map((appData) => appData.ResourceGroup);
    console.log(dataProcess1);

    let unique = [...new Set(dataProcess1)];
    console.log(unique);

    dispatch({
      type: "GET_UNIQUE_SEARCHES_REQUEST",
      payload: unique
    });
  };

  const filterApplicationByDateResources = async (textr, login2) => {
    setLoading();

    const response = await fetch(`${URI}/resources/${login2}`);
    const data = await response.json();

    console.log("this is the date you wanted " + textr);

    const dates = data.filter(function (eachResponse) {
      if (eachResponse.Date === textr) {
        return true;
      } else {
        return false;
      }
    });

    dispatch({
      type: "GET_APPLICATION_BY_DATE_RESOURCES",
      payload: dates
    });
  };

  // Get Unique Date in the Resource Data
  const getUniqueDatesResources = async (textr, login2) => {
    setLoading();

    const response = await fetch(`${URI}/resources/${login2}`);
    const data = await response.json();
    // console.log("i HAVE THE DATA ")
    console.log("this is what you searched " + textr);

    const dataProcess1 = data.map((appData) => appData.Date);
    console.log(dataProcess1);

    let unique = [...new Set(dataProcess1)];
    console.log(unique);

    let date = "";
    var sorted_results = [];

    let date2 = "";
    var sorted_results_String = [];

    var desc_sorted_dates = [];
    var desc_sorted_dates_string = [];

    for (let i = 0; i <= unique.length - 1; i++) {
      const str = Moment(unique[i], "DD/MM/YYYY");
      date = str.format("YYYY-MM-DD");
      let date_obj = new Date(date);
      sorted_results.push(date_obj);
      desc_sorted_dates.push(date_obj);
    }

    sorted_results.sort(function (a, b) {
      // Using Comparison function of JS to sort dates array
      return a - b;
    });

    desc_sorted_dates.sort(function (a, b) {
      // Again Using comaparison function of JS to sorts dates array in reverse order.
      return b - a;
    });

    for (let i = 0; i < sorted_results.length; i++) {
      const str = Moment(sorted_results[i]);
      date2 = str.format("DD/MM/YYYY");
      sorted_results_String.push(date2);
    }

    for (let i = 0; i < desc_sorted_dates.length; i++) {
      const str = Moment(desc_sorted_dates[i]);
      let date3 = str.format("DD/MM/YYYY");
      desc_sorted_dates_string.push(date3);
    }

    console.log(desc_sorted_dates_string);

    dispatch({
      type: "GET_UNIQUE_DATES_R",
      payload: unique
    });

    dispatch({
      type: "SORT_DATE_ASC_R",
      payload: sorted_results_String
    });

    dispatch({
      type: "SORT_DATE_DESC_R",
      payload: desc_sorted_dates_string
    });
  };

  // Populate graph data
  const makeNameGraphResources = async (login2) => {
    console.clear();
    setLoading();
    console.log("------------------------------", login2);
    const response = await fetch(`${URI}/resources/${login2}`);
    if (response.status === 404) {
      window.localStorage = "/notFound";
    } else {
      const data = await response.json();
      const dataProcess1 = data.map((appData) => appData.ResourceGroup);
      let unique2 = [...new Set(dataProcess1)];

      let costSet = [];
      let cqSet = [];
      let TCost = 0;
      let TConQuan = 0;

      for (let i = 0; i < unique2.length; i++) {
        //
        const searchApi = await fetch(`${URI}/resources/${login2}`);
        const entireResponse = await searchApi.json();
        console.log(entireResponse);

        // So we are matching the names and then taking there cost so , I filtered all the entries where the eachResponse.ResourceGroup
        // entireResponse = the entire json data of the individual login resoucrce
        // filtered response = matching Resource Group with unique2 group

        const filteredResponse = entireResponse.filter(function (eachResponse) {
          if (eachResponse.ResourceGroup === unique2[i]) {
            return true;
          } else {
            return false;
          }
        });

        console.log(filteredResponse);

        // Then taking entries total of the entries that belong to every group
        for (let i = 0; i < filteredResponse.length; i++) {
          TCost = TCost + parseFloat(filteredResponse[i].Cost);
        }

        for (let i = 0; i < filteredResponse.length; i++) {
          TConQuan =
            TConQuan + parseFloat(filteredResponse[i].ConsumedQuantity);
        }
        costSet.push(TCost);
        cqSet.push(TConQuan);
        TCost = 0;
        TConQuan = 0;
      }

      console.log("Final Step :", costSet);
      console.log("Final Step 2 :", cqSet);

      const max_user_by_Cost_value = Math.max(...costSet);
      const index_of_max_number = costSet.indexOf(max_user_by_Cost_value);
      const the_max_cost_holder = unique2[index_of_max_number];

      const max_user_by_CQ_value = Math.max(...cqSet);
      const index_of_max_Cq = cqSet.indexOf(max_user_by_CQ_value);
      const the_max_cq_holder = unique2[index_of_max_Cq];

      dispatch({
        type: "MAKE_NAME_COST_SET_R",
        payload: costSet
      });

      dispatch({
        type: "MAKE_NAME_CQ_SET_R",
        payload: cqSet
      });

      dispatch({
        type: "APPLICATION_NAME_COST_DETAILS_R",
        payload: the_max_cost_holder
      });

      dispatch({
        type: "APPLICATIONS_NAME_CQ_DETAILS_R",
        payload: the_max_cq_holder
      });
    }
  };

  const clearApplications = () => dispatch({ type: "CLEAR_APPLICATIONS" });
  const clearFilterSearch = () => {
    dispatch({ type: "CLEAR_FILTERS" });
  };
  const clearFilterResources = () =>
    dispatch({ type: "CLEAR_FILTERS_RESOURCE" });
  const clearResources = () => dispatch({ type: "CLEAR_RESOURCES" });
  const setLoading = () => dispatch({ type: "SET_LOADING" });

  return (
    <theContext.Provider
      value={{
        applicationData: state.applicationData,
        applications: state.applications,
        filtered: state.filtered,
        AppSearchSet: state.AppSearchSet,
        ApplicationsDateSet: state.ApplicationsDateSet,
        sortedDates: state.sortedDates,
        desc_sortedDates: state.desc_sortedDates,
        service_graph_data: state.service_graph_data,
        nameCostSet: state.nameCostSet,
        nameCQSet: state.nameCQSet,
        applications_explain_cost: state.applications_explain_cost,
        applications_names_cq_max: state.applications_names_cq_max,

        resourceData: state.resourceData,
        resources: state.resources,
        filteredR: state.filteredR,
        ResourceDateSet: state.ResourceDateSet,
        ResourceSearchSet: state.ResourceSearchSet,
        sortedDates_R: state.sortedDates_R,
        desc_sortedDates_R: state.desc_sortedDates_R,
        Resources_explain_cost: state.Resources_explain_cost,
        Resources_names_cq_max: state.Resources_names_cq_max,
        nameCostSetR: state.nameCostSetR,
        nameCQSetR: state.nameCQSetR,

        loading: state.loading,

        searchAllApplications,
        getAllApplications,
        justsearchAllApplications,
        filterByServiceNameSearch,
        getUniqueName,
        getUniqueDates,
        filterApplicationByDate,
        clearFilterSearch,
        clearApplications,
        makeNameGraph,

        searchAllResources,
        getAllResources,
        justsearchAllResources,
        filterResourcesByResourceGroup,
        filterApplicationByDateResources,
        getUniqueDatesResources,
        getUniqueNameResources,
        clearFilterResources,
        makeNameGraphResources,
        clearResources
      }}
    >
      {children}
    </theContext.Provider>
  );
};

export default theContext;
