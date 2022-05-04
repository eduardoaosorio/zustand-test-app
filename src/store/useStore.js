import create from 'zustand';
import { devtools } from 'zustand/middleware';

import newTimeEntrySlice from './newTimeEntrySlice';
import timeEntriesSlice from './timeEntriesSlice';

const useStore = create(
  devtools((set, get) => ({
    ...newTimeEntrySlice(set, get),
    ...timeEntriesSlice(set, get),
  }))
);

export default useStore;
