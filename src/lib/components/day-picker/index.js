import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import Display from './display';
import Calendar from './calendar';
import { getDateParams } from './utils';

const DayPicker = ({
  value,
  initialDate,
  markedDates,
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
            initialDate={initialDate}
            onDayClick={setSelectedDate}
            markedDates={markedDates}
          />
        </div>
      </div>
    </div>
  );
};

DayPicker.defaultProps = {
  // value: new Date(),
  value: new Date(2020, 10, 26),
  initialDate: new Date(),
  onChange: () => {},
  markedDates: {
    '2020-10-31': true,
    '2020-10-09': true,
    '2020-09-30': true,
  },
};

DayPicker.propTypes = {
  value: PropTypes.instanceOf(Date),
  initialDate: PropTypes.instanceOf(Date),
  onChange: PropTypes.func,
  markedDates: PropTypes.objectOf(PropTypes.any),
};

export default DayPicker;
