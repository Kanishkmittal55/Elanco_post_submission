import { useContext } from "react";
import Spinner from "../layout/Spinner";
import ApplicationItem from "./applicationItem";
import theContext from "../../context/mainContext/theContext";

function ApplicationResults() {
  const { loading, applications } = useContext(theContext);

  if (!loading) {
    return (
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
        {applications.map((app, index) => (
          <div className="w-[75%] m-auto mb-4 " key={index}>
            <ApplicationItem title={app} />
          </div>
        ))}
      </div>
    );
  } else {
    return <Spinner />;
  }
}

export default ApplicationResults;
