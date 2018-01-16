import React from 'react';

/**
 * A factory for higher-order components. Takes a transform function, which
 * returns a higher order component. The hoc passes the children through
 * the given transform or formatter function, and passes all other props
 * through
 * @param {Func} map
 */
const mapChildren = map => TComponent => ({ children, ...props }) => (
  <TComponent {...props}>{map(children)}</TComponent>
);

export default mapChildren;
