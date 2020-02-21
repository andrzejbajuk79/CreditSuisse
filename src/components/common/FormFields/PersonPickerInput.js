import React, {Component} from 'react';
import {fetchUsers} from '../../../service/FakeApiService';
import {ErrorMessage} from 'formik';

class PersonPickerInput extends Component {
  state = {
    users: '',
    pickedPerson: false,
    filteredUsers: '',
    isFetching: false,
  };

  componentDidMount () {
    this.setState ({isFetching: true});
    fetchUsers ().then (this.onFetchSuccess, this.onFetchFailure);
  }

  onSearch = e => {
    const {users} = this.state;
    let value = e.target.value;

    var usersSearchResult = users.filter (obj => {
      for (const key in obj) {
        if (
          obj[key] &&
          String (obj[key]).toUpperCase ().includes (value.toUpperCase ())
        ) {
          return true;
        }
      }
      return false;
    });
    this.setState ({
      filteredUsers: usersSearchResult.slice (0, 5),
      pickedPerson: e.target.value,
    });
  };

  pickPerson = person => {
    const {setFieldValue, name} = this.props;
    setFieldValue (name, person.Id);

    this.setState ({
      pickedPerson: person.Id,
      filteredUsers: [person],
    });
  };

  render () {
    const {filteredUsers, pickedPerson} = this.state;
    const {disabled, name, value, errors} = this.props;

    return (
      <React.Fragment>
        <label className={'label'} htmlFor={name}>
          {name}
        </label>
        <input
          className={`input field ${errors && errors[name] ? 'invalid' : ''}`}
          id={name}
          name={name}
          onChange={this.onSearch}
          value={pickedPerson === false ? value : pickedPerson}
          disabled={disabled}
          placeholder={`Find ${name} by any field`}
        />
        <div className={'tips'}>
          {filteredUsers &&
            filteredUsers.map (item => (
              <option key={item.Id} onClick={() => this.pickPerson (item)}>
                {item.DisplayName}
              </option>
            ))}
        </div>
        <ErrorMessage className={'input-error'} name={name} component={'div'} />
      </React.Fragment>
    );
  }

  onFetchSuccess = response => {
    const {value} = this.props;
    const users = response.users || null;

    let filteredUsers = users.filter (user => user.Id === Number (value));

    this.setState ({
      users,
      filteredUsers,
      isFetching: false,
    });
  };

  onFetchFailure = response => {
    const error = response.error || null;

    this.setState ({
      error,
      isFetching: false,
    });
  };
}

export default PersonPickerInput;
