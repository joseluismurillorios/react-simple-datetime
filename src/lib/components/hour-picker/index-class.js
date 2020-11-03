import React from 'react';
import PropTypes from 'prop-types';

import Controls from './controls';
import Display from './display';
import Nums from './nums';
import Selector from './selector';

import { timeToDeg, getRotation } from './utils';
import { DIVISIONS, EDIT_HOURS, RADIUS } from './constants';

import './style.scss';
import Hour from './hour';
// import './theme.scss';

// const num = 12;
// const radius = 120;

// const EDIT_HOURS = 'hrs';
// const EDIT_MINUTES = 'min';

class HourPicker extends React.Component {
  constructor(props) {
    super(props);
    const {
      value = new Date(),
    } = props;
    const am = value.getHours() < 12;
    const hours = timeToDeg(value.getHours(), 12, am ? 0 : 12);
    const minutes = timeToDeg(value.getMinutes(), 60);
    this.state = {
      hours,
      minutes,
      am,
      edit: EDIT_HOURS,
      value,
    };
    console.log(this.state)
    this.setEdit = this.setEdit.bind(this);
    this.setAm = this.setAm.bind(this);
    this.onNumTap = this.onNumTap.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
    this.onDown = this.onDown.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onUp = this.onUp.bind(this);
  }

  componentDidMount() {
    this.svgRef.addEventListener('mouseup', this.onUp);
    this.svgRef.addEventListener('mousedown', this.onDown);
  }

  componentWillUnmount() {
    this.svgRef.removeEventListener('mouseup', this.onUp);
    this.svgRef.removeEventListener('mousedown', this.onDown);
  }

  setEdit(editMode) {
    this.setState({
      edit: editMode,
    });
  }

  setAm(am) {
    this.setState({
      am,
    });
  }

  onMove(e) {
    const {
      edit,
    } = this.state;
    const steps = edit === EDIT_HOURS ? 30 : 6;
    const offsets = edit === EDIT_HOURS ? 3 : 15;
    const {
      degrees,
      value: val,
    } = getRotation(this.svgRef, e.clientX, e.clientY, steps, offsets);
    this.onSetValue(degrees, val);
  }

  onDown(e) {
    const {
      edit,
    } = this.state;
    const {
      degrees,
      value: val,
    } = getRotation(this.svgRef, e.clientX, e.clientY, 30, 3);
    const clamped = edit === EDIT_HOURS ? 1 : 5;
    this.onSetValue(degrees, val * clamped);
    this.svgRef.addEventListener('mousemove', this.onMove);
  }

  onUp() {
    this.svgRef.removeEventListener('mousemove', this.onMove);
    // setTimeout(() => {
    //   this.setState({
    //     edit: EDIT_MINUTES,
    //   })
    // }, 200);
  }

  onNumTap(val) {
    console.log(val)
    const {
      edit,
      am,
    } = this.state;
    if (edit === EDIT_HOURS) {
      this.setState({
        hours: timeToDeg(val, 12, am && val === 12 ? 0 : 12),
      });
    } else {
      this.setState({
        minutes: timeToDeg(val, 60),
      });
    }
  }

  onSetValue(deg, val) {
    const {
      edit,
    } = this.state;
    if (edit === EDIT_HOURS) {
      this.setState({
        hours: {
          degrees: deg,
          value: Math.floor(val),
        },
      });
    } else {
      this.setState({
        minutes: {
          degrees: deg,
          value: Math.floor(val),
        },
      });
    }
  }

  onConfirm() {
    const {
      id,
      onConfirm,
    } = this.props;
    const {
      value,
      hours,
      minutes,
      am,
    } = this.state;
    const adder = am ? 0 : 12;
    value.setHours((hours.value % 12) + adder, minutes.value, 0, 0);
    console.log('onConfirm', value.toLocaleTimeString());
    onConfirm({
      name: id,
      value,
    });
  }

  render() {
    const {
      controls,
    } = this.props;
    const {
      hours,
      minutes,
      am,
      edit,
    } = this.state;
    return (
      <div className="dial__picker">
        <div className="dial__picker--main">
          <Display
            hours={hours.value}
            minutes={minutes.value}
            edit={edit}
            setEdit={this.setEdit}
            isAM={am}
            setAm={this.setAm}
            ampm={am ? 'AM' : 'PM'}
          />
          <Hour />
          <div className="dial__picker--wrapper">
            <svg ref={(el) => { this.svgRef = el; }} className="dial__picker--container" viewBox="0 0 300 300">
              <g className="clock">
                <circle className="dial__picker--bg" cx="150" cy="150" r="150" />
  
                <Selector degrees={edit === EDIT_HOURS ? hours.degrees : minutes.degrees} radius={RADIUS} />
  
                <Nums
                  num={DIVISIONS}
                  radius={RADIUS}
                  onNumTap={this.onNumTap}
                  adder={edit === EDIT_HOURS ? 1 : 5}
                />
              </g>
            </svg>
          </div>
        </div>
        {
          controls && (
            <Controls
              onConfirm={this.onConfirm}
            />
          )
        }
      </div>
    )
  }
}

HourPicker.defaultProps = {
  id: '',
  value: undefined,
  onChange: () => {},
  onConfirm: () => {},
  controls: false,
};

HourPicker.propTypes = {
  id: PropTypes.string,
  value: PropTypes.instanceOf(Date),
  onChange: PropTypes.func,
  onConfirm: PropTypes.func,
  controls: PropTypes.bool,
};

export default HourPicker;
