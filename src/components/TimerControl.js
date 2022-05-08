import React from 'react';
import shallow from 'zustand/shallow';
import DebouncedDescription from './DebouncedDescription';
import useStore from '../store/useStore';
import { projectList } from '../utils/constants';
import { tagList } from '../utils/constants';
import ListSelect from './ListSelect';

export default function TimerControl() {
  const [
    newTimeEntryDescription,
    newTimeEntryProjectId,
    newTimeEntryTagId,
    updateNewTimeEntryDescription,
    updateNewTimeEntryTagId,
    updateNewTimeEntryProjectId,
    saveNewTimeEntry,
    resetNewTimeEntry,
  ] = useStore(
    (state) => [
      state.newTimeEntry.description,
      state.newTimeEntry.projectId,
      state.newTimeEntry.tagId,
      state.updateNewTimeEntryDescription,
      state.updateNewTimeEntryTagId,
      state.updateNewTimeEntryProjectId,
      state.saveNewTimeEntry,
      state.resetNewTimeEntry,
    ],
    shallow
  );

  const handleAddTimeEntry = () => {
    saveNewTimeEntry();
    resetNewTimeEntry();
  };

  return (
    <header className="border p-3">
      <div className="border flex justify-between p-2">
        <div className="flex">
          <DebouncedDescription
            timeEntryDescription={newTimeEntryDescription}
            updateDescription={updateNewTimeEntryDescription}
          />
          <ListSelect
            initialValue={newTimeEntryProjectId}
            listOptions={projectList}
            updateTimeEntryFunction={updateNewTimeEntryProjectId}
          />
          <ListSelect
            initialValue={newTimeEntryTagId}
            listOptions={tagList}
            updateTimeEntryFunction={updateNewTimeEntryTagId}
          />
        </div>
        <button
          onClick={handleAddTimeEntry}
          className="border px-2"
          type="button"
        >
          Add time entry
        </button>
      </div>
    </header>
  );
}
