import React from 'react'
import PropTypes from 'prop-types'

const Day = ({
  className,
  day,
  today,
  year,
  month,
  selected,
}) => {
  const active = today.formatted === `${year}-${month}-${day}`;
  const current = selected === `${year}-${month}-${day}`;
  const activeClass = active ? 'today' : '';
  const currentClass = current ? 'selected' : '';
  return (
    <div className={`day__picker--calendar-day ${activeClass} ${currentClass} ${className}`}>{day}</div>
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
