import React from 'react'
import PropTypes from 'prop-types'

const Day = ({
  className,
  day,
  today,
  year,
  month,
  selected,
  markedDates,
  onClick,
}) => {
  const currDay = day && `${day + 100}`.substring(1);
  const currMonth = month && `${month + 100}`.substring(1);
  const datestring = `${year}-${month}-${day}`;
  const formattedstring = `${year}-${currMonth}-${currDay}`;
  const active = today.formatted === datestring;
  const current = selected === datestring;
  const activeClass = active ? 'today' : '';
  const currentClass = current ? 'selected' : '';
  const onTap = () => {
    onClick(new Date(year, month, day, 0, 0));
  };
  const marked = markedDates[formattedstring];
  return (
    <button
      className={`day__picker--calendar-day ${activeClass} ${currentClass} ${className}`}
      onClick={onTap}
      data-key={datestring}
    >
      <span>{day}</span>
      <span className="day__picker--calendar-dots">
        {
          marked && (
            <span className={`day__picker--calendar-dot ${currentClass}`} />
          )
        }
      </span>
    </button>
  )
};

Day.defaultProps = {
  className: '',
  day: undefined,
  today: {},
  year: undefined,
  month: undefined,
  markedDates: {},
};

Day.propTypes = {
  className: PropTypes.string,
  day: PropTypes.number,
  today: PropTypes.objectOf(PropTypes.any),
  year: PropTypes.number,
  month: PropTypes.number,
  markedDates: PropTypes.objectOf(PropTypes.any),
};

export default Day
