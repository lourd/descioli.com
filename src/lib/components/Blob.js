import React from 'react';

const Blob = props => <pre>{JSON.stringify(props, null, 2)}</pre>;

export default Blob;
