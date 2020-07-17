import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import MaterialTable from "material-table";
import { updateUsers } from './actions';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import AlertDeleteUser from './AlertDeleteUser';

const columns = [
  { field: 'name', title: 'Nome'},
  { field: 'email', title: 'Email'},
  { field: 'phone', title: 'Telefone' },
  { field: 'disable', title: 'Desativado' }
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
          currentUser: null
        };
        this.openAlertDeleteUser = this.openAlertDeleteUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
      }

    openAlertDeleteUser(open) {
        this.setState({
            alertOpen: open
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

    render() {
    let rows = this.props.users;
    const { alertOpen, currentUser } = this.state;
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
                <MaterialTable
                    columns={columns}
                    data={rows}
                    title="Usuários"
                    actions={[
                        {
                            icon: 'edit',
                            tooltip: 'Editar Usuário',
                            onClick:(event, rowData) => {
                                console.log(rowData);
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
                            // open dialog to save new one
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