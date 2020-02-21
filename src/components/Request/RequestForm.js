import React, {Component} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {DefaultTextInput} from '../common/FormFields/DefaultTextInput';
import {DefaultMultipleInput} from '../common/FormFields/DefaultMultipleInput';
import {
  DefaultDatepickerInput,
} from '../common/FormFields/DefaultDatepickerInput';
import {DefaultCheckboxInput} from '../common/FormFields/DefaultCheckboxInput';
import {generateShortStrings} from '../../helpers';
import PersonPickerInput from '../common/FormFields/PersonPickerInput';
import {DefaultTextareaInput} from '../common/FormFields/DefaultTextareaInput';
import {DefaultRadioGroup} from '../common/FormFields/Radio/DefaultRadioGroup';

const GoodEndings = ['Yes', 'Depends', 'No'];

const WantedCharacters = generateShortStrings (100);

class RequestForm extends Component {
  render () {
    const {
      isSubmitting,
      values,
      onRequestCancel,
      errors,
      onRequestSaveDraft,
      isOwner,
      setFieldValue,
    } = this.props;

    return (
      <Row>
        <Col lg={12}>
          <div className={'form-field'}>
            <DefaultTextInput
              name={'RequestName'}
              disabled={!isOwner}
              errors={errors}
            />
          </div>
        </Col>

        <Col lg={12}>
          <div className={'form-field'}>
            <DefaultTextareaInput
              name={'Description'}
              disabled={!isOwner}
              errors={errors}
            />
          </div>
        </Col>

        <Col lg={6}>
          <div className={'form-field'}>
            <PersonPickerInput
              name={'Requestor'}
              setFieldValue={setFieldValue}
              disabled={!isOwner}
              value={values.Requestor}
              errors={errors}
            />
          </div>
        </Col>

        <Col lg={6}>
          <div className={'form-field'}>
            <DefaultRadioGroup
              name={'GoodEnding'}
              setFieldValue={setFieldValue}
              value={values.GoodEnding}
              errors={errors}
              radios={GoodEndings}
              disabled={!isOwner}
            />
          </div>
        </Col>

        <Col lg={12}>
          <div className={'form-field'}>
            <DefaultCheckboxInput
              name={'NeedStoryteller'}
              disabled={!isOwner}
            />
          </div>
        </Col>

        {values.NeedStoryteller &&
          <Col lg={12}>
            <div className={'form-field'}>
              <PersonPickerInput
                name={'Storyteller'}
                setFieldValue={setFieldValue}
                disabled={!isOwner}
                value={values.Storyteller}
                errors={errors}
              />
            </div>
          </Col>}

        <Col lg={12}>
          <div className={'form-field'}>
            <DefaultMultipleInput
              name={'WantedCharacters'}
              disabled={!isOwner}
              setFieldValue={setFieldValue}
              options={WantedCharacters}
            />
          </div>
        </Col>

        <Col lg={6}>
          <div className={'form-field'}>
            <DefaultDatepickerInput
              name={'Deadline'}
              disabled={!isOwner}
              setFieldValue={setFieldValue}
              value={values.Deadline}
              errors={errors}
            />
          </div>
        </Col>

        <Col lg={6}>
          <div className={'form-field'}>
            <DefaultTextInput
              name={'Budget'}
              disabled={!isOwner}
              errors={errors}
            />
          </div>
        </Col>

        <div className={'form-buttons-container'}>
          <button
            className={'button--secondary'}
            type={'button'}
            disabled={isSubmitting}
            onClick={onRequestCancel}
          >
            Cancel
          </button>

          <button
            className={'button'}
            type={'button'}
            onClick={() => onRequestSaveDraft (values)}
            disabled={!isOwner}
          >
            Save as draft
          </button>

          <button
            className={'button button--submit'}
            type={'submit'}
            disabled={!isOwner || isSubmitting}
          >
            Submit
          </button>
          {Object.keys (errors).length === 0 && errors.constructor === Object
            ? ''
            : 'Validation failed'}
        </div>
      </Row>
    );
  }
}

export default RequestForm;
