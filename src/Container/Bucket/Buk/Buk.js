import React from "react";
import classes from "./Buk.css";


const buk = props => {

    return (
        <div className={classes.buk}>
            <h3>{props.bucket.item}</h3>
            <h5 ><b>Description : </b>{props.bucket.desc}</h5>
        </div>
    );
}

export default buk;