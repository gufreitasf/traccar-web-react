import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import MaterialTable from "material-table";
import { updateUsers } from './actions';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import AlertDeleteUser from './AlertDeleteUser';
import EditUserDialog from './EditUserDialog'

const columns = [
  { field: 'login', title: 'Login'},
  { field: 'name', title: 'Nome'},
  { field: 'email', title: 'Email'},
  { field: 'phone', title: 'Telefone' },
  { field: 'disabled', title: 'Desativado', render: rowData => rowData.disabled ? "Sim" : "Não"  }
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
          currentUser: null
        };
        this.openAlertDeleteUser = this.openAlertDeleteUser.bind(this);
        this.openEditUserDialog = this.openEditUserDialog.bind(this);
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

    updateUser(user) {
        const url = "/api/users/" + (user.id !== -1 ? user.id : "");
        const method = user.id !== -1 ? "PUT" : "POST"
        fetch(url, {
            method: method,
            body: new Blob([JSON.stringify(user)], {type : 'application/json'})
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
    const { alertOpen, editOpen, currentUser } = this.state;
    if(rows == null)
        rows = [];

    return (
            <div>
                <AlertDeleteUser
                    user={currentUser}
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
                <MaterialTable
                    columns={columns}
                    data={rows}
                    title=""
                    actions={[
                        {
                            icon: 'edit',
                            tooltip: 'Editar Usuário',
                            onClick:(event, rowData) => {
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