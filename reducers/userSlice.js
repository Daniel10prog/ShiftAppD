import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  id: '',
  email: '',
  name: '',
  role: null,
};

export const userSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.role = action.payload.role;
    },
    clearUser: state => {
      state.id = '';
      state.email = '';
      state.name = '';
      state.role = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {addUser, clearUser} = userSlice.actions;

export default userSlice.reducer;
