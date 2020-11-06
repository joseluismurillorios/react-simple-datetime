import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import Display from './display';
import Calendar from './calendar';
import { getDateParams } from './utils';

const DayPicker = ({
  value,
  initial,
  onChange,
}) => {
  const todayDate = useRef(getDateParams()).current;
  const [selectedDate, setSelectedDate] = useState(value);
  const onChangeRef = useRef(onChange);
  const {
    month,
    year,
    day,
    weekday,
  } = getDateParams(selectedDate);
  useEffect(() => {
    console.log('onChange', selectedDate);
    onChangeRef.current(selectedDate);
  }, [selectedDate]);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);
  return (
    <div className="day__picker">
      <div className="day__picker--main">
        <Display month={month} year={year} day={day} weekday={weekday} />
        <div className="day__picker--wrapper">
          <Calendar
            value={selectedDate}
            today={todayDate}
            initial={initial}
            onDayClick={setSelectedDate}
          />
        </div>
      </div>
    </div>
  );
};

DayPicker.defaultProps = {
  // value: new Date(),
  value: new Date(2020, 10, 25),
  initial: new Date(),
  onChange: () => {},
};

DayPicker.propTypes = {
  value: PropTypes.instanceOf(Date),
  initial: PropTypes.instanceOf(Date),
  onChange: PropTypes.func,
};

export default DayPicker;
