import React, { useState, useEffect } from 'react';

export default React.memo(function DebouncedDescription({
  timeEntryDescription,
  updateDescription,
}) {
  const [textInput, setTextInput] = useState(timeEntryDescription);

  const handleChange = (event) => {
    setTextInput(event.target.value);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      updateDescription(textInput);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [textInput, updateDescription]);

  useEffect(() => {
    setTextInput(timeEntryDescription);
  }, [timeEntryDescription]);

  return (
    <input
      placeholder="Project description"
      className="border px-2"
      value={textInput}
      onChange={handleChange}
    />
  );
});
