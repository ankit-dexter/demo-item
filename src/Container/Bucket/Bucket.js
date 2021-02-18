import React from "react";
import classes from "./Bucket.css";
import Buk from "./Buk/Buk";
import { connect } from 'react-redux';
import * as actions from "../../Reducer/actions";

const bucket = props => {

    const showToDo = (buckName) => {
        props.setSelectedBucket(buckName);
    }
    let transBucket = props.SelectedBucket === 'n' || props.SelectedBucket.length === 0 ?
        Object.keys(props.buckets).map(index => {
            return (<Buk
                key={index}
                buckId={props.buckets[index].bucketId}
                bucket={props.buckets[index]}
                onClick={(event) => showToDo(props.buckets[index])}
            />);
        })
        :
        Object.keys(props.buckets.filter(buck => buck.item.includes(props.SelectedBucket))).map(index => {
            return (<Buk
                key={index}
                buckId={props.buckets[index].bucketId}
                bucket={props.buckets[index]}
                onClick={(event) => showToDo(props.buckets[index])}
            />);
        });
    ;
    // useEffect(() => {
    //     console.log('[useEffect]', props.SelectedBucket, selectedItems)
    //     if (props.SelectedBucket === 'n') {
    //         setselectedItems(props.buckets);
    //     }
    //     else {
    //         setselectedItems(props.buckets.filter(buck => buck.item.includes(props.SelectedBucket)))
    //     }
    //     transBucket = selectedItems.length == 0 ? null : Object.keys(selectedItems).map(index => {
    //         return (<Buk
    //             key={index}
    //             buckId={props.buckets[index].bucketId}
    //             bucket={props.buckets[index]}
    //             onClick={(event) => showToDo(props.buckets[index])}
    //         />);
    //     });
    // }, [], [props.selectedBucket])
    //console.log(typeof props.buckets);




    return (<div className={classes.buckets} >
        {transBucket}

    </div>);
}
const mapStateToProps = state => {
    return {
        buckets: state.buckets,
        SelectedBucket: state.selectedBucket,
        toDoList: state.toDoList
    }
}

const mapDipatchToProps = dispatch => {
    return {
        setBuckets: () => dispatch(actions.setBuckets()),
        setSelectedBucket: (bucketName) => dispatch(actions.setSelectedBucket(bucketName)),
        resetSelectedBucket: () => dispatch(actions.resetSelectedBucket())
    }
}
export default connect(mapStateToProps, mapDipatchToProps)(bucket);