import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { getDateParams, MONTHS_LONG, MONTHS_SHORT } from './utils';
import Days from './days';
import Weekdays from './weekdays';
import { CSSTransition } from 'react-transition-group';
import { EDIT_DAY, EDIT_MONTH, EDIT_YEAR, FADE_MILLI } from './constants';
import Year from './year';

const getDateValue = (isRange, value, editRange) => new Date(isRange ? value[editRange] : value);

const Calendar = ({
  value,
  edit,
  editRange,
  today,
  markedDates,
  onDayClick,
  onMonth,
  onDate,
  onYear,
  live,
}) => {
  const isRange = Array.isArray(value);
  const daysTransRef = useRef(null);
  const monthsTransRef = useRef(null);
  const yearsTransRef = useRef(null);
  const [active, setActive] = useState(new Date(getDateValue(isRange, value, editRange).setDate(1)));

  const month = active.getMonth();
  const year = active.getFullYear();

  const onDayClicked = (y, m, d) => {
    const newValue = new Date(y, m, d, 0, 0);
    onDayClick(newValue);
  };

  const onLive = (y, month) => {
    if (live) {
      const date = getDateValue(isRange, value, editRange);
      const day = date.getDate();
      onDayClick(new Date(y, month, day, 0, 0));
    }
  };

  const onMonthClicked = (m) => {
    // const newValue = new Date(year, m, 1, 0, 0);
    setActive(new Date(year, m, 1, 0, 0));
    onLive(year, m);
    onDate();
  };

  const onYearClicked = (y) => {
    // const newValue = new Date(y, month, 1, 0, 0);
    setActive(new Date(y, month, 1, 0, 0));
    onLive(y, month);
    onDate();
  };

  const onNext = () => {
    const {
      month,
      year,
    } = getDateParams(active);
    setActive(new Date(year, month + 1, 1, 0, 0));
  };

  const onPrev = () => {
    const {
      month,
      year,
    } = getDateParams(active);
    setActive(new Date(year, month - 1, 1, 0, 0));
  };

  useEffect(() => {
    if (live) {
      setActive(new Date(getDateValue(isRange, value, 1).setDate(1)));
    }
  }, [value, isRange, editRange, live]);

  return (
    <>
      <CSSTransition
        nodeRef={daysTransRef}
        in={edit === EDIT_DAY}
        timeout={FADE_MILLI}
        classNames="transition-fade"
        unmountOnExit
        mountOnEnter
      >
        <div className="day__picker--transition" ref={daysTransRef}>
          <div className={`day__picker--calendar ${edit === EDIT_DAY ? 'active' : ''}`}>
            <div className="day__picker--calendar-header">
              <button className="day__picker--calendar-prev" onClick={onPrev}>
                <i className="day__picker--calendar-control control-prev" />
              </button>
              {/* <button onClick={onMonth} className="day__picker--calendar-current">
                {`${MONTHS_LONG[month]} ${year}`}
              </button> */}
              <div className="day__picker--calendar-current">
                <button type="button" onClick={onMonth}>
                  {MONTHS_LONG[month]}
                </button>
                <button type="button" onClick={onYear}>
                  {year}
                </button>                
              </div>
              <button className="day__picker--calendar-next" onClick={onNext}>
                <i className="day__picker--calendar-control control-next" />
              </button>
            </div>
            <div className="day__picker--calendar-weeks">
              <Weekdays />
              <Days
                value={value}
                editRange={editRange}
                today={today}
                active={active}
                year={year}
                month={month}
                markedDates={markedDates}
                onDayClick={onDayClicked}
              />
            </div>
          </div>
        </div>
      </CSSTransition>
      <CSSTransition
        nodeRef={monthsTransRef}
        in={edit === EDIT_MONTH}
        timeout={FADE_MILLI}
        classNames="transition-fade"
        unmountOnExit
        mountOnEnter
      >
        <div className="day__picker--transition" ref={monthsTransRef}>
          <div className={`day__picker--months ${edit === EDIT_MONTH ? 'active' : ''}`}>
            <div className="day__picker--months-header">
              <button className="day__picker--months-prev" onClick={onPrev}>
                <i className="day__picker--months-control control-prev" />
              </button>
              <button onClick={onDate} className="day__picker--months-current">
                {MONTHS_LONG[month]}
              </button>
              <button className="day__picker--months-next" onClick={onNext}>
                <i className="day__picker--months-control control-next" />
              </button>
            </div>
            <div className="day__picker--months-list">
              {
                MONTHS_SHORT.map((m, i) => (
                  <button
                    key={`month-${m}`}
                    className={`day__picker--months-card ${month === i ? 'active' : ''}`}
                    onClick={() => { onMonthClicked(i); }}
                  >
                    <div className="day__picker--months-month">{m}</div>
                  </button>
                ))
              }
            </div>
          </div>
        </div>
      </CSSTransition>
      <CSSTransition
        nodeRef={yearsTransRef}
        in={edit === EDIT_YEAR}
        timeout={FADE_MILLI}
        classNames="transition-fade"
        unmountOnExit
        mountOnEnter
      >
        <div className="day__picker--transition" ref={yearsTransRef}>
          <Year
            year={year}
            active={edit === EDIT_YEAR}
            onDate={onDate}
            onYearClicked={onYearClicked}
          />
        </div>
      </CSSTransition>
    </>
  )
};

Calendar.defaultProps = {
  value: new Date(),
  today: undefined,
  onDayClick: () => {},
  onMonth: () => {},
  onDate: () => {},
  onYear: () => {},
  edit: EDIT_DAY,
  live: false,
};

Calendar.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.instanceOf(Date)),
    PropTypes.instanceOf(Date),
  ]),
  today: PropTypes.objectOf(PropTypes.any),
  onDayClick: PropTypes.func,
  onMonth: PropTypes.func,
  onDate: PropTypes.func,
  onYear: PropTypes.func,
  edit: PropTypes.string,
  live: PropTypes.bool,
};

export default Calendar;
