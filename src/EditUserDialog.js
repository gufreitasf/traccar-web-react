import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Switch from '@material-ui/core/Switch';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  loggedUser: state.user
});

const initialState = {
    id: -1,
    name: "",
    email: "",
    phone: "",
    login: "",
    password: "",
    userDisabled: false,
    isAdmin: false,
    isManager: false
  };

class EditUserDialog extends Component {

    constructor(props) {
        super(props);
        this.state = initialState;
        this.handleChange = this.handleChange.bind(this);
        this.handleChecked = this.handleChecked.bind(this);
      }

      componentDidUpdate(prevProps) {
          if(this.props.user !== prevProps.user) {
              const user = this.props.user;
              if(this.props.user !== null ) {
                    this.setState({
                        id: user.id,
                        name: user.name !== null ? user.name : "",
                        email: user.email !== null ? user.email : "",
                        phone: user.phone !== null ? user.phone : "",
                        login: user.login !== null ? user.login : "",
                        userDisabled: user.disabled,
                        isAdmin: user != null ? user.administrator : false,
                        isManager: user !== null ? user.userLimit !== 0 : false
                    });
                }
                else {
                    this.setState(initialState);
                }
          }
      }

      handleChange(event) {
        this.setState({
          [event.target.id]: event.target.value
        });
      }

      handleChecked(event, checked) {
        this.setState({
            [event.target.id]: checked
          });
      }

    render() {
        const  { open, setOpen, onConfirm, loggedUser } = this.props;
        const { name, email, phone, login, password, userDisabled, isAdmin, isManager } = this.state;
        const isManagerLogged = loggedUser !== null ? loggedUser.userLimit !== 0 : false;
        const isAdminLogged = loggedUser != null ? loggedUser.administrator : false;

        return (
            <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="editUser-dialog"
            >
            <DialogTitle id="editUser-dialog">Ficha do usuário</DialogTitle>
            <DialogContent>
                <form>
                    <FormControl margin="normal" required >
                        <InputLabel htmlFor="name">Nome</InputLabel>
                        <Input
                            id="name"
                            value={name}
                            autoFocus
                            autoComplete="new-password"
                            onChange={this.handleChange}
                        />
                    </FormControl>
                    <FormControl margin="normal" required >
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            autoComplete="new-password"
                            onChange={this.handleChange}
                        />
                    </FormControl>
                    <FormControl margin="normal" required >
                        <InputLabel htmlFor="phone">Telefone</InputLabel>
                        <Input
                            id="phone"
                            type="tel"
                            value={phone}
                            autoComplete="new-password"
                            onChange={this.handleChange}
                        />
                    </FormControl>
                    <FormControl margin="normal" required >
                        <InputLabel htmlFor="login">Login</InputLabel>
                        <Input
                            id="login"
                            value={login}
                            autoComplete="new-password"
                            onChange={this.handleChange}
                        />
                    </FormControl>
                    <FormControl margin="normal" required>
                        <InputLabel htmlFor="password">Senha</InputLabel>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            autoComplete="new-password"
                            onChange={this.handleChange}
                        />
                    </FormControl>
                    <Divider />
                    <FormControlLabel
                        control={
                            <Switch
                                id="userDisabled" 
                                checked={userDisabled}
                                onChange={this.handleChecked}
                                disabled={!isManagerLogged && !isAdminLogged}
                            />    
                        }
                        label="Desativar"
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                id="isManager" 
                                checked={isManager}
                                onChange={this.handleChecked}
                                disabled={!isAdminLogged}
                            />    
                        }
                        label="Gerenciador"
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                id="isAdmin" 
                                checked={isAdmin}
                                onChange={this.handleChecked}
                                disabled={!isAdminLogged}
                            />    
                        }
                        label="Administrador"
                    />
                </form>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    onClick={() => setOpen(false)}
                    color="default"
                >
                Cancelar
                </Button>
                <Button
                    variant="contained"
                    onClick={() => {
                        setOpen(false);
                        const { id, name, email, phone, login, password, userDisabled, isAdmin, isManager } = this.state;
                        const userToUpdate = {
                            id: id,
                            name: name,
                            email: email,
                            phone: phone,
                            login: login,
                            password: password,
                            disabled: userDisabled,
                            administrator: isAdmin,
                            userLimit: isManager || isAdmin ? -1 : 0,
                            deviceLimit: isManager || isAdmin ? -1 : 0
                        };
                        onConfirm(userToUpdate);
                    }}
                    color="secondary"
                >
                Confirmar
                </Button>
            </DialogActions>
            </Dialog>
        );
    }
}

export default connect(mapStateToProps)(EditUserDialog);
  