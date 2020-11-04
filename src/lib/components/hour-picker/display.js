import React from 'react';
import PropTypes from 'prop-types';

const Display = ({
  hours,
  minutes,
  edit,
  setEdit,
  isAM,
  setAm,
}) => {
  const onClickHour = () => {
    setEdit('hrs');
  };
  const onClickMinute = () => {
    setEdit('min');
  };
  const onAM = () => {
    setAm(true);
  };
  const onPM = () => {
    setAm(false);
  };
  const hrsClass = edit === 'hrs' ? 'active' : '';
  const minClass = edit === 'min' ? 'active' : '';
  return (
    <div className="dial__picker--display">
      <div className="dial__picker--display-values">
        <button
          type="button"
          className={`dial__picker--display-value hours ${hrsClass}`}
          onClick={onClickHour}
        >
          {String(hours).padStart(2, '0')}
        </button>
        <div className="dial__picker--display-middle">:</div>
        <button
          type="button"
          className={`dial__picker--display-value minutes ${minClass}`}
          onClick={onClickMinute}
        >
          {String(minutes).padStart(2, '0')}
        </button>
        <div className="dial__picker--display-ampm">
          <button type="button" onClick={onAM} className={`dial__picker--ampm-am ${isAM ? 'active' : ''}`}>
            <span>AM</span>
          </button>
          <button type="button" onClick={onPM} className={`dial__picker--ampm-pm ${isAM ? '' : 'active'}`}>
            <span>PM</span>
          </button>
        </div>
      </div>
    </div>
  );
};

Display.defaultProps = {
  hours: 0,
  minutes: 0,
  isAM: false,
  edit: 'hrs',
  setEdit: () => {},
  setAm: () => {},
};

Display.propTypes = {
  hours: PropTypes.number,
  minutes: PropTypes.number,
  isAM: PropTypes.bool,
  edit: PropTypes.string,
  setEdit: PropTypes.func,
  setAm: PropTypes.func,
};

export default Display;
