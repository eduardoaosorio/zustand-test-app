import React from 'react';

export default React.memo(function ListSelect({
  initialValue,
  listOptions,
  updateTimeEntryFunction,
}) {
  const handleSelect = (e) => updateTimeEntryFunction(parseInt(e.target.value));

  return (
    <select
      className="border"
      value={String(initialValue) || undefined}
      onChange={handleSelect}
    >
      {listOptions.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  );
});
