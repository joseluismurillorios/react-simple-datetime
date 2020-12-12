import React, { useState } from 'react';
import { HourPicker, DayPicker, Modal } from '../lib';

const today = new Date();

const App = () => {
  const [modal, setModal] = useState(false);
  const date = new Date();
  return (
    <div>
      <DayPicker
        controls
        live
        // value={today}
        // value={[new Date(2020,11,20,0,0), new Date(2020,11,12,0,0)]}
        onConfirm={(e) => {
          console.log(e)
        }}
      />
      <button onClick={() => setModal(true)}>Open</button>
      <Modal
        isVisible={modal}
        toggleModal={() => setModal(false)}
        value={date}
        minValue={date}
      >
        <DayPicker
          controls
          value={[new Date(2020,11,20,0,0), new Date(2020,11,12,0,0)]}
          onCancel={() => setModal(false)}
          onConfirm={(e) => {
            console.log(e);
            setModal(false);
          }}
        />
      </Modal>
      <HourPicker
        controls
        value={today}
        autoToggle
      />
    </div>
  );
}

export default App;
