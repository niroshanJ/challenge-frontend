export const userAddFormOpen = () => {
    return {
        type: 'ADD_OPEN'
    }
}
export const userAddFormClose = () => {
    return {
        type: 'ADD_CLOSE'
    }
}
export const userEditFormOpen = () => {
    return {
        type: 'EDIT_OPEN'
    }
}
export const userEditFormClose = () => {
    return {
        type: 'EDIT_CLOSE'
    }
}
export const editUser = (user) => {
    return {
        type: 'EDIT_USER',
        data: user
    }
}
export const updateUser = (user) => {
    return {
        type: 'UPDATE_USER',
        data: user
    }
}
export const uploadImage = (image) => {
    return {
        type: 'UPLOAD_IMAGE',
        data: image
    }
}

export const addUser = (user) => {
    return {
        type: 'ADD_USER',
        data: user
    }
}

export const resetUserImage = () => {
    return {
        type: 'RESET_USER_IMAGE',
    }
}

export const deleteUser = (id) => {
    return {
        type: 'DELETE_USER',
        data: id
    }
}