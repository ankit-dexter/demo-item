import React, { } from 'react';

import classes from './Modal.css';
import Aux from '../../../hoc/_Aux/_Aux';
import Backdrop from '../BackDrop/BackDtop';

import Button from '../../UI/Button/AddButton';

const modal = (props) => {



    return (
        <Aux>
            <Backdrop popup={props.add} reset={props.reset} />
            <div
                className={classes.Modal}
                style={{
                    transform: props.popup ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.popup ? '1' : '0'
                }}
            >
                <div style={{ width: '65%' }}>
                    <Button clicked={props.reset} taskName='Close' />
                </div>

                {props.children}
            </div>
        </Aux>
    )
}


export default React.memo(
    modal,
    (prevProps, nextProps) =>
        nextProps.popup === prevProps.popup &&
        nextProps.children === prevProps.children
);