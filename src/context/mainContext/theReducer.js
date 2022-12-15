const theReducer = (state, action) => {
  switch (action.type) {

    
// ------------------------------------------------------- returns for Applicatons Section --------------------------------------------------------------

    case "GET_ALL_APPLICATIONS": //  Get All Applications
      return {
        ...state,
        applications: action.payload, // applications
        loading: false
      };


    case "GET_APPLICATION":  // Search all Applications, // just Search all Applications
      return {
        ...state,
        applicationData: action.payload,
        loading: false
      };

      case "GET_BY_SERVICE_NAME": // filter By Service Name Search
      return {
        ...state,
        applicationData : action.payload,
        loading : false
      }

      case "GET_UNIQUE_SEARCHES": // get Unique name in specific Application Date // getUniqueName
        return {
          ...state,
          AppSearchSet : action.payload,
          loading : false
        }

        case "GET_APPLICATION_BY_DATE": // filterApplicationByDate  //Date Filtering and general application filtering use the same variable, interesting thing
        return {
          ...state,
          applicationData : action.payload,
          loading : false
        }

        case "GET_UNIQUE_DATES": // ------------------------------ Shared Function dispatch // getUniqueDates
      return {
        ...state,
        ApplicationsDateSet : action.payload,
        loading : false
      }

      case "SORT_DATE_ASC": // ------------------------------ Shared Function dispatch // getUniqueDates
        return {
          ...state,
          sortedDates : action.payload,
          loading : false
        }

      case "SORT_DATE_DESC": // ------------------------------ Shared Function dispatch // getUniqueDates
        return {
          ...state,
          desc_sortedDates : action.payload,
          loading : false
        }

        case "APPLICATION_NAME_COST_DETAILS": // -----------------  // makeNameGraph
        return {
          ...state,
          applications_explain_cost : action.payload,
          loading : false
        }
      case "APPLICATIONS_NAME_CQ_DETAILS": // -----------------  // makeNameGraph
        return {
          ...state,
          applications_names_cq_max : action.payload,
          loading : false
        }


        case "MAKE_NAME_COST_SET": // -----------------  // makeNameGraph
        return{
          ...state,
          nameCostSet: action.payload,
          loading : false
        }

        case "MAKE_NAME_CQ_SET": // -----------------  // makeNameGraph
        return{
          ...state,
          nameCQSet: action.payload,
          loading : false
        }


// ------------------------------------------------------- returns for Resources Section --------------------------------------------------------------

    case "GET_ALL_RESOURCES": // getAllResources
      return {
        ...state,
        resources: action.payload,
        loading: false
      };


    case "GET_RESOURCE": // searchAllResources , // justsearchAllResources ---------------Shared Dispatch
      return {
        ...state,
        resourceData: action.payload,
        loading: false
      };

      case "GET_BY_RESOURCE_GROUP": // filterResourcesByResourceGroup
      return {
        ...state,
        resourceData : action.payload,
        loading : false
      }

      case "GET_UNIQUE_SEARCHES_REQUEST": // getUniqueNameResources
        return {
          ...state,
          ResourceSearchSet : action.payload,
          loading : false
        }

        case "GET_APPLICATION_BY_DATE_RESOURCES" :  // filterApplicationByDateResources
          return {
            ...state,
            resourceData : action.payload,
            loading : false
          }

          case "GET_UNIQUE_DATES_R":
            return {
              ...state,
              ResourceDateSet : action.payload,
              loading : false
            }

            case "SORT_DATE_ASC_R":
              return {
                ...state,
                sortedDates_R : action.payload,
                loading: false
              }

              case "SORT_DATE_DESC_R":
                return {
                  ...state,
                  desc_sortedDates_R: action.payload,
                  loading: false
                }

                case "MAKE_NAME_COST_SET_R":
                  return{
                    ...state,
                    nameCostSetR: action.payload,
                    loading : false
                  }

                  case "MAKE_NAME_CQ_SET_R":
                    return{
                      ...state,
                      nameCQSetR: action.payload,
                      loading : false
                    }
                    case "APPLICATION_NAME_COST_DETAILS_R":
                      return {
                        ...state,
                        Resources_explain_cost : action.payload,
                        loading : false
                      }
                      case "APPLICATIONS_NAME_CQ_DETAILS_R":
                        return {
                          ...state,
                          Resources_names_cq_max : action.payload,
                          loading : false
                        }



       


    

    case "SET_LOADING":
      return {
        ...state,
        loading: true
      };
    case "CLEAR_APPLICATIONS":
      return {
        ...state,
        applications: []
      };
    case "CLEAR_RESOURCES":
      return {
        ...state,
        resources: []
      };
    

      
        

   
    
    
      case "CLEAR_FILTERS":
        return {
          ...state,
          filtered: []
        };
      case "CLEAR_FILTERS_RESOURCE":
        return {
          ...state,
          filteredR: []
        };

      

        

      

      



    default:
      return state;
  }
};

export default theReducer;
