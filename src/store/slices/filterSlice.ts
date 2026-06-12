import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterState } from '../../types';

const initialState: FilterState = {
  searchTerm: '',
  userIds: [],
  onlyMyIssue: false,
  ignoreResolved: false,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
    toggleUserId(state, action: PayloadAction<string>) {
      const idx = state.userIds.indexOf(action.payload);
      if (idx >= 0) {
        state.userIds.splice(idx, 1);
      } else {
        state.userIds.push(action.payload);
      }
    },
    toggleOnlyMyIssue(state) {
      state.onlyMyIssue = !state.onlyMyIssue;
    },
    toggleIgnoreResolved(state) {
      state.ignoreResolved = !state.ignoreResolved;
    },
    resetFilters() {
      return initialState;
    },
  },
});

export const {
  setSearchTerm,
  toggleUserId,
  toggleOnlyMyIssue,
  toggleIgnoreResolved,
  resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
