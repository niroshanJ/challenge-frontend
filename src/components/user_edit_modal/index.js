import { WithModaling } from '../with_modaling';
import { UserEditForm } from '../forms/user_edit';

export function UserEdit(props) {
    const UserEditModal = WithModaling(UserEditForm);
    return (
        <UserEditModal {...props} />
    );
}