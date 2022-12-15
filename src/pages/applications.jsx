import React from "react";
import ApplicationsResults from "../components/users/applicationsResults";
import ApplicationsSearch from "../components/users/applicationsSearch";

function Home() {
  return (
    <div>
      {/*Search Component  */}
      <ApplicationsSearch />
      <ApplicationsResults />
    </div>
  );
}

export default Home;
