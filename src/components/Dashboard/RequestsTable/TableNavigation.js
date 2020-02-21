import React, {Component} from 'react';

class TableNavigation extends Component {
  render () {
    const {setPage, currentPage, pages} = this.props;
    return (
      <div className={'table-navigation-pages'}>
        Page {currentPage} of {pages}.
        <div className={'number-wrapper'}>
          <input
            className={'input number-input'}
            value={currentPage}
            type={'number'}
            onChange={setPage}
          />
          <div className={'number-up'} onClick={() => setPage (1)} />
          <div className={'number-down'} onClick={() => setPage (-1)} />
        </div>
      </div>
    );
  }
}

export default TableNavigation;
