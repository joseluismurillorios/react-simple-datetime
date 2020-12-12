import React from 'react'
import PropTypes from 'prop-types'

const Day = ({
  className,
  day,
  today,
  year,
  month,
  selected,
  active,
  markedDates,
  onClick,
}) => {
  const currDay = day && `${day + 100}`.substring(1);
  const currMonth = month && `${month + 100}`.substring(1);
  const datestring = `${year}-${month}-${day}`;
  const formattedstring = `${year}-${currMonth}-${currDay}`;
  const now = today.formatted === datestring;
  // const current = selected === datestring;
  const nowClass = now ? 'today' : '';
  const currentClass = selected ? 'selected' : '';
  const activeClass = active ? 'active' : '';
  const onTap = () => {
    onClick(year, month, day);
  };
  const marked = markedDates[formattedstring];
  return (
    <button
      className={`day__picker--calendar-day ${nowClass} ${currentClass} ${activeClass} ${className}`}
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
  onClick: () => {},
};

Day.propTypes = {
  className: PropTypes.string,
  day: PropTypes.number,
  today: PropTypes.objectOf(PropTypes.any),
  year: PropTypes.number,
  month: PropTypes.number,
  markedDates: PropTypes.objectOf(PropTypes.any),
  onClick: PropTypes.func,
};

export default Day
