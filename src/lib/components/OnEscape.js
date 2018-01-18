import React from 'react';
import OnKeyDown from 'lib/components/OnKeyDown';

const OnEscape = props => <OnKeyDown keyCode={27} handler={props.handler} />;

export default OnEscape;
