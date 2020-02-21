import React from 'react';
import DatePicker from 'react-datepicker';

export const DefaultDatepickerInput = ({
  name,
  disabled,
  setFieldValue,
  value,
}) => {
  const weekAhead = new Date ();
  weekAhead.setDate (weekAhead.getDate () + 7);

  const fourWeeksAhead = new Date ();
  fourWeeksAhead.setDate (fourWeeksAhead.getDate () + 28);

  let endOfYear = new Date (new Date ().getFullYear (), 11, 31);

  return (
    <React.Fragment>
      <label className={'label'} htmlFor={name}>
        {name}
      </label>
      <DatePicker
        className={'input field'}
        id={name}
        selected={(value && new Date (value)) || fourWeeksAhead}
        onChange={val => {
          setFieldValue (name, val);
        }}
        dateFormat={'dd.MM.yyyy'}
        disabled={disabled}
        minDate={weekAhead}
        maxDate={endOfYear}
        placeholder={`Select ${name} date`}
      />
    </React.Fragment>
  );
};
