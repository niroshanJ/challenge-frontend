import React, { useEffect, useState } from 'react';
import { DataGrid as MaterialDataGrid } from '@material-ui/data-grid';
import { useSelector, useDispatch } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { deleteUser, userEditFormOpen, uploadImage, editUser } from '../../redux/action';

export default function DataGrid(props) {

  const dispatch = useDispatch();

  const users = useSelector((state) => state.users);
  const [columns, setColumns] = useState(
    [
      { field: 'id', headerName: '#', width: 150 },
      {
        field: "userImage",
        headerName: "Image",
        disableClickEventBubbling: true,
        renderCell: (params) => {
          return <Avatar src={params.getValue('userImage')} alt={params.getValue('firstName') + ' ' + params.getValue('lastName')} />;
        }
      },
      { field: 'firstName', headerName: 'First Name', width: 150 },
      { field: 'lastName', headerName: 'Last Name', width: 150 },
      { field: 'address', headerName: 'Address', width: 150 },
      { field: 'phoneNumber', headerName: 'Phone Number', width: 150 },
      { field: 'email', headerName: 'Email', width: 150 },
      { field: 'dateOfBirth', headerName: 'Birth Day', width: 150 },
      {
        field: "actions",
        headerName: "Actions",
        disableClickEventBubbling: true,
        width: 150,
        renderCell: (params) => {
          const id = params.getValue('id');
          const api = params.api;
          const fields = api
            .getAllColumns()
            .map((c) => c.field)
            .filter((c) => c !== "__check__" && !!c);
          const thisUser = {};
          fields.forEach((f) => {
            thisUser[f] = params.getValue(f);
          });
          console.log(thisUser, 'thisUser');
          return (
            <>
              <IconButton onClick={() => { editUserById(id, thisUser) }}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => { deleteUserById(id) }}>
                <DeleteIcon />
              </IconButton>
            </>
          );
        }
      }
    ]
  );

  const deleteUserById = (id) => {
    dispatch(deleteUser(id));
  }

  const editUserById = (id, user) => {
    dispatch(editUser(user));
    dispatch(userEditFormOpen());
    dispatch(uploadImage(user.userImage));
  }

  return (
    <div>
      <MaterialDataGrid
        autoHeight={true}
        rows={users}
        columns={columns}
      />
    </div>
  );
}