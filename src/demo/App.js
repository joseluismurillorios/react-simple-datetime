import React from 'react';
import { HourPicker } from '../lib';

const today = new Date();

const App = () => (
  <div>
    <HourPicker controls value={new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0)} />
    <HourPicker controls />
  </div>
);

export default App;
