import React from 'react';
import { useSelector } from 'react-redux';
import { WithLoading } from '../with_loading';
import DataGrid from '../data_grid';

// HOC component usage
const UserGridWithLoading = WithLoading(DataGrid);

export default function UserGrid(props) {
    const users = useSelector((state) => state.users);

    // Waiting time for test the HOC lading time
    // setTimeout(function () {
    //     setIsLoading(false);
    // }, 1000);

    return (
        <div>
            <UserGridWithLoading
                isLoading={false}
                rows={users}
            />
        </div>
    );

}

// export default UserGrid;