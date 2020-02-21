import React, {Component} from 'react';
import expand from './../../assets/images/expand-alt-solid.svg';

const truncateShort = 50;
const truncateLong = 500;

class TruncatedString extends Component {
  state = {
    open: false,
  };

  toggleTooltip = () => {
    this.setState (prevState => ({
      open: !prevState.open,
    }));
  };

  truncateString = (string, to) => {
    if (string && typeof string === 'string') {
      string = string.split (';').join ('; ');

      if (string.length > to) {
        return `${string.substring (0, to)}...`;
      }

      return string;
    }
    return string;
  };

  render () {
    const {string, toggleTd, toggled} = this.props;
    const {open} = this.state;

    return (
      <div className={'truncated-string'}>
        <div>
          {this.truncateString (string, truncateShort)}
        </div>
        {string &&
          string.length > truncateShort &&
          <div onClick={toggleTd} className="custom-tooltip">
            <img src={expand} alt={'expand'} width={15} />
            <span className={`tooltip-text ${toggled ? 'visible' : ''}`}>
              {this.truncateString (string, truncateLong)}
            </span>
          </div>}
      </div>
    );
  }
}

export default TruncatedString;
