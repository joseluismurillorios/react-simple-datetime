import React from 'react';
import PropTypes from 'prop-types';

import { getDateParams, MONTHS_SHORT, WEEKDAYS_SHORT } from './utils';

const DisplayDay = ({
  month,
  year,
  day,
  weekday,
}) => (
  <div className="day__picker--display">
    <div className="day__picker--display-values">
      <div className="day__picker--display-year">{year}</div>
      <div className="day__picker--display-current">
        <div className="day__picker--display-weekday">{WEEKDAYS_SHORT[weekday]}</div>
        <div className="day__picker--display-day">{day}</div>
        <div className="day__picker--display-month">{MONTHS_SHORT[month]}</div>
      </div>
    </div>
  </div>
);

DisplayDay.defaultProps = getDateParams();

DisplayDay.propTypes = {
  month: PropTypes.number,
  year: PropTypes.number,
  day: PropTypes.number,
  weekday: PropTypes.number,
};

export default DisplayDay;
