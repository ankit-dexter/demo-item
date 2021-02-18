import React from 'react';

import classes from './BackDrop.css';

const backdrop = (props) => (
    props.popup ? <div className={classes.Backdrop} onClick={() => props.reset()}></div> : null
);

export default backdrop;