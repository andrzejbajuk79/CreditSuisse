import React, {Component} from 'react';
import {
  fetchRequests,
  fetchRequestsByValue,
} from '../../../service/FakeApiService';
import RequestsTable from './RequestsTable';

const tableHead = [
  'Request Name',
  'Requestor',
  'Good Ending',
  'Description',
  'Need Storyteller',
  'Storyteller',
  'Wanted Characters',
  'Deadline',
  'Budget',
  'Status',
  'Controls',
];

class RequestsTableContainer extends Component {
  state = {
    requests: [],
    isFetching: false,
    error: '',
    currentPage: 1,
    pages: 0,
    search: '',
    sortBy: 'Id',
    sortDirection: 1,
    currentlyOpenedTruncatedString: {
      id: null,
      key: null,
    },
  };

  componentDidMount () {
    const {currentPage, sortBy, sortDirection} = this.state;

    this.setState ({isFetching: true});

    fetchRequests (currentPage, sortBy, sortDirection).then (
      this.onFetchSuccess,
      this.onFetchFailure
    );
  }

  render () {
    const {
      requests,
      isFetching,
      error,
      pages,
      currentPage,
      search,
      sortBy,
      sortDirection,
      currentlyOpenedTruncatedString,
    } = this.state;

    return (
      <RequestsTable
        tableHead={tableHead}
        sortByValue={this.sortByValue}
        setPage={this.setPage}
        search={search}
        setSearch={this.setSearch}
        currentPage={currentPage}
        pages={pages}
        requests={requests}
        isFetching={isFetching}
        error={error}
        sortBy={sortBy}
        sortDirection={sortDirection}
        currentlyOpenedTd={currentlyOpenedTruncatedString}
        toggleTd={this.toggleCurrentlyOpenedTruncatedString}
      />
    );
  }

  toggleCurrentlyOpenedTruncatedString = (id, key) => {
    const {currentlyOpenedTruncatedString} = this.state;

    if (
      currentlyOpenedTruncatedString.id === id &&
      currentlyOpenedTruncatedString.key === key
    ) {
      this.setState ({currentlyOpenedTruncatedString: {id: null, key: null}});
    } else {
      this.setState ({currentlyOpenedTruncatedString: {id, key}});
    }
  };

  setPage = changeBy => {
    const {search, pages, sortBy, sortDirection, currentPage} = this.state;
    let setPage = currentPage + changeBy;

    if (setPage > pages || setPage <= 0) {
      return;
    }

    this.setState ({isFetching: true});

    if (search.length > 0) {
      fetchRequestsByValue (search, setPage, sortBy, sortDirection).then (
        this.onFetchSuccess,
        this.onFetchFailure
      );
    } else {
      fetchRequests (setPage, sortBy, sortDirection).then (
        this.onFetchSuccess,
        this.onFetchFailure
      );
    }
  };

  setSearch = e => {
    const {sortBy, sortDirection} = this.state;
    this.setState ({
      search: e.target.value,
      isFetching: true,
    });

    fetchRequestsByValue (e.target.value, 1, sortBy, sortDirection).then (
      this.onFetchSuccess,
      this.onFetchFailure
    );
  };

  sortByValue = value => {
    const {search, currentPage, sortBy, sortDirection} = this.state;

    if (value === tableHead[tableHead.length - 1]) {
      return;
    }

    let currentDirection = sortDirection;

    if (value === sortBy) {
      currentDirection = currentDirection * -1;
      this.setState ({sortDirection: currentDirection});
    } else {
      currentDirection = 1;
      this.setState ({
        sortDirection: currentDirection,
        sortBy: value,
      });
    }

    this.setState ({isFetching: true});

    if (search.length > 0) {
      fetchRequestsByValue (search, currentPage, value, currentDirection).then (
        this.onFetchSuccess,
        this.onFetchFailure
      );
    } else {
      fetchRequests (currentPage, value, currentDirection).then (
        this.onFetchSuccess,
        this.onFetchFailure
      );
    }
  };

  onFetchSuccess = data => {
    this.setState ({
      pages: data.pages,
      currentPage: data.currentPage,
      requests: data.requests,
      isFetching: false,
    });
  };

  onFetchFailure = () => {
    this.setState ({
      isLoading: false,
      error: true,
    });
  };
}

export default RequestsTableContainer;
