import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { getDateParams, getMonthInfo, MONTHS_LONG } from './utils';
import Day from './day';
import Days from './days';
import Weekdays from './weekdays';

const Calendar = ({
  value,
  initial,
}) => {
  const todayDate = useRef(getDateParams()).current;
  const selectedDate = new Date(initial.setDate(1));
  const [month, setMonth] = useState(selectedDate.getMonth());
  const [year, setYear] = useState(selectedDate.getFullYear());
  const {
    lastDay,
    prevLastDay,
    firstDayIndex,
    lastDayIndex,
    nextDays,
    prevDays,
    monthDaysArray,
    nextDaysArray,
    prevDaysArray,
  } = getMonthInfo(selectedDate);
  console.log({ value });
  console.log({ todayDate });
  console.log({ month, year });
  console.log({
    lastDay,
    prevLastDay,
    firstDayIndex,
    lastDayIndex,
    nextDays,
    prevDays,
    monthDaysArray,
    nextDaysArray,
    prevDaysArray,
  });
  return (
    <div className="day__picker--calendar">
      <div className="day__picker--calendar-header">
        <button className="day__picker--calendar-prev">
          <i className="day__picker--calendar-control control-prev" />
        </button>
        <button className="day__picker--calendar-current">
          {`${MONTHS_LONG[month]} ${year}`}
        </button>
        <button className="day__picker--calendar-next">
          <i className="day__picker--calendar-control control-next" />
        </button>
      </div>
      <div className="day__picker--calendar-weeks">
        <Weekdays />
        <Days todayDate={todayDate} selectedDate={selectedDate} />
      </div>
    </div>
  )
};

Calendar.defaultProps = {
  value: new Date(),
  // initial: new Date(2020, 1, 25),
  initial: new Date(),
};

Calendar.propTypes = {
  value: PropTypes.instanceOf(Date),
  initial: PropTypes.instanceOf(Date),
};

export default Calendar;
