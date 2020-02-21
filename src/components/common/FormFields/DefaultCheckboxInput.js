import React from 'react';
import {ErrorMessage, Field} from 'formik';

export const DefaultCheckboxInput = ({name, disabled, errors}) => (
  <React.Fragment>
    <label className={'checkbox-label'} htmlFor={name}>
      {name}
      <Field
        className={`input field`}
        type={'checkbox'}
        id={name}
        name={name}
        disabled={disabled}
      />
      <span
        className={`checkbox-check ${errors && errors[name] ? 'invalid' : ''}`}
      />
    </label>

    <ErrorMessage className={'input-error'} name={name} component={'div'} />
  </React.Fragment>
);
