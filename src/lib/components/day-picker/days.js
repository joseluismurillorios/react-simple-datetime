import React from 'react'
import PropTypes from 'prop-types'
import { getMonthInfo } from './utils';
import Day from './day';

const isInRange = (values, date) => {
  var from = values[0].getTime();
  var to = values[1].getTime();
  return date >= from && date <= to;
}

const Days = ({
  value,
  today,
  active,
  year,
  month,
  markedDates,
  onDayClick,
}) => {
  const isRange = Array.isArray(value);
  const {
    monthDaysArray,
    nextDaysArray,
    prevDaysArray,
  } = getMonthInfo(active);
  return (
    <div className="day__picker--calendar-days">
      {
        prevDaysArray.map((day) => {
          const m = month === 0 ? 11 : month - 1;
          const y = month === 0 ? year - 1 : year;
          const curDate = new Date(y, m, day, 0, 0);
          const datestring = curDate.toDateString();
          let selected = false;
          if (isRange) {
            selected = datestring === value[0].toDateString() || datestring === value[1].toDateString();
          } else {
            selected = datestring === value.toDateString();
          }
          return (
            <Day
              key={`prevday-${day}`}
              className="prev-day"
              day={day}
              today={today}
              month={m}
              year={y}
              selected={selected}
              active={isRange && isInRange(value, curDate)}
              markedDates={markedDates}
              onClick={onDayClick}
            />
          );
        })
      }
      {
        monthDaysArray.map((day) => {
          const curDate = new Date(year, month, day, 0, 0);
          const datestring = curDate.toDateString();
          let selected = false;
          if (isRange) {
            selected = datestring === value[0].toDateString() || datestring === value[1].toDateString();
          } else {
            selected = datestring === value.toDateString();
          }
          return (
            <Day
              key={`day-${day}`}
              day={day}
              today={today}
              month={month}
              year={year}
              selected={selected}
              active={isRange && isInRange(value, curDate)}
              markedDates={markedDates}
              onClick={onDayClick}
            />
          );
        })
      }
      {
        nextDaysArray.map((day) => {
          const m = month === 11 ? 0 : month + 1;
          const y = month === 11 ? year + 1 : year;
          const curDate = new Date(y, m, day, 0, 0);
          const datestring = curDate.toDateString();
          let selected = false;
          if (isRange) {
            selected = datestring === value[0].toDateString() || datestring === value[1].toDateString();
          } else {
            selected = datestring === value.toDateString();
          }
          return (
            <Day
              key={`nextday-${day}`}
              className="next-day"
              day={day}
              today={today}
              month={m}
              year={y}
              selected={selected}
              active={isRange && isInRange(value, curDate)}
              markedDates={markedDates}
              onClick={onDayClick}
            />
          );
        })
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
  value: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.instanceOf(Date)),
    PropTypes.instanceOf(Date),
  ]),
  today: PropTypes.objectOf(PropTypes.any),
  active: PropTypes.instanceOf(Date),
  onDayClick: PropTypes.func,
}

export default Days
