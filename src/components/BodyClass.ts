import withSideEffect from "react-side-effect";

function reducePropsToState(propsList) {
  return propsList.map(props => props.className);
}

function handleStateChange(classes) {
  document.body.className = classes.join(" ");
}

const BodyClass = ({ children = null }) => children;

// BodyClass.propTypes = {
//   className: PropTypes.string.isRequired,
//   children: PropTypes.node
// };

export default withSideEffect(reducePropsToState, handleStateChange)(BodyClass);
