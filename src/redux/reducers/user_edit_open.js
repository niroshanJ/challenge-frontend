export const userEditOpenReducer = (state = false, action) => {
    switch (action.type) {
        case 'EDIT_OPEN':
            return true;
        case 'EDIT_CLOSE':
            return false;
        default:
            return state;
    }
}