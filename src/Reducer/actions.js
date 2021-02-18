import * as actionTypes from './actionTypes';

import axios from 'axios';



const addTaskSuccess = (bucket) => {
    return {
        type: actionTypes.ADD_BUCKET_SUCCESS,
        buck: bucket
    }
}

const addTaskFailed = (error) => {
    return {
        type: actionTypes.ADD_BUCKET_FAILED,
        loading: false,
        error: error
    }
}

export const addBucket = (bucket, previousBucket) => {

    return dispatch => {
        // console.log(bucket, previousBucket, !previousBucket, previousBucket === null, previousBucket === []);


        axios.post('https://to-do-listing-default-rtdb.firebaseio.com/bucket.json', bucket)
            .then(response => {
                //console.log(response.data);
                const bucketObj = {
                    ...bucket,
                    bucketId: response.data.name
                }
                alert('Item Added');
                dispatch(addTaskSuccess(bucketObj));

            })
            .catch(err => dispatch(addTaskFailed(err)))

    }



}

const setBucketsuccess = (buckets) => {
    return {
        type: actionTypes.SET_BUCKET_SUCCESS,
        buckets: buckets

    }
}
const setBucketsFailed = (error) => {
    return {
        type: actionTypes.SET_BUCKET_FAILED,
        error: error,
    }
}

export const setBuckets = () => {

    return dispatch => {



        axios.get('https://to-do-listing-default-rtdb.firebaseio.com/bucket.json')
            .then(response => {
                if (response.data !== null) {
                    //    console.log(response.data);
                    const bucket = [];
                    for (let key in response.data) {
                        bucket.push({
                            ...response.data[key],
                            toDo: { ...response.data[key].toDo },
                            bucketId: key
                        });
                    }
                    dispatch(setBucketsuccess(bucket));


                }
                else {
                    dispatch(setBucketsuccess({ name: "please create Item First" }));

                }

            })
            .catch(err => dispatch(setBucketsFailed(err)));
    }
}


export const resetError = () => {
    return {
        type: actionTypes.RESET_ERROR,
        loading: false
    }
}

export const setError = (error) => {
    return {
        type: actionTypes.RESET_ERROR,
        error: error
    }
}

export const setSelectedBucket = (buck) => {
    return {
        type: actionTypes.SET_SELECTED_BUCKET,
        buck: buck
    }
}

export const resetSelectedBucket = (buck) => {
    return {
        type: actionTypes.RESET_SELECTED_BUCKET,
        buck: ''
    }
}
