import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import UserGrid from '../../components/user_grid';
import { UserAdd } from '../../components/user_add_modal';
import { UserEdit } from '../../components/user_edit_modal';
import { useSelector, useDispatch } from 'react-redux';
import { userAddFormOpen, userAddFormClose, userEditFormOpen, userEditFormClose } from '../../redux/action';

import './style.css';

function Home() {

  const dispatch = useDispatch();

  const userAddOpen = useSelector(state => state.userAddOpen);
  const userEditOpen = useSelector(state => state.userEditOpen);

  const openUserAddForm = () => {
    dispatch(userAddFormOpen());
  }

  const closeUserAddForm = () => {
    dispatch(userAddFormClose());
  }

  const openUserEditForm = () => {
    dispatch(userEditFormOpen());
  }

  const closeUserEditForm = () => {
    dispatch(userEditFormClose());
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth='xl' fixed={true}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <h1>FusionGrove <small>Challenge-Frontend</small></h1>
          </Grid>
        </Grid>
        <Grid container spacing={3}
          direction="column-reverse"
          justify="space-evenly"
          alignItems="flex-end" >
          <Grid item xs={12}>
            <UserAdd
              open={userAddOpen}
              onClose={() => { closeUserAddForm() }}
              title="Add User"
              description="Please fill all the fields and click Save button"
            />
            <UserEdit
              open={userEditOpen}
              onClose={() => { closeUserEditForm() }}
              title="Edit User"
              description="Please fill all the fields and click Edit button"
            />
            <Button
              variant="contained"
              color='primary'
              startIcon={<PersonAddIcon />}
              onClick={() => openUserAddForm(true)}
            >
              Add User
              </Button>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <UserGrid />
          </Grid>
        </Grid>
      </Container>
    </React.Fragment >
  );
}

export default Home;