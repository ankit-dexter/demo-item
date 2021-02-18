import * as actionTypes from '../Reducer/actionTypes';
//import { updateObject } from '../../Utility/Utility';

const initialState = {
    buckets: [],
    error: '',
    selectedBucket: 'n'


}

const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};
//==================================SET TDB ================================

const setADD_BUCKET_SUCCESS = (state, action) => {
    const newbucket = updateObject(state, { buckets: state.buckets.concat(action.buck) })
    //   console.log(newbucket);
    return updateObject(state, newbucket);
}

const setADD_BUCKET_FAILED = (state, action) => {
    //console.log(action.error);
    return updateObject(state, { error: action.error });
}



//===============================RESET ERROR==============================

const resetError = (state, action) => {
    return updateObject(state, { error: null });
}

const setError = (state, action) => {
    return updateObject(state, { error: action.error });
}

const setSET_BUCKET_SUCCESS = (state, action) => {

    return updateObject(state, { buckets: action.buckets });
}

const setSET_BUCKET_FAILED = (state, action) => {
    //  console.log(action.error);
    return updateObject(state, { error: action.error });
}

const setSELECTED_BUCKET = (state, action) => {

    return updateObject(state, { selectedBucket: action.buck });
}

const resetSELECTED_BUCKET = (state, action) => {

    return updateObject(state, { selectedBucket: action.buck });
}



const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.ADD_BUCKET_SUCCESS: return (setADD_BUCKET_SUCCESS(state, action));
        case actionTypes.ADD_BUCKET_FAILED: return (setADD_BUCKET_FAILED(state, action));


        case actionTypes.SET_BUCKET_SUCCESS: return (setSET_BUCKET_SUCCESS(state, action));
        case actionTypes.SET_BUCKET_FAILED: return (setSET_BUCKET_FAILED(state, action));
        case actionTypes.SET_ERROR: return (setError(state, action));
        case actionTypes.RESET_ERROR: return (resetError(state, action));

        case actionTypes.SET_SELECTED_BUCKET: return (setSELECTED_BUCKET(state, action));

        case actionTypes.RESET_SELECTED_BUCKET: return (resetSELECTED_BUCKET(state, action));



        default: return state;
    }
}

export default reducer;