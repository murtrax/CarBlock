import React from "react";

import Jmb from "./aboutComponents/jumbotron";
import Car from "./aboutComponents/carousel";
import Ser from "./aboutComponents/service";
import Team from "./aboutComponents/team";

const JumbotronPage = () => {
  return (
      <div className = "mt-5">
        <Jmb/>
        <Ser/>
        <Team/>
      </div>
    
  )
}

export default JumbotronPage;