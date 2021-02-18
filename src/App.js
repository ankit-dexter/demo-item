import React, { useEffect, useState } from 'react';
//import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Layout from './hoc/Layout/Layout';
import Bucket from './Container/Bucket/Bucket';
import { connect } from 'react-redux';
import * as actions from "./Reducer/actions"

const app = props => {
  const [add, setadd] = useState(false);

  const reset = () => {
    // console.log('[CLOSED]')
    setadd(!add);
  }
  const addItem = () => {
    setadd(true);
  }

  useEffect(() => {
    props.setBuckets();

  }, [props.toDoList]);



  return (
    <Layout add={add} reset={reset} addItem={addItem} >
      <Bucket />
    </Layout>
  );

}

const mapStateToProps = state => {
  return {
    buckets: state.buckets,
    toDoList: state.toDoList
  }
}

const mapDipatchToProps = dispatch => {
  return {
    setBuckets: () => dispatch(actions.setBuckets()),
    // setToDo: () => dispatch(actions.setToDo())
  }
}
export default connect(mapStateToProps, mapDipatchToProps)(app);
//export default app;
