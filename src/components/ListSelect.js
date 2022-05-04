import React from 'react';

export default function ListSelect({
  timeEntry,
  listOptions,
  updateTimeEntryFunction,
  updateProperty,
}) {
  const handleSelect = (e) => updateTimeEntryFunction(parseInt(e.target.value));

  return (
    <select
      className="border"
      value={timeEntry[updateProperty] || undefined}
      onChange={handleSelect}
    >
      {listOptions.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  );
}
