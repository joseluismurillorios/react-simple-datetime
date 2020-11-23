import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { getDateParams, MONTHS_LONG, MONTHS_SHORT } from './utils';
import Days from './days';
import Weekdays from './weekdays';
import { CSSTransition } from 'react-transition-group';
import { EDIT_DAY, EDIT_MONTH, FADE_MILLI } from './constants';

const Calendar = ({
  value,
  edit,
  initialDate,
  today,
  markedDates,
  onDayClick,
  onMonth,
  onDate,
}) => {
  const daysTransRef = useRef(null);
  const monthsTransRef = useRef(null);
  const [active, setActive] = useState(new Date(initialDate.setDate(1)));

  const month = active.getMonth();
  const year = active.getFullYear();

  const onDayClicked = (y, m, d) => {
    const newValue = new Date(y, m, d, 0, 0);
    onDayClick(newValue);
    // if (m !== month || y !== year) {
    //   console.log({ m, month, y, year });
    //   setActive(new Date(y, m, 1, 0, 0));
    // }
  };

  const onMonthClicked = (m) => {
    const newValue = new Date(year, m, 1, 0, 0);
    setActive(newValue);
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
              <button onClick={onMonth} className="day__picker--calendar-current">
                {`${MONTHS_LONG[month]} ${year}`}
              </button>
              <button className="day__picker--calendar-next" onClick={onNext}>
                <i className="day__picker--calendar-control control-next" />
              </button>
            </div>
            <div className="day__picker--calendar-weeks">
              <Weekdays />
              <Days
                value={value}
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
            {
              MONTHS_SHORT.map((month, i) => (
                <button
                  key={`month-${month}`}
                  className="day__picker--months-card"
                  onClick={() => { onMonthClicked(i); }}
                >
                  <div className="day__picker--months-month">{month}</div>
                </button>
              ))
            }
          </div>
        </div>
      </CSSTransition>
    </>
  )
};

Calendar.defaultProps = {
  value: new Date(),
  initialDate: new Date(),
  today: undefined,
  onDayClick: () => {},
  onMonth: () => {},
  onDate: () => {},
  edit: EDIT_DAY,
};

Calendar.propTypes = {
  value: PropTypes.instanceOf(Date),
  initialDate: PropTypes.instanceOf(Date),
  today: PropTypes.objectOf(PropTypes.any),
  onDayClick: PropTypes.func,
  onMonth: PropTypes.func,
  onDate: PropTypes.func,
  edit: PropTypes.string,
};

export default Calendar;
