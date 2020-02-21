import React, {Component} from 'react';
import {Form, Formik} from 'formik';
import {newRequestFormValidationSchema} from './validationSchema';
import {newRequestFormInitialValues} from './initialValues';
import {PUBLIC_ROUTES} from '../../../constans/routes';
import RequestForm from '../../../components/Request/RequestForm';
import {
 createDraftRequest,
 createRequest,
 sendEmails,
} from '../../../service/FakeApiService';
import {withRouter} from 'react-router-dom';
import {withUser} from '../../../components/hoc/withUser';

class NewRequestBase extends Component {
 state = {
  isFetching: false,
  sendingErrorMessage: '',
 };

 render() {
  const {sendingErrorMessage} = this.state;
  const {security} = this.props;
  return (
   <div className={'request-page'}>
    <h1>New request</h1>
    <Formik
     initialValues={newRequestFormInitialValues}
     validationSchema={newRequestFormValidationSchema}
     onSubmit={this.onRequestSave}
    >
     {({isSubmitting, values, setFieldValue, handleBlur, errors}) => (
      <Form noValidate={true}>
       <RequestForm
        values={values}
        isSubmitting={isSubmitting}
        onRequestCancel={this.onRequestCancel}
        onRequestSaveDraft={this.onRequestSaveDraft}
        setFieldValue={setFieldValue}
        isOwner={security.isOwner}
        errors={errors}
       />
       <div>{sendingErrorMessage && <div>Sending Error</div>}</div>
      </Form>
     )}
    </Formik>
   </div>
  );
 }

 onRequestCancel = () => {
  const {history} = this.props;
  history.push(`/${PUBLIC_ROUTES.DASHBOARD}`);
 };

 onRequestSaveDraft = requestData => {
  const {history} = this.props;

  createDraftRequest(requestData);

  history.push(`/${PUBLIC_ROUTES.DASHBOARD}`);
 };

 onRequestSave = (values, actions) => {
  this.setState(
   {
    sendingErrorMessage: '',
    isFetching: true,
   },
   () => {
    createRequest(values).then(
     this.onSaveSuccess(values, actions),
     this.onSaveFailure(values, actions)
    );
   }
  );
 };

 onSaveSuccess = (values, actions) => ({data}) => {
  const {history, security} = this.props;
  this.setState({sendingErrorMessage: '', isFetching: false}, () => {
   actions.setSubmitting(false);

   sendEmails([values.Requestor, values.Storyteller], security.user);

   history.push(`/${PUBLIC_ROUTES.DASHBOARD}`);
  });
 };

 onSaveFailure = (values, actions) => ({errors}) => {
  this.setState({sendingErrorMessage: errors, isFetching: false}, () => {
   actions.setSubmitting(false);
   actions.setErrors(errors);
  });
 };
}

export const NewRequestWithRouter = withRouter(NewRequestBase);
export const NewRequest = withUser(NewRequestWithRouter);
