import React, {Component} from 'react';
import {Container} from 'react-bootstrap';
import RequestsTable from '../components/Dashboard/RequestsTable/RequestsTableContainer';
import {Link} from 'react-router-dom';
import {PUBLIC_ROUTES} from '../constans/routes';

class Dashboard extends Component {
 render() {
  return (
   <Container>
    <div className={'dashboard-page'}>
     <h1>Requests</h1>
     <div className={'new-request-button-container'}>
      <Link className={'button'} to={`/${PUBLIC_ROUTES.REQUEST}`}>
       Create new
      </Link>
     </div>
     <hr />
     <div className={'table-container'}>
      <RequestsTable />
     </div>
    </div>
   </Container>
  );
 }
}

export default Dashboard;
