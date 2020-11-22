export const userAddOpenReducer = (state = false, action) => {
    switch (action.type) {
        case 'ADD_OPEN':
            return true;
        case 'ADD_CLOSE':
            return false;
        default:
            return state;
    }
}