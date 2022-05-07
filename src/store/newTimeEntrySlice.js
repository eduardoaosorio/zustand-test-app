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
      }),
      false,
      'saveNewTimeEntry'
    ),
  resetNewTimeEntry: () =>
    set(
      produce((state) => {
        state.newTimeEntry = initialState;
      }),
      false,
      'resetNewTimeEntry'
    ),
  updateNewTimeEntryDescription: (description) =>
    set(
      produce((state) => {
        state.newTimeEntry.description = description;
      }),
      false,
      'updateNewTimeEntryDescription'
    ),
  updateNewTimeEntryTagId: (id) =>
    set(
      produce((state) => {
        state.newTimeEntry.tagId = id;
      }),
      false,
      'updateNewTimeEntryTagId'
    ),
  updateNewTimeEntryProjectId: (id) =>
    set(
      produce((state) => {
        state.newTimeEntry.projectId = id;
      }),
      false,
      'updateNewTimeEntryProjectId'
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
      }),
      false,
      'updateNewTimeEntryStartAndFinish'
    ),
});

export default newTimeEntrySlice;
