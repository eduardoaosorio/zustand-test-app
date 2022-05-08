import React, { useEffect } from 'react';
import shallow from 'zustand/shallow';
import useStore from '../store/useStore';
import { fetchStatus } from '../utils/constants';
import DebouncedDescription from './DebouncedDescription';
import ListSelect from './ListSelect';
import { projectList } from '../utils/constants';
import { tagList } from '../utils/constants';

export default function TimeEntries() {
  const [
    fetchTimeEntries,
    timeEntriesList,
    timeEntriesStatus,
    timeEntriesError,
    updateTimeEntryDescription,
    updateTimeEntryProjectId,
    deleteTimeEntry,
    updateTimeEntryTagId,
  ] = useStore(
    (state) => [
      state.fetchTimeEntries,
      state.timeEntries.list,
      state.timeEntries.status,
      state.timeEntries.error,
      state.updateTimeEntryDescription,
      state.updateTimeEntryProjectId,
      state.deleteTimeEntry,
      state.updateTimeEntryTagId,
    ],
    shallow
  );

  useEffect(() => {
    if (timeEntriesStatus === fetchStatus.idle) {
      fetchTimeEntries();
    }
  }, [fetchTimeEntries, timeEntriesStatus]);

  return (
    <section className="p-3">
      {timeEntriesStatus === fetchStatus.loading && <div>Loading...</div>}

      {timeEntriesStatus === fetchStatus.succeeded &&
        timeEntriesList.map((timeEntry) => (
          <div key={timeEntry.id} className="border flex justify-between p-2">
            <div className="flex">
              <DebouncedDescription
                timeEntryDescription={timeEntry.description}
                updateDescription={(newDescription) =>
                  updateTimeEntryDescription(timeEntry.id, newDescription)
                }
              />
              <ListSelect
                initialValue={timeEntry.projectId}
                listOptions={projectList}
                updateTimeEntryFunction={(newProjectId) =>
                  updateTimeEntryProjectId(timeEntry.id, newProjectId)
                }
              />
              <ListSelect
                initialValue={timeEntry.tagId}
                listOptions={tagList}
                updateTimeEntryFunction={(newTagId) =>
                  updateTimeEntryTagId(timeEntry.id, newTagId)
                }
              />
            </div>
            <button
              onClick={() => {
                deleteTimeEntry(timeEntry.id);
              }}
              className="border px-2"
              type="button"
            >
              Delete entry
            </button>
          </div>
        ))}

      {timeEntriesStatus === fetchStatus.failed && (
        <div>Something went wrong. {timeEntriesError.message}</div>
      )}
    </section>
  );
}
