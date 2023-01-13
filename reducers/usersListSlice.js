import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  users: [],
};

export const usersListSlice = createSlice({
  name: 'allUsersList',
  initialState,
  reducers: {
    addUsersList: (state, action) => {
      state.users.push(action.payload);
    },

    clearUsers: state => {
      state.users = [];
    },
  },
});

export const {addUsersList, clearUsers} = usersListSlice.actions;

export default usersListSlice.reducer;
