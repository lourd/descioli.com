import PropTypes from 'prop-types';
import withSideEffect from 'react-side-effect';

function reducePropsToState(propsList) {
  return propsList.map(props => props.className);
}

function handleStateChange(classes) {
  document.body.className = classes.join(' ');
}

const BodyClass = () => null;

BodyClass.propTypes = {
  className: PropTypes.string.isRequired
};

export default withSideEffect(reducePropsToState, handleStateChange)(BodyClass);
