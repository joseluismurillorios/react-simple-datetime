import React from 'react';
import { HourPicker, DayPicker } from '../lib';

const today = new Date();

const App = () => (
  <div>
    <DayPicker
      controls
      live
      onChange={(e) => {
        console.log('0', e[0])
        console.log('1', e[1])
      }}
    />
    {/* <HourPicker controls value={new Date()} /> */}
    <HourPicker
      controls
      value={today}
      // value={new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0)}
      autoToggle
    />
    {/* <HourPicker controls value={new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 0, 0)} /> */}
  </div>
);

export default App;
