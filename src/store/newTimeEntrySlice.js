import produce from 'immer';

const initialState = {
  startedAt: null,
  finishedAt: null,
  projectId: 0,
  tagId: 0,
  description: '',
  id: null,
};

const newTimeEntrySlice = (set, get) => ({
  newTimeEntry: initialState,
  saveNewTimeEntry: () =>
    set(
      produce((state) => {
        state.newTimeEntry.id = String(Math.floor(Math.random() * 1000000)); // generate a random number as id
        state.timeEntries.list.push(state.newTimeEntry);
      })
    ),
  resetNewTimeEntry: () =>
    set(
      produce((state) => {
        state.newTimeEntry = initialState;
      })
    ),
  updateNewTimeEntryDescription: (description) =>
    set(
      produce((state) => {
        state.newTimeEntry.description = description;
      })
    ),
  updateNewTimeEntryTagId: (id) =>
    set(
      produce((state) => {
        state.newTimeEntry.tagId = id;
      })
    ),
  updateNewTimeEntryProjectId: (id) =>
    set(
      produce((state) => {
        state.newTimeEntry.projectId = id;
      })
    ),
  updateNewTimeEntryStartAndFinish: (payload) =>
    set(
      produce((state) => {
        if (payload.startedAt) {
          state.newTimeEntry.startedAt = payload.startedAt;
        }
        if (payload.finishedAt) {
          state.newTimeEntry.finishedAt = payload.finishedAt;
        }
      })
    ),
});

export default newTimeEntrySlice;
