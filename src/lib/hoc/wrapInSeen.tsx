import React from "react";
import Seen from "components/Seen";

const wrapInSeen = Comp => props => (
  <Seen render={seen => <Comp seen={seen} {...props} />} />
);

export default wrapInSeen;
