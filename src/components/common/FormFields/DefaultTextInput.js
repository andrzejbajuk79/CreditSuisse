import React from 'react';
import {ErrorMessage, Field} from 'formik';

export const DefaultTextInput = ({name, disabled, errors}) => (
  <React.Fragment>
    <label className={'label'} htmlFor={name}>
      {name}
    </label>
    <Field
      className={`input field ${errors && errors[name] ? 'invalid' : ''}`}
      type={'text'}
      id={name}
      name={name}
      disabled={disabled}
      placeholder={`Type your ${name}`}
    />
    <ErrorMessage className={'input-error'} name={name} component={'div'} />
  </React.Fragment>
);
