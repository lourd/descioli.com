import { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Component for listening to specific key presses. Used for when you want to
 *   listen to global key presses on the document instead of a specific element.
 *   For specific elements, use the `onKeyDown` event built into each React DOM
 *   component
 */
export default class OnKeyDown extends Component {
  static propTypes = {
    keyCode: PropTypes.number.isRequired,
    handler: PropTypes.func
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeydown);
  }

  handleKeydown = evt => {
    if (this.props.handler && evt.keyCode === this.props.keyCode) {
      this.props.handler(evt);
    }
  };

  render() {
    return null;
  }
}
