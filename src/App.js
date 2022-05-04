import React from 'react';
import TimeEntries from './components/TimeEntries';
import TimerControl from './components/TimerControl';

export default function App() {
  return (
    <div className="max-w-5xl mx-auto border">
      <TimerControl />
      <TimeEntries />
    </div>
  );
}
