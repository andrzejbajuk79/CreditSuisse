import React from 'react';
import {ErrorMessage, Field} from 'formik';

export const DefaultMultipleInput = ({
  name,
  disabled,
  setFieldValue,
  options,
}) => (
  <React.Fragment>
    <label className={'label'} htmlFor={name}>
      {name}
    </label>
    <Field
      className={'input field'}
      component={'select'}
      id={name}
      name={name}
      onChange={evt =>
        setFieldValue (
          name,
          [].slice
            .call (evt.target.selectedOptions)
            .map (option => option.value)
        )}
      multiple={true}
      disabled={disabled}
    >
      {options.map (s => (
        <option key={s} value={s} className={'multiselect-option'}>
          {s}
        </option>
      ))}
    </Field>
    <ErrorMessage name={name} component={'div'} />
  </React.Fragment>
);
