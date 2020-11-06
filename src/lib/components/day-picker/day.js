import React from 'react'
import PropTypes from 'prop-types'

const Day = ({
  className,
  day,
  today,
  year,
  month,
  selected,
  onClick,
}) => {
  const datestring = `${year}-${month}-${day}`;
  const active = today.formatted === datestring;
  const current = selected === datestring;
  const activeClass = active ? 'today' : '';
  const currentClass = current ? 'selected' : '';
  const onTap = () => {
    onClick(new Date(year, month, day, 0, 0));
  };
  return (
    <button
      className={`day__picker--calendar-day ${activeClass} ${currentClass} ${className}`}
      onClick={onTap}
    >
      {day}
    </button>
  )
};

Day.defaultProps = {
  className: '',
  day: undefined,
  today: {},
  year: undefined,
  month: undefined,
};

Day.propTypes = {
  className: PropTypes.string,
  day: PropTypes.number,
  today: PropTypes.objectOf(PropTypes.any),
  year: PropTypes.number,
  month: PropTypes.number,
};

export default Day
