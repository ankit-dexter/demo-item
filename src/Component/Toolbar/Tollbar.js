import React, { } from 'react';

import classes from './Toolbar.css';
//import Logo from '../../UI/Logo/Logo';
//import { connect } from 'react-redux';
//import Spinner from '../../UI/Spinner/Spinner';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/AddButton';
import { connect } from 'react-redux';
import * as actions from '../../Reducer/actions';


const toolbar = (props) => {
    const onchangeSearchHandler = (event) => {
        console.log('[changed]', props.selectedBucket, props.bucket);
        props.setSelectedBucket(event.target.value);

    }


    return (
        <div>

            <div className={classes.Toolbar}>
                <Input changed={(event) => onchangeSearchHandler(event)} />
                <Button taskName='ADD' clicked={() => props.addItem()} />

            </div>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        buckets: state.buckets,
        error: state.error,
        //  SelectedBucket: state.selectedBucket

    };
};

const mapDispatchToProps = dispatch => {
    return {
        addBucket: (bucket, prevBucket) => dispatch(actions.addBucket(bucket, prevBucket))
        // setSelectedBucket: (bucketName) => dispatch(actions.setSelectedBucket(bucketName))
    };
};


//export default React.memo(connect(mapStateToProps)(toolbar));
export default connect(mapStateToProps, mapDispatchToProps)(toolbar);