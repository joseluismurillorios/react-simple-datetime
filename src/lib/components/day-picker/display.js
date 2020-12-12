import React from 'react';
import PropTypes from 'prop-types';

import { getDateParams, MONTHS_SHORT, WEEKDAYS_SHORT } from './utils';

const DisplayDay = ({
  month,
  year,
  day,
  weekday,
  onYear,
  onDate,
  onReset,
}) => (
  <div className="day__picker--display">
    <div className="day__picker--display-values">
      <button className="day__picker--display-year" onClick={onYear}>{year}</button>
      <button className="day__picker--display-current" onClick={onDate}>
        <div className="day__picker--display-weekday">{WEEKDAYS_SHORT[weekday]}</div>
        <div className="day__picker--display-day">{day}</div>
        <div className="day__picker--display-month">{MONTHS_SHORT[month]}</div>
      </button>
    </div>
    <div className="day__picker--display-reset">
      <button className="" onClick={onReset}>Today</button>
    </div>
  </div>
);

DisplayDay.defaultProps = {
  ...getDateParams(),
  onYear: () => {},
  onDate: () => {},
  onReset: () => {},
};

DisplayDay.propTypes = {
  month: PropTypes.number,
  year: PropTypes.number,
  day: PropTypes.number,
  weekday: PropTypes.number,
  onYear: PropTypes.func,
  onDate: PropTypes.func,
  onReset: PropTypes.func,
};

export default DisplayDay;
