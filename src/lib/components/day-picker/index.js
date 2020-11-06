import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import Display from './display';
import Calendar from './calendar';
import { getDateParams } from './utils';

const DayPicker = ({
  value,
  initial,
}) => {
  const todayDate = useRef(getDateParams()).current;
  const [selectedDate, setSelectedDate] = useState(value);
  const {
    month,
    year,
    day,
    weekday,
  } = getDateParams(selectedDate);
  return (
    <div className="day__picker">
      <div className="day__picker--main">
        <Display month={month} year={year} day={day} weekday={weekday} />
        <div className="day__picker--wrapper">
          <Calendar today={todayDate} initial={initial} setSelectedDate={setSelectedDate} />
        </div>
      </div>
    </div>
  )
}

DayPicker.defaultProps = {
  value: new Date(),
  initial: new Date(),
  // initial: new Date(2020, 1, 25),
};

DayPicker.propTypes = {
  value: PropTypes.instanceOf(Date),
  initial: PropTypes.instanceOf(Date),
};


export default DayPicker;
