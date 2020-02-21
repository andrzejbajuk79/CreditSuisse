import React from 'react';
import {Field} from "formik";

export const DefaultRadioInput = ({name, disabled, value, errors}) => (
    <React.Fragment>
        <label
            className={'radio-label'}
            htmlFor={`${name}-${value}-radio`}
        >
            {value}
            <Field
                className={'field'}
                type={'radio'}
                name={name}
                id={`${name}-${value}-radio`}
                disabled={disabled}
                value={value}
            />
            <span
                className={`radio-check ${errors && errors[name] ? 'invalid' : ''}`}
            ></span>
        </label>
    </React.Fragment>
);

