import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { getDateParams, MONTHS_LONG } from './utils';
import Days from './days';
import Weekdays from './weekdays';

const Calendar = ({
  value,
  initial,
  today,
}) => {
  const [selected, setSelected] = useState(new Date(initial.setDate(1)));

  const onNext = () => {
    const {
      month,
      year,
    } = getDateParams(selected);
    setSelected(new Date(year, month + 1, 1, 0, 0));
  };

  const onPrev = () => {
    const {
      month,
      year,
    } = getDateParams(selected);
    setSelected(new Date(year, month - 1, 1, 0, 0));
  };

  const month = selected.getMonth();
  const year = selected.getFullYear();
  return (
    <div className="day__picker--calendar">
      <div className="day__picker--calendar-header">
        <button className="day__picker--calendar-prev" onClick={onPrev}>
          <i className="day__picker--calendar-control control-prev" />
        </button>
        <button className="day__picker--calendar-current">
          {`${MONTHS_LONG[month]} ${year}`}
        </button>
        <button className="day__picker--calendar-next" onClick={onNext}>
          <i className="day__picker--calendar-control control-next" />
        </button>
      </div>
      <div className="day__picker--calendar-weeks">
        <Weekdays />
        <Days today={today} selected={selected} year={year} month={month} />
      </div>
    </div>
  )
};

Calendar.defaultProps = {
  value: new Date(),
  // initial: new Date(2020, 1, 25),
  initial: new Date(),
  today: undefined,
};

Calendar.propTypes = {
  value: PropTypes.instanceOf(Date),
  initial: PropTypes.instanceOf(Date),
  today: PropTypes.objectOf(PropTypes.any),
};

export default Calendar;
