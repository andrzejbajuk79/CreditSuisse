import React, {Component} from 'react';
import {Form, Formik} from 'formik';
import {editRequestFormValidationSchema} from './validationSchema';
import {editRequestFormInitialValues} from './initialValues';
import {PUBLIC_ROUTES} from '../../../constans/routes';
import RequestForm from '../../../components/Request/RequestForm';
import {
 editDraftRequest,
 editRequest,
 fetchRequestById,
 sendEmails,
} from '../../../service/FakeApiService';
import {withRouter} from 'react-router-dom';
import {withUser} from '../../../components/hoc/withUser';

class EditRequestBase extends Component {
 state = {
  request: '',
  isFetching: false,
  fetchingError: '',
  sendingErrorMessage: '',
 };

 componentDidMount() {
  const {match} = this.props;

  this.setState({isFetching: true});
  fetchRequestById(match.params.id).then(
   this.onFetchRequestSuccess,
   this.onFetchRequestFailure
  );
 }

 render() {
  const {sendingErrorMessage, fetchingError, isFetching, request} = this.state;
  const {security} = this.props;

  return (
   <div className={'request-page'}>
    <h1>Edit request</h1>
    {fetchingError ? (
     <div>Server problems</div>
    ) : isFetching ? (
     <div>loading...</div>
    ) : request ? (
     <Formik
      initialValues={editRequestFormInitialValues(request)}
      validationSchema={editRequestFormValidationSchema}
      onSubmit={this.onRequestSave}
     >
      {({isSubmitting, values, setFieldValue, errors}) => (
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
    ) : (
     <div>Request not found</div>
    )}
   </div>
  );
 }

 onRequestCancel = () => {
  const {history} = this.props;
  history.push(`/${PUBLIC_ROUTES.DASHBOARD}`);
 };

 onRequestSaveDraft = requestData => {
  const {history, match} = this.props;

  editDraftRequest(match.params.id, requestData);

  history.push(`/${PUBLIC_ROUTES.DASHBOARD}`);
 };

 onRequestSave = (values, actions) => {
  const {match, security} = this.props;

  this.setState(
   {
    sendingErrorMessage: '',
    isLoading: true,
   },
   () => {
    editRequest(match.params.id, values, security.isOwner).then(
     this.onSaveSuccess(values, actions),
     this.onSaveFailure(values, actions)
    );
   }
  );
 };

 onSaveSuccess = (values, actions) => ({data}) => {
  const {history, security} = this.props;
  this.setState({sendingErrorMessage: '', isLoading: false}, () => {
   actions.setSubmitting(false);

   sendEmails([values.Requestor, values.Storyteller], security.user);

   history.push(`/${PUBLIC_ROUTES.DASHBOARD}`);
  });
 };

 onSaveFailure = (values, actions) => ({errors}) => {
  this.setState({sendingErrorMessage: errors, isLoading: false}, () => {
   actions.setSubmitting(false);
   actions.setErrors(errors);
  });
 };

 onFetchRequestSuccess = data => {
  this.setState({
   request: data.request,
   isFetching: false,
  });
 };

 onFetchRequestFailure = () => {
  this.setState({
   isLoading: false,
   error: true,
  });
 };
}

export const EditRequestWithRouter = withRouter(EditRequestBase);
export const EditRequest = withUser(EditRequestWithRouter);
