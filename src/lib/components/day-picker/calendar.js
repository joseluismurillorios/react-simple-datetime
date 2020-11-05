import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

// const parseInitial = (initial = new Date()) => {
//   const date = new Date(initial.setDate(1));
//   return {
//     year: date.getFullYear(),
//     month: date.getMonth(),
//     day: date.getDate(),
//     date,
//   };
// };

const MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTHS_LONG = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const getDateParams = (date = new Date()) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return {
    year,
    month,
    day,
    formatted: `${year}-${month}-${day}`,
  };
};

const getMonthInfo = (date = new Date()) => {
  const firstDayIndex = date.getDay();
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
  const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
  const nextDays = 7 - lastDayIndex - 1;
  const prevDays = 7 - firstDayIndex;
  const monthDaysArray = Array.from({ length: lastDay }, (_, i) => i + 1);
  const prevDaysArray = Array.from({ length: prevDays }, (_, i) => prevLastDay - i).reverse();
  const nextDaysArray = Array.from({ length: 42 - prevDaysArray.length - monthDaysArray.length }, (_, i) => i + 1);
  return {
    lastDay,
    prevLastDay,
    firstDayIndex,
    lastDayIndex,
    nextDays,
    prevDays,
    monthDaysArray,
    nextDaysArray,
    prevDaysArray,
  }
}

const Calendar = ({
  value,
  initial,
}) => {
  const currentDate = useRef(getDateParams()).current;
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
        <div className="day__picker--calendar-weekdays">
          <div className="day__picker--calendar-weekday">Su</div>
          <div className="day__picker--calendar-weekday">Mo</div>
          <div className="day__picker--calendar-weekday">Tu</div>
          <div className="day__picker--calendar-weekday">We</div>
          <div className="day__picker--calendar-weekday">Th</div>
          <div className="day__picker--calendar-weekday">Fr</div>
          <div className="day__picker--calendar-weekday">Sa</div>
        </div>
        <div className="day__picker--calendar-days">
          {
            prevDaysArray.map((day) => (
              <div key={`prevday-${day}`} className="day__picker--calendar-day prev-day">{day}</div>
            ))
          }
          {
            monthDaysArray.map((day) => (
              <div key={`day-${day}`} className="day__picker--calendar-day">{day}</div>
            ))
          }
          {
            nextDaysArray.map((day) => (
              <div key={`nextday-${day}`} className="day__picker--calendar-day next-day">{day}</div>
            ))
          }
        </div>
      </div>
    </div>
  )
};

Calendar.defaultProps = {
  value: new Date(),
  initial: new Date(2020, 1, 25),
};

Calendar.propTypes = {
  value: PropTypes.instanceOf(Date),
  initial: PropTypes.instanceOf(Date),
};

export default Calendar;
