import React, {Component} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import {NewRequest} from './New/NewRequest';
import {EditRequest} from './Edit/EditRequest';
import {Container} from 'react-bootstrap';

class RequestBase extends Component {
 render() {
  const {match} = this.props;

  return (
   <Container>
    <Switch>
     <Route exact path={match.url} render={() => <NewRequest />} />
     <Route path={`${match.url}/:id`} render={() => <EditRequest />} />
    </Switch>
   </Container>
  );
 }
}

export default Request = withRouter(RequestBase);
