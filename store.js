import {configureStore} from '@reduxjs/toolkit';

import currentUserReducer from './reducers/userSlice';
import allUsersReducer from './reducers/usersListSlice';

export default configureStore({
  reducer: {
    currentUser: currentUserReducer,
    allUsersList: allUsersReducer,
  },
});
