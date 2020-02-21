import React from 'react';
import {ErrorMessage} from "formik";
import {DefaultRadioInput} from "./DefaultRadioInput";

export const DefaultRadioGroup = ({radios, disabled, name, errors}) => (
    <React.Fragment>
        <label
            className={'label'}
            htmlFor={name}
        >
            GoodEnding
        </label>
        <div
            className={'radio-container'}
            id={name}
        >
            {radios.map((item, key) => (
                <DefaultRadioInput
                    key={key}
                    name={name}
                    disabled={disabled}
                    value={item}
                    errors={errors}
                />
            ))}
        </div>
        <ErrorMessage
            className={'input-error'}
            name={name}
            component={'div'}
        />
    </React.Fragment>
);
