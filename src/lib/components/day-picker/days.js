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
  markedDates,
  onDayClick,
}) => {
  const {
    monthDaysArray,
    nextDaysArray,
    prevDaysArray,
  } = getMonthInfo(active);
  const {
    formatted,
  } = getDateParams(value);
  return (
    <div className="day__picker--calendar-days">
      {
        prevDaysArray.map((day) => (
          <Day
            key={`prevday-${day}`}
            className="prev-day"
            day={day}
            today={today}
            month={month === 0 ? 11 : month - 1}
            year={month === 0 ? year - 1 : year}
            selected={formatted}
            markedDates={markedDates}
            onClick={onDayClick}
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
            markedDates={markedDates}
            onClick={onDayClick}
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
            month={month === 11 ? 0 : month + 1}
            year={month === 11 ? year + 1 : year}
            selected={formatted}
            markedDates={markedDates}
            onClick={onDayClick}
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
  onDayClick: () => {},
}

Days.propTypes = {
  value: PropTypes.instanceOf(Date),
  today: PropTypes.objectOf(PropTypes.any),
  active: PropTypes.instanceOf(Date),
  onDayClick: PropTypes.func,
}

export default Days
