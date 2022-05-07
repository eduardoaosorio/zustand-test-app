import React, { useEffect } from 'react';
import useStore from '../store/useStore';
import { mockApi } from '../mockApi/mockApi';
import { fetchStatus } from '../utils/constants';
import DebouncedDescription from './DebouncedDescription';
import ListSelect from './ListSelect';
import { projectList } from '../utils/constants';
import { tagList } from '../utils/constants';

export default function TimeEntries() {
  const setTimeEntriesList = useStore((state) => state.setTimeEntriesList);
  const setTimeEntriesStatus = useStore((state) => state.setTimeEntriesStatus);
  const setTimeEntriesError = useStore((state) => state.setTimeEntriesError);
  const timeEntriesList = useStore((state) => state.timeEntries.list);
  const timeEntriesStatus = useStore((state) => state.timeEntries.status);
  const timeEntriesError = useStore((state) => state.timeEntries.error);

  const updateTimeEntryDescription = useStore(
    (state) => state.updateTimeEntryDescription
  );

  const updateTimeEntryProjectId = useStore(
    (state) => state.updateTimeEntryProjectId
  );

  const deleteTimeEntry = useStore((state) => state.deleteTimeEntry);

  const updateTimeEntryTagId = useStore((state) => state.updateTimeEntryTagId);

  useEffect(() => {
    if (timeEntriesStatus === fetchStatus.idle) {
      setTimeEntriesStatus(fetchStatus.loading);
      mockApi
        .getTimeEntries()
        .then((timeEntries) => {
          setTimeEntriesStatus(fetchStatus.succeeded);
          setTimeEntriesList(timeEntries);
          setTimeEntriesError(null);
        })
        .catch((err) => {
          console.log(err);
          setTimeEntriesStatus(fetchStatus.failed);
          setTimeEntriesError(err);
        });
    }
  }, [
    setTimeEntriesError,
    setTimeEntriesList,
    setTimeEntriesStatus,
    timeEntriesStatus,
  ]);

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
                timeEntry={timeEntry}
                updateProperty="projectId"
                listOptions={projectList}
                updateTimeEntryFunction={(newProjectId) =>
                  updateTimeEntryProjectId(timeEntry.id, newProjectId)
                }
              />
              <ListSelect
                timeEntry={timeEntry}
                updateProperty="tagId"
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
