import { WithModaling } from '../with_modaling';
import { UserAddForm } from '../forms/user_add';

export function UserAdd(props) {

    const UserAddModal = WithModaling(UserAddForm);
    return (
        <UserAddModal {...props} />
    );
}