import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

export default class AlertDeleteUser extends Component {

    render() {
        const  { open, setOpen, onConfirm, user } = this.props;
        return (
            <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="confirm-dialog"
            >
            <DialogContent>Tem certeza que gostaria de remover o usuário "{ user ? user.name : "" }"?</DialogContent>
            <DialogActions>
                <Button
                variant="contained"
                onClick={() => setOpen(false)}
                color="default"
                >
                Não
                </Button>
                <Button
                variant="contained"
                onClick={() => {
                    setOpen(false);
                    onConfirm(user);
                }}
                color="secondary"
                >
                Sim
                </Button>
            </DialogActions>
            </Dialog>
        );
    }
}

  