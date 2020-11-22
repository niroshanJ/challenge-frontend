export const editUserReducer = (state = [], action) => {
    switch (action.type) {
        case 'EDIT_USER':
            return action.data;
        default:
            return state;
    }
}