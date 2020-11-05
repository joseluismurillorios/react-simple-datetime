import React from 'react'
import PropTypes from 'prop-types'
import { getMonthInfo } from './utils';
import Day from './day';

const Days = ({
  todayDate,
  selected,
}) => {
  const {
    monthDaysArray,
    nextDaysArray,
    prevDaysArray,
  } = getMonthInfo(selected);
  return (
    <div className="day__picker--calendar-days">
      {
        prevDaysArray.map((day) => (
          <Day key={`prevday-${day}`} className="prev-day" day={day} today={todayDate} />
        ))
      }
      {
        monthDaysArray.map((day) => (
          <Day key={`day-${day}`} day={day} today={todayDate} />
        ))
      }
      {
        nextDaysArray.map((day) => (
          <Day key={`nextday-${day}`} className="next-day" day={day} today={todayDate} />
        ))
      }
    </div>
  )
}

Days.propTypes = {
  todayDate: getMonthInfo(),
  selected: new Date(),
}

Days.propTypes = {
  todayDate: PropTypes.objectOf(PropTypes.any),
  selected: PropTypes.instanceOf(Date),
}

export default Days
