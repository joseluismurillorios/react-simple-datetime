import React from 'react'
import PropTypes from 'prop-types'
import { getMonthInfo } from './utils';
import Day from './day';

const Days = ({
  today,
  selected,
}) => {
  const {
    monthDaysArray,
    nextDaysArray,
    prevDaysArray,
  } = getMonthInfo(selected);
  console.log({ selected });
  // const month = selected.getMonth();
  // const year = selected.getFullYear();
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
            // month={month}
            // year={year}
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
  today: getMonthInfo(),
  selected: new Date(),
}

Days.propTypes = {
  today: PropTypes.objectOf(PropTypes.any),
  selected: PropTypes.instanceOf(Date),
}

export default Days
