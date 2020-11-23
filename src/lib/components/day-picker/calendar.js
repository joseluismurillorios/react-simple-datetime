import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { getDateParams, MONTHS_LONG } from './utils';
import Days from './days';
import Weekdays from './weekdays';

const Calendar = ({
  value,
  initialDate,
  today,
  markedDates,
  onDayClick,
}) => {
  const [active, setActive] = useState(new Date(initialDate.setDate(1)));

  const month = active.getMonth();
  const year = active.getFullYear();

  const onDayClicked = (y, m, d) => {
    const newValue = new Date(y, m, d, 0, 0);
    onDayClick(newValue);
    // if (m !== month || y !== year) {
    //   console.log({ m, month, y, year });
    //   setActive(new Date(y, m, 1, 0, 0));
    // }
  };

  const onNext = () => {
    const {
      month,
      year,
    } = getDateParams(active);
    setActive(new Date(year, month + 1, 1, 0, 0));
  };

  const onPrev = () => {
    const {
      month,
      year,
    } = getDateParams(active);
    setActive(new Date(year, month - 1, 1, 0, 0));
  };
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
        <Days
          value={value}
          today={today}
          active={active}
          year={year}
          month={month}
          markedDates={markedDates}
          onDayClick={onDayClicked}
        />
      </div>
    </div>
  )
};

Calendar.defaultProps = {
  value: new Date(),
  // initial: new Date(2020, 1, 25),
  initialDate: new Date(),
  today: undefined,
  onDayClick: () => {},
};

Calendar.propTypes = {
  value: PropTypes.instanceOf(Date),
  initialDate: PropTypes.instanceOf(Date),
  today: PropTypes.objectOf(PropTypes.any),
  onDayClick: PropTypes.func,
};

export default Calendar;
