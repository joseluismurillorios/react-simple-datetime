import React from 'react';
import PropTypes from 'prop-types';

import { getDateParams, MONTHS_SHORT, WEEKDAYS_SHORT } from './utils';

const DisplayDay = ({
  value,
  editRange,
  onYear,
  onDate,
  onReset,
}) => {
  const isRange = Array.isArray(value);
  const {
    month,
    year,
    day,
    weekday,
  } = getDateParams(isRange ? value[0] : value);
  const {
    month: m,
    year: y,
    day: d,
    weekday: w,
  } = isRange ? getDateParams(value[1]) : {};

  const classes = editRange === 0 ? ['active' , ''] : ['', 'active'];

  return (
    <div className={`day__picker--display ${isRange ? 'display-range' : ''}`}>
      <div className="day__picker--display-values">
        <div className="day__picker--display-date">
          <button className="day__picker--display-year" onClick={onYear}>{year}</button>
          <button
            className={`day__picker--display-current ${classes[0]}`}
            onClick={() => {
              onDate(0)
            }}
          >
            <div className="day__picker--display-weekday">{WEEKDAYS_SHORT[weekday]}</div>
            <div className="day__picker--display-day">{day}</div>
            <div className="day__picker--display-month">{MONTHS_SHORT[month]}</div>
          </button>
        </div>
        {
          isRange && (
            <div className="day__picker--display-date">
              <button className="day__picker--display-year" onClick={onYear}>{y}</button>
              <button
                className={`day__picker--display-current ${classes[1]}`}
                onClick={() => {
                  onDate(1)
                }}
              >
                <div className="day__picker--display-weekday">{WEEKDAYS_SHORT[w]}</div>
                <div className="day__picker--display-day">{d}</div>
                <div className="day__picker--display-month">{MONTHS_SHORT[m]}</div>
              </button>
            </div>
          )
        }
      </div>
      <div className="day__picker--display-reset">
        <button className="" onClick={onReset}>Today</button>
      </div>
    </div>
  );
};

DisplayDay.defaultProps = {
  ...getDateParams(),
  editRange: 0,
  onYear: () => {},
  onDate: () => {},
  onReset: () => {},
};

DisplayDay.propTypes = {
  month: PropTypes.number,
  year: PropTypes.number,
  day: PropTypes.number,
  weekday: PropTypes.number,
  editRange: PropTypes.number,
  onYear: PropTypes.func,
  onDate: PropTypes.func,
  onReset: PropTypes.func,
};

export default DisplayDay;
