import data from './../constans/data';
import {compare} from '../helpers';
import {defaultEmail} from '../constans/emails';

let ITEMS_PER_PAGE = 10;
let SORT_BY = 'Id';
let SORT_DIRECTION = 1;
let REQUEST_TIMEOUT = 200;
let SERVER_ERROR = false;

const requests = data.Requests;
const users = data.Users;

export const editDraftRequest = (id, requestData) => {
 requests.map(el => {
  return el.Id === Number(id)
   ? Object.assign(el, requestData, {
      WantedCharacters: requestData.WantedCharacters.join(';'),
      Status: 'Draft',
     })
   : el;
 });
};

export const createDraftRequest = requestData => {
 const id = getHighestValue(requests, 'Id');
 Object.assign(requestData, {
  Id: id + 1,
  WantedCharacters: requestData.WantedCharacters.join(';'),
  Status: 'Draft',
 });
 requests.push(requestData);
};

// Fake api requests

export const sendEmails = (to, createdBy) => {
 let DEFAULT_SUBJECT = defaultEmail(to[0]).subject;
 let DEFAULT_BODY = defaultEmail(createdBy.DisplayName).body;
 let reuqestor = getUserById(to[0]);
 let storyteller = getUserById(to[1]);

 console.log(
  `Successfully send email to ${[
   reuqestor && reuqestor.Email,
   storyteller && storyteller.Email,
  ]}`
 );
 console.log(DEFAULT_SUBJECT);
 console.log(DEFAULT_BODY);
 // send Email api request
};

export const fetchUserById = id => {
 var usersSearchResult = users.filter(obj => {
  return obj.Id === Number(id);
 });

 const currentData = {
  user: usersSearchResult[0],
 };

 return new Promise((resolve, reject) => {
  let wait = setTimeout(() => {
   clearTimeout(wait);
   resolve(currentData);
   reject('Wrong');
  }, REQUEST_TIMEOUT);
 });
};

export const fetchUsers = () => {
 const currentData = {
  users: users,
 };

 return new Promise((resolve, reject) => {
  let wait = setTimeout(() => {
   clearTimeout(wait);
   resolve(currentData);
   reject('Wrong');
  }, REQUEST_TIMEOUT);
 });
};

export const editRequest = (id, requestData, isOwner) => {
 if (!isOwner) {
  return new Promise((resolve, reject) => {
   let wait = setTimeout(() => {
    clearTimeout(wait);
    resolve({error: 'No role owner'});
    reject('Wrong');
   }, REQUEST_TIMEOUT);
  });
 }

 requests.map(el => {
  return el.Id === Number(id)
   ? Object.assign(el, requestData, {
      WantedCharacters: requestData.WantedCharacters.join(';'),
      Status: 'New',
     })
   : el;
 });
 const currentData = {
  requests: requests,
 };

 return new Promise((resolve, reject) => {
  let wait = setTimeout(() => {
   clearTimeout(wait);
   resolve(currentData);
   reject('Wrong');
  }, REQUEST_TIMEOUT);
 });
};

export const createRequest = requestData => {
 const id = getHighestValue(requests, 'Id');
 Object.assign(
  requestData,
  {Id: id + 1},
  {WantedCharacters: requestData.WantedCharacters.join(';'), Status: 'New'}
 );
 requests.push(requestData);

 const currentData = {
  requests: requests,
 };

 return new Promise((resolve, reject) => {
  let wait = setTimeout(() => {
   clearTimeout(wait);
   resolve(currentData);
   reject('Wrong');
  }, REQUEST_TIMEOUT);
 });
};

export const fetchRequestById = id => {
 var requestsSearchResult = requests.filter(obj => {
  return obj.Id === Number(id);
 });

 const currentData = {
  request: requestsSearchResult[0],
 };

 return new Promise((resolve, reject) => {
  let wait = setTimeout(() => {
   clearTimeout(wait);
   resolve(currentData);
   reject('Wrong');
  }, REQUEST_TIMEOUT);
 });
};

export const fetchRequestsByValue = (
 value,
 currentPage,
 sortBy,
 sortDirection,
 itemsPerPage
) => {
 var requestsSearchResult = requests.filter(obj => {
  for (const key in obj) {
   if (
    obj[key] &&
    String(obj[key])
     .toUpperCase()
     .includes(value.toUpperCase())
   ) {
    return true;
   }
  }
  return false;
 });

 if (itemsPerPage) {
  ITEMS_PER_PAGE = itemsPerPage;
 }
 if (sortBy) {
  SORT_BY = sortBy;
 }
 if (sortDirection) {
  SORT_DIRECTION = sortDirection;
 }

 requestsSearchResult.sort((a, b) => compare(a, b, SORT_BY, SORT_DIRECTION));

 const indexOfLastItem = Number(currentPage) * ITEMS_PER_PAGE;
 const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
 const currentData = {
  itemsPerPage: ITEMS_PER_PAGE,
  currentPage: currentPage,
  pages: Math.ceil(requestsSearchResult.length / ITEMS_PER_PAGE),
  requests: requestsSearchResult.slice(indexOfFirstItem, indexOfLastItem),
 };

 return new Promise((resolve, reject) => {
  let wait = setTimeout(() => {
   clearTimeout(wait);
   resolve(currentData);
   reject('Wrong');
  }, REQUEST_TIMEOUT);
 });
};

export const fetchRequests = (
 currentPage,
 sortBy,
 sortDirection,
 itemsPerPage
) => {
 if (itemsPerPage) {
  ITEMS_PER_PAGE = itemsPerPage;
 }
 if (sortBy) {
  SORT_BY = sortBy;
 }
 if (sortDirection) {
  SORT_DIRECTION = sortDirection;
 }

 requests.sort((a, b) => compare(a, b, SORT_BY, SORT_DIRECTION));

 const indexOfLastItem = Number(currentPage) * ITEMS_PER_PAGE;
 const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
 const currentData = {
  itemsPerPage: ITEMS_PER_PAGE,
  currentPage: currentPage,
  pages: Math.ceil(requests.length / ITEMS_PER_PAGE),
  requests: requests.slice(indexOfFirstItem, indexOfLastItem),
 };

 return new Promise((resolve, reject) => {
  let wait = setTimeout(() => {
   clearTimeout(wait);
   resolve(currentData);
   reject('Wrong');
  }, REQUEST_TIMEOUT);
 });
};

//helper functions
const getHighestValue = (requests, value) => {
 requests.sort((a, b) => compare(a, b, value, -1));

 return requests[0][value];
};

const getUserById = id => {
 if (!id) {
  return null;
 }
 return users.filter(obj => {
  return obj.Id === Number(id);
 })[0];
};
