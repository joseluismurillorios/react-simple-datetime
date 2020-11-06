import React from 'react'
import PropTypes from 'prop-types'

const Day = ({
  className,
  day,
  today,
  year,
  month,
}) => {
  // console.log({
  //   year,
  //   month,
  // });
  // console.log({ today });
  const selected = today.formatted === `${year}-${month}-${day}`;
  const activeClass = selected ? 'today' : '';
  return (
    <div className={`day__picker--calendar-day ${activeClass} ${className}`}>{day}</div>
  )
};

Day.defaultProps = {
  className: '',
};

Day.propTypes = {
  className: PropTypes.string,
};

export default Day
