import React, {Component} from 'react';
import TruncatedString from '../../common/TruncatedString';
import loader from '../../../assets/images/loader.svg';
import {PUBLIC_ROUTES} from '../../../constans/routes';
import {Link} from 'react-router-dom';
import TableNavigation from './TableNavigation';

class RequestsTable extends Component {
 render() {
  const {
   tableHead,
   requests,
   isFetching,
   error,
   pages,
   currentPage,
   setPage,
   search,
   setSearch,
   sortByValue,
   sortBy,
   sortDirection,
   currentlyOpenedTd,
   toggleTd,
  } = this.props;

  return (
   <React.Fragment>
    <div className={'table-nav--top'}>
     <TableNavigation
      setPage={setPage}
      currentPage={currentPage}
      pages={pages}
     />
     <input
      className={'input'}
      value={search}
      type={'text'}
      placeholder={'Search...'}
      onChange={setSearch}
     />
    </div>
    <table>
     <colgroup>
      <col width={140} />
      <col width={80} />
      <col width={110} />
      <col width={200} />
      <col width={120} />
      <col width={80} />
      <col width={140} />
      <col width={100} />
      <col width={70} />
      <col width={60} />
      <col width={70} />
     </colgroup>
     <thead>
      <tr>
       {tableHead.map((item, key) => (
        <th key={key} onClick={() => sortByValue(item.replace(/\s/g, ''))}>
         {item}
         {item.replace(/\s/g, '') === sortBy &&
          (sortDirection === 1 ? (
           <i className={'arrow down'} />
          ) : (
           <i className={'arrow up'} />
          ))}
        </th>
       ))}
      </tr>
     </thead>
     <tbody>
      {!requests ? (
       <React.Fragment />
      ) : isFetching ? (
       <tr>
        <td colSpan={tableHead.length}>
         <div className={'fetch-info'}>
          <img src={loader} alt={'loader'} width={30} />
         </div>
        </td>
       </tr>
      ) : error ? (
       <tr>
        <td colSpan={tableHead.length}>
         <div className={'fetch-info'}>Error while fetching data</div>
        </td>
       </tr>
      ) : requests.length > 0 ? (
       requests.map((item, key) => {
        let dateString = new Date(item.Deadline).toLocaleString('pl-PL', {
         hour12: false,
        });
        dateString = dateString.substr(0, dateString.indexOf(','));
        return (
         <tr key={key}>
          <td>
           <TruncatedString
            toggled={
             item.Id === currentlyOpenedTd.id &&
             'RequestName' === currentlyOpenedTd.key
            }
            toggleTd={() => toggleTd(item.Id, 'RequestName')}
            string={item.RequestName}
           />
          </td>
          <td>
           <TruncatedString
            toggled={
             item.Id === currentlyOpenedTd.id &&
             'Requestor' === currentlyOpenedTd.key
            }
            toggleTd={() => toggleTd(item.Id, 'Requestor')}
            string={item.Requestor && item.Requestor}
           />
          </td>
          <td>
           <TruncatedString
            toggled={
             item.Id === currentlyOpenedTd.id &&
             'GoodEnding' === currentlyOpenedTd.key
            }
            toggleTd={() => toggleTd(item.Id, 'GoodEnding')}
            string={item.GoodEnding}
           />
          </td>
          <td>
           <TruncatedString
            toggled={
             item.Id === currentlyOpenedTd.id &&
             'Description' === currentlyOpenedTd.key
            }
            toggleTd={() => toggleTd(item.Id, 'Description')}
            string={item.Description}
           />
          </td>
          <td>{item.NeedStoryteller ? 'true' : 'false'}</td>
          <td>
           <TruncatedString
            toggled={
             item.Id === currentlyOpenedTd.id &&
             'Storyteller' === currentlyOpenedTd.key
            }
            toggleTd={() => toggleTd(item.Id, 'Storyteller')}
            string={item.Storyteller && item.Storyteller}
           />
          </td>
          <td>
           <TruncatedString
            toggled={
             item.Id === currentlyOpenedTd.id &&
             'WantedCharacters' === currentlyOpenedTd.key
            }
            toggleTd={() => toggleTd(item.Id, 'WantedCharacters')}
            string={item.WantedCharacters}
           />
          </td>
          <td>{dateString}</td>
          <td>
           <TruncatedString
            toggled={
             item.Id === currentlyOpenedTd.id &&
             'Budget' === currentlyOpenedTd.key
            }
            toggleTd={() => toggleTd(item.Id, 'Budget')}
            string={item.Budget}
           />
          </td>
          <td>
           <TruncatedString
            toggled={
             item.Id === currentlyOpenedTd.id &&
             'Status' === currentlyOpenedTd.key
            }
            toggleTd={() => toggleTd(item.Id, 'Status')}
            string={item.Status}
           />
          </td>
          <td>
           <Link to={`/${PUBLIC_ROUTES.REQUEST}/${item.Id}`}>Edit</Link>
          </td>
         </tr>
        );
       })
      ) : (
       <tr>
        <td colSpan={tableHead.length}>
         <div className={'fetch-info'}>Not found</div>
        </td>
       </tr>
      )}
     </tbody>
    </table>
    <div className={'table-nav--bottom'}>
     <TableNavigation
      setPage={setPage}
      currentPage={currentPage}
      pages={pages}
     />
    </div>
   </React.Fragment>
  );
 }
}

export default RequestsTable;
