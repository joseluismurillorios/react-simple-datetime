import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import Display from './display';
import Calendar from './calendar';
import { getDateParams } from './utils';
import { EDIT_DAY, EDIT_MONTH, EDIT_YEAR } from './constants';
import Controls from './controls';

const sortArray = (arr) => [...arr].sort((a, b) => a.getTime() - b.getTime());

const DayPicker = ({
  id,
  value,
  markedDates,
  onChange,
  onCancel,
  onConfirm,
  controls,
  live,
}) => {
  const isRange = Array.isArray(value);
  const todayDate = useRef(getDateParams()).current;
  const [selectedDate, setSelectedDate] = useState(isRange ? sortArray(value) : value);
  const [edit, setEdit] = useState(EDIT_DAY);
  const [editRange, setEditRange] = useState(0);
  const onChangeRef = useRef(onChange);
  const {
    month,
    year,
    day,
    weekday,
  } = getDateParams(isRange ? selectedDate[editRange] : selectedDate);

  const onFinish = () => {
    onConfirm({
      name: id,
      value: selectedDate,
    });
  }

  const onReset = () => {
    const newValue = new Date(todayDate.year, todayDate.month, todayDate.day, 0, 0);
    const val = isRange ? [newValue, newValue] : newValue;
    setSelectedDate(val);
    setEditRange(1);
  };

  const onDay = (e) => {
    if (isRange) {
      const [a] = selectedDate;
      const val = sortArray(editRange === 0 ? [e, e] : [a, e]);
      setSelectedDate(val);
      setEditRange(editRange === 0 ? 1 : 0);
    } else {
      setSelectedDate(e);
    }
  };

  useEffect(() => {
    onChangeRef.current(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  return (
    <div id={id} className="day__picker">
      <div className="day__picker--main">
        <Display
          value={selectedDate}
          month={month}
          year={year}
          day={day}
          weekday={weekday}
          editRange={editRange}
          onYear={() => {
            setEdit(EDIT_YEAR)
          }}
          onDate={(e) => {
            setEdit(EDIT_DAY)
            setEditRange(e);
          }}
          onReset={onReset}
        />
        <div className="day__picker--wrapper">
          <Calendar
            value={selectedDate}
            today={todayDate}
            onDayClick={onDay}
            markedDates={markedDates}
            edit={edit}
            editRange={editRange}
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
  id: '',
  value: new Date(),
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
  value: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  ]),
  onChange: PropTypes.func,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  markedDates: PropTypes.objectOf(PropTypes.any),
  controls: PropTypes.bool,
  live: PropTypes.bool,
};

export default DayPicker;
