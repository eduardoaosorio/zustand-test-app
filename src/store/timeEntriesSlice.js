import produce from 'immer';
import { fetchStatus } from '../utils/constants';
import { mockApi } from '../mockApi/mockApi';

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
  fetchTimeEntries: async () => {
    try {
      get().setTimeEntriesStatus(fetchStatus.loading);
      const timeEntries = await mockApi.getTimeEntries();
      get().setTimeEntriesStatus(fetchStatus.succeeded);
      get().setTimeEntriesList(timeEntries);
      get().setTimeEntriesError(null);
    } catch (err) {
      get().setTimeEntriesStatus(fetchStatus.failed);
      get().setTimeEntriesError(err);
    }
  },
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
  deleteTimeEntry: (id) =>
    set(
      produce((state) => {
        const deleteIndex = state.timeEntries.list.findIndex(
          (timeEntry) => timeEntry.id === id
        );

        state.timeEntries.list.splice(deleteIndex, 1);
      })
    ),
});

export default timeEntriesSlice;
