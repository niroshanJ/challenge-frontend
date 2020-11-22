import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export function Modal(props) {

    const InternalComponent = props.component;
    const open = props.open;

    return (
        <Dialog
            fullWidth={true}
            maxWidth='md'
            open={open}
            aria-labelledby="max-width-dialog-title"
        >
            <DialogTitle id="max-width-dialog-title">{props.title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{props.description}</DialogContentText>
                <InternalComponent />
            </DialogContent>
        </Dialog>

    );
}