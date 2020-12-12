import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import Display from './display';
import Calendar from './calendar';
import { getDateParams } from './utils';
import { EDIT_DAY, EDIT_MONTH, EDIT_YEAR } from './constants';
import Controls from './controls';

const DayPicker = ({
  id,
  value,
  initialDate,
  markedDates,
  onChange,
  onCancel,
  onConfirm,
  controls,
  live,
}) => {
  const todayDate = useRef(getDateParams()).current;
  const [selectedDate, setSelectedDate] = useState(value);
  const [edit, setEdit] = useState(EDIT_DAY);
  const onChangeRef = useRef(onChange);
  const {
    month,
    year,
    day,
    weekday,
  } = getDateParams(selectedDate);

  const onFinish = () => {
    console.log('onFinish', selectedDate.toLocaleDateString());
    onConfirm({
      name: id,
      value: selectedDate,
    });
  }

  useEffect(() => {
    console.log('onChange', selectedDate);
    onChangeRef.current(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  return (
    <div id={id} className="day__picker">
      <div className="day__picker--main">
        <Display
          month={month}
          year={year}
          day={day}
          weekday={weekday}
          onYear={() => {
            setEdit(EDIT_YEAR)
          }}
          onDate={() => {
            setEdit(EDIT_DAY)
          }}
        />
        <div className="day__picker--wrapper">
          <Calendar
            value={selectedDate}
            today={todayDate}
            initialDate={initialDate}
            onDayClick={setSelectedDate}
            markedDates={markedDates}
            edit={edit}
            onMonth={() => {
              setEdit(EDIT_MONTH)
            }}
            onDate={() => {
              setEdit(EDIT_DAY)
            }}
            onYear={() => {
              setEdit(EDIT_YEAR)
            }}
            live={live}
          />
        </div>
      </div>
      {
        controls && (
          <Controls
            onConfirm={onFinish}
            onCancel={onCancel}
          />
        )
      }
    </div>
  );
};

DayPicker.defaultProps = {
  // value: new Date(),
  id: '',
  value: new Date(2020, 10, 26),
  initialDate: new Date(),
  onChange: () => {},
  onCancel: () => {},
  onConfirm: () => {},
  markedDates: {
    '2020-10-25': true,
    '2020-10-09': true,
    '2020-09-30': true,
  },
  controls: false,
  live: false,
};

DayPicker.propTypes = {
  id: PropTypes.string,
  value: PropTypes.instanceOf(Date),
  initialDate: PropTypes.instanceOf(Date),
  onChange: PropTypes.func,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  markedDates: PropTypes.objectOf(PropTypes.any),
  controls: PropTypes.bool,
  live: PropTypes.bool,
};

export default DayPicker;
