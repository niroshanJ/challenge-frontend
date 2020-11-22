import { userListReducer } from './user';
import { userAddOpenReducer } from './user_add_open';
import { userEditOpenReducer } from './user_edit_open';
import { editUserReducer } from './edit_user';
import { userImageReducer } from './user_image';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
    users: userListReducer,
    userAddOpen: userAddOpenReducer,
    userEditOpen: userEditOpenReducer,
    userImage: userImageReducer,
    editUser: editUserReducer
});