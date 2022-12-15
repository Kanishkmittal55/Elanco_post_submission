import React from "react";
import ResourcesResults from "../components/users/resourcesResult";
import ResourcesSearch from "../components/users/resourcesSearch";

function Home() {
  return (
    <div>
      {/*Search Component  */}
      <ResourcesSearch />
      <ResourcesResults />
    </div>
  );
}

export default Home;
