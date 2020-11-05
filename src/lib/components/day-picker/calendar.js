import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { getDateParams, MONTHS_LONG } from './utils';
import Days from './days';
import Weekdays from './weekdays';

const Calendar = ({
  value,
  initial,
}) => {
  const todayDate = useRef(getDateParams()).current;
  const [selected, setSelected] = useState(new Date(initial.setDate(1)));
  const [month, setMonth] = useState(selected.getMonth());
  const [year, setYear] = useState(selected.getFullYear());
  useEffect(() => {
    setSelected(new Date(year, month, 1, 0, 0));
  }, [year, month])
  return (
    <div className="day__picker--calendar">
      <div className="day__picker--calendar-header">
        <button className="day__picker--calendar-prev" onClick={() => { setMonth(month - 1) }}>
          <i className="day__picker--calendar-control control-prev" />
        </button>
        <button className="day__picker--calendar-current">
          {`${MONTHS_LONG[month]} ${year}`}
        </button>
        <button className="day__picker--calendar-next" onClick={() => { setMonth(month + 1) }}>
          <i className="day__picker--calendar-control control-next" />
        </button>
      </div>
      <div className="day__picker--calendar-weeks">
        <Weekdays />
        <Days todayDate={todayDate} selected={selected} />
      </div>
    </div>
  )
};

Calendar.defaultProps = {
  value: new Date(),
  // initial: new Date(2020, 1, 25),
  initial: new Date(),
};

Calendar.propTypes = {
  value: PropTypes.instanceOf(Date),
  initial: PropTypes.instanceOf(Date),
};

export default Calendar;
