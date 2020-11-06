import React from 'react'
import PropTypes from 'prop-types'

const Day = ({
  className,
  day,
  today,
}) => {
  // console.log({ today });
  return (
    <div className={`day__picker--calendar-day ${className}`}>{day}</div>
  )
};

Day.defaultProps = {
  className: '',
};

Day.propTypes = {
  className: PropTypes.string,
};

export default Day
