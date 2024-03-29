import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import MaterialTable from "material-table";
import { updateUsers } from './actions';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import AlertDelete from './AlertDelete';
import EditUserDialog from './EditUserDialog'
import LinkIcon from '@material-ui/icons/Link';
import UserDeviceDialog from './UserDeviceDialog'

const columns = [
    { field: 'login', title: 'Login' },
    { field: 'name', title: 'Nome' },
    { field: 'email', title: 'Email' },
    { field: 'phone', title: 'Telefone' },
    { field: 'disabled', title: 'Desativado', render: rowData => rowData.disabled ? "Sim" : "Não" }
];

const styles = theme => ({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});

class UserTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            alertOpen: false,
            editOpen: false,
            userDeviceOpen: false,
            currentUser: null
        };
        this.openAlertDeleteUser = this.openAlertDeleteUser.bind(this);
        this.openEditUserDialog = this.openEditUserDialog.bind(this);
        this.openUserDeviceDialog = this.openUserDeviceDialog.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
    }

    openAlertDeleteUser(open) {
        this.setState({
            alertOpen: open
        });
    }

    openEditUserDialog(open) {
        this.setState({
            editOpen: open
        });
    }

    openUserDeviceDialog(open) {
        this.setState({
            userDeviceOpen: open
        });
    }

    deleteUser(user) {
        fetch("/api/users/" + user.id, {
            method: "DELETE"
        }).then(response => {
            if (response.ok) {
                fetch('/api/users').then(response => {
                    if (response.ok) {
                        response.json().then(users => {
                            this.props.dispatch(updateUsers(users));
                        });
                    }
                });
            }
        });
    }

    updateUser() {
        const { currentUser } = this.state;
        const url = "/api/users/" + (currentUser.id !== -1 ? currentUser.id : "");
        const method = currentUser.id !== -1 ? "PUT" : "POST"
        fetch(url, {
            method: method,
            body: new Blob([JSON.stringify(currentUser)], { type: 'application/json' })
        }).then(response => {
            if (response.ok) {
                fetch('/api/users').then(response => {
                    if (response.ok) {
                        response.json().then(users => {
                            this.props.dispatch(updateUsers(users));
                        });
                    }
                });
            }
        });
    }

    render() {
        let rows = this.props.users;
        const { alertOpen, editOpen, userDeviceOpen, currentUser } = this.state;
        if (rows == null)
            rows = [];

        return (
            <div>
                <AlertDelete
                    text={"Tem certeza que gostaria de remover o usuário " + (currentUser != null ? currentUser.name : "") + "?"}
                    open={alertOpen}
                    setOpen={this.openAlertDeleteUser}
                    onConfirm={this.deleteUser}
                />
                <EditUserDialog
                    user={currentUser}
                    open={editOpen}
                    setOpen={this.openEditUserDialog}
                    onConfirm={this.updateUser}
                />
                <UserDeviceDialog
                    user={currentUser}
                    open={userDeviceOpen}
                    setOpen={this.openUserDeviceDialog}
                />
                <MaterialTable
                    columns={columns}
                    data={rows}
                    title=""
                    actions={[
                        {
                            icon: 'edit',
                            tooltip: 'Editar Usuário',
                            onClick: (event, rowData) => {
                                this.setState({
                                    currentUser: rowData
                                });
                                this.openEditUserDialog(true);
                            }
                        },
                        {
                            icon: 'delete',
                            tooltip: 'Remover Usuário',
                            onClick: (event, rowData) => {
                                this.setState({
                                    currentUser: rowData
                                });
                                this.openAlertDeleteUser(true);
                            }
                        },
                        {
                            icon: () => <LinkIcon />,
                            tooltip: 'Relacionar dispositivos',
                            onClick: (event, rowData) => {
                                this.setState({
                                    currentUser: rowData
                                });
                                this.openUserDeviceDialog(true);
                            }
                        },
                        {
                            icon: 'add',
                            tooltip: 'Adicionar  Usuário',
                            isFreeAction: true,
                            onClick: () => {
                                this.setState({
                                    currentUser: null
                                });
                                this.openEditUserDialog(true);
                            }
                        }
                    ]}
                    localization={{
                        body: {
                            emptyDataSourceMessage: 'Nenhum registro para exibir',
                            addTooltip: 'Adicionar'
                        },
                        toolbar: {
                            searchTooltip: 'Pesquisar',
                            searchPlaceholder: 'Pesquisar',
                            nRowsSelected: '{0} linha(s) selecinada(s)'
                        },
                        pagination: {
                            labelRowsSelect: 'linhas',
                            labelDisplayedRows: '{count} de {from}-{to}',
                            firstTooltip: 'Primeira página',
                            previousTooltip: 'Página anterior',
                            nextTooltip: 'Próxima página',
                            lastTooltip: 'Última página'
                        },
                        header: {
                            actions: 'Ações'
                        }
                    }}
                />
            </div>
        );
    }
}

export default compose(
    withStyles(styles),
    connect()
)(UserTable);