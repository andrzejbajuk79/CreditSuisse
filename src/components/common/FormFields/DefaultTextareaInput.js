import React from 'react';
import {ErrorMessage, Field} from 'formik';

export const DefaultTextareaInput = ({name, disabled, errors}) => (
  <React.Fragment>
    <label className={'label'} htmlFor={name}>
      {name}
    </label>
    <Field
      className={`input field ${errors && errors[name] ? 'invalid' : ''}`}
      component={'textarea'}
      rows={4}
      id={name}
      name={name}
      disabled={disabled}
      placeholder={`Type your ${name}`}
    />
    <ErrorMessage className={'input-error'} name={name} component={'div'} />
  </React.Fragment>
);
