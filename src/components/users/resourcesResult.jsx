import { useContext } from "react";
import Spinner from "../layout/Spinner";
import ResourceItem from "./resourceItem";
import theContext from "../../context/mainContext/theContext";

function ResourceResults() {
  const { resources, loading } = useContext(theContext);

  if (!loading) {
    return (
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
        {resources.map((resource, index) => (
          <div key={index} className="w-[75%] m-auto mb-4">
            <ResourceItem title={resource} />
          </div>
        ))}
      </div>
    );
  } else {
    return <Spinner />;
  }
}

export default ResourceResults;
