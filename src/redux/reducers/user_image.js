export const userImageReducer = (state = '', action) => {
    switch (action.type) {
        case 'UPLOAD_IMAGE':
            return action.data;
        case 'RESET_USER_IMAGE':
            return false;
        default:
            return state;
    }
}