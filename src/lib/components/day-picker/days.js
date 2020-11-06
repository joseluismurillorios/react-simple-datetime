import React from 'react'
import PropTypes from 'prop-types'
import { getDateParams, getMonthInfo } from './utils';
import Day from './day';

const Days = ({
  value,
  today,
  active,
  year,
  month,
}) => {
  const {
    monthDaysArray,
    nextDaysArray,
    prevDaysArray,
  } = getMonthInfo(active);
  const {
    formatted,
  } = getDateParams(value);
  // const month = active.getMonth();
  // const year = active.getFullYear();
  return (
    <div className="day__picker--calendar-days">
      {
        prevDaysArray.map((day) => (
          <Day
            key={`prevday-${day}`}
            className="prev-day"
            day={day}
            today={today}
            // month={(month - 1) % 12}
            // year={year}
          />
        ))
      }
      {
        monthDaysArray.map((day) => (
          <Day
            key={`day-${day}`}
            day={day}
            today={today}
            month={month}
            year={year}
            selected={formatted}
          />
        ))
      }
      {
        nextDaysArray.map((day) => (
          <Day
            key={`nextday-${day}`}
            className="next-day"
            day={day}
            today={today}
            // month={(month + 1) % 12}
            // year={year}
          />
        ))
      }
    </div>
  )
}

Days.propTypes = {
  value: undefined,
  today: getMonthInfo(),
  active: new Date(),
}

Days.propTypes = {
  value: PropTypes.instanceOf(Date),
  today: PropTypes.objectOf(PropTypes.any),
  active: PropTypes.instanceOf(Date),
}

export default Days
