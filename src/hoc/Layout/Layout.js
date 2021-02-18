import React, { useState } from 'react';
import Aux from '../_Aux/_Aux';
import classes from './Layout.css';
import Toolbar from '../../Component/Toolbar/Tollbar';
import { connect } from 'react-redux';
import Modal from '../../Component/UI/Modal/Modal';
import * as actions from '../../Reducer/actions';
import Input from '../../Component/UI/Input/Input';
import Submit from '../../Component/UI/Button/AddButton';
//import SideDrawer from '../../Component/Navigation/SideDrawer/SideDrawer';

const layout = props => {


    const [item, seitem] = useState({
        elementType: 'input',
        value: '',
        validations: {
            required: true,
            maxLength: 20
        },
        valid: false,
        touched: false,
        elementConfig: {
            placeholder: 'item Name'
        }
    });

    const [desc, setdesc] = useState({
        elementType: 'textarea',
        value: '',
        validations: {
            required: true,

        },
        valid: false,
        touched: false,
        elementConfig: {
            placeholder: 'item Description'
        }
    });





    const [errorMsg, seterrorMsg] = useState('');

    const validateForm = (value, validations) => {
        let isValid = true;

        if (!validations) {
            return true;
        }
        if (validations.required) {
            isValid = value.trim() !== '' && isValid;
            if (value.length === 0) {
                seterrorMsg('! please Enter value');
            }
            if (value.trim().length > 0 && value.trim().length < 13) {
                seterrorMsg('');
            }


        }
        if (validations.maxLength) {
            isValid = value.trim().length <= validations.maxLength && isValid;
            if (value.trim().length > validations.maxLength) {

                seterrorMsg(" ! value must be less then 21 characters");

            }
            else if (value.trim().length !== 0) {
                seterrorMsg('');
            }
        }


        return isValid;

    }

    const updateObject = (oldObject, updatedProperties) => {
        return {
            ...oldObject,
            ...updatedProperties
        };
    };

    const onchangeHandler = (event, element) => {

        if (element.elementType === 'input') {
            const updateformData = updateObject(item, {
                ...item,
                value: event.target.value,
                touched: true
            });

            const updatedForm = updateObject(updateformData,
                updateObject(updateformData, {
                    valid: validateForm(event.target.value, element.validations)
                })
            );

            seitem(updatedForm);
        }
        else if (element.elementType === 'textarea') {
            const updateformData = updateObject(desc, {
                ...desc,
                value: event.target.value,
                touched: true
            });
            const updatedForm = updateObject(updateformData,
                updateObject(updateformData, {
                    valid: validateForm(event.target.value, element.validations)
                })
            );
            setdesc(updatedForm);
        }

    }

    const submitHandler = (event) => {
        event.preventDefault();

        const formDataFinal = {
            item: item.value,
            desc: desc.value,
        }
        //  console.log(toDo.valid, detail.valid, bucketName.valid);
        if (item.valid && desc.valid) {
            props.addBucket(formDataFinal, props.buckets);
            // props.addingTask();
            // if (props.error === '') {

            //     props.history.push("/");
            // }

        }
        else {
            alert(' Fill Details !!');
        }



    }

    let form = <form>
        <Input
            elementType={item.elementType}
            invalid={!item.valid}
            shouldValidate={item.validations}
            touched={item.touched}
            changed={(event) => onchangeHandler(event, item)}
            elementConfig={item.elementConfig}
        />
        <Input
            elementType={desc.elementType}
            invalid={!desc.valid}
            shouldValidate={desc.validations}
            touched={desc.touched}
            changed={(event) => onchangeHandler(event, desc)}
            elementConfig={desc.elementConfig}
        />
        <div style={{ width: '65%' }}>
            <Submit clicked={(event) => submitHandler(event)} taskName="Submit" />
        </div>
    </form>


    return (
        <Aux>

            <Toolbar resetError={props.reset} addItem={props.addItem} setSelectedBucket={props.setSelectedBucket} SelectedBucket={props.SelectedBucket} />

            {props.add ?
                <Modal popup={props.add} reset={props.reset} >
                    {errorMsg}
                    {form}
                </Modal>

                :
                <main className={classes.Content}>
                    {props.children}
                </main>
            }


        </Aux>
    );
}

const mapStateToProps = state => {
    return {
        buckets: state.buckets,
        error: state.error,
        SelectedBucket: state.selectedBucket

    };
};

const mapDispatchToProps = dispatch => {
    return {
        addBucket: (bucket, prevBucket) => dispatch(actions.addBucket(bucket, prevBucket)),
        setSelectedBucket: (bucketName) => dispatch(actions.setSelectedBucket(bucketName))
    };
};
export default React.memo(connect(mapStateToProps, mapDispatchToProps)(layout),
    (prevProps, nextProps) =>
        nextProps.children === prevProps.children
);