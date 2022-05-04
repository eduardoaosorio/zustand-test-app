import produce from 'immer';
import { fetchStatus } from '../utils/constants';

const timeEntriesSlice = (set, get) => ({
  timeEntries: {
    list: [],
    status: fetchStatus.idle,
    error: null,
  },
  setTimeEntriesList: (timeEntries) =>
    set(
      produce((state) => {
        state.timeEntries.list = timeEntries;
      })
    ),
  setTimeEntriesStatus: (status) =>
    set(
      produce((state) => {
        state.timeEntries.status = status;
      })
    ),
  setTimeEntriesError: (value) =>
    set(
      produce((state) => {
        state.timeEntries.error = value;
      })
    ),
  updateTimeEntryDescription: (id, description) =>
    set(
      produce((state) => {
        const timeEntry = state.timeEntries.list.find(
          (timeEntry) => timeEntry.id === id
        );
        timeEntry.description = description;
      })
    ),
  updateTimeEntryTagId: (id, tagId) =>
    set(
      produce((state) => {
        const timeEntry = state.timeEntries.list.find(
          (timeEntry) => timeEntry.id === id
        );
        timeEntry.tagId = tagId;
      })
    ),
  updateTimeEntryProjectId: (id, projectId) =>
    set(
      produce((state) => {
        const timeEntry = state.timeEntries.list.find(
          (timeEntry) => timeEntry.id === id
        );
        timeEntry.projectId = projectId;
      })
    ),
});

export default timeEntriesSlice;
