export const userListReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_USER':
            /**
             * Since state should not mutate
             * currentState is a copy of the state
             */
            return [...state, action.data];
        case 'DELETE_USER':
            return state.filter(user => user.id !== action.data);
        case 'UPDATE_USER':
            const index = state.findIndex(user => user.id === action.data.id);
            const newState = [...state];
            newState[index] = action.data;
            return newState;
        default:
            return state;
    }
}