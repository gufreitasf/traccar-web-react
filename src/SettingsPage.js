import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateDevices, updateUsers } from './actions';
import Layout from './Layout'
import DeviceTable from './DeviceTable'
import UserTable from './UserTable'

const mapStateToProps = state => ({
    devices: state.devices,
    users: state.users
  });

class SettingsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
          loading: true
        };
      }

    componentDidMount() {
        fetch('/api/session').then(response => {
            if (response.ok) {
                fetch('/api/devices').then(response => {
                    if (response.ok) {
                        response.json().then(devices => {
                            this.props.dispatch(updateDevices(devices));
                        });
                    }
                });
                fetch('/api/users').then(response => {
                    if (response.ok) {
                        response.json().then(users => {
                            this.props.dispatch(updateUsers(users));
                        });
                    }
                });
                this.setState({
                    loading: false
                });
            } else {
              this.props.history.push('/login');
            }
          });
    }
    
    render() {
        const { loading } = this.state;
        if (loading) {
            return (
                <div>Carregando...</div>
            );
        } else {
            const divStyle = {float: "left", "margin": "20px" };
            const devices = this.props.devices;
            const users = this.props.users;

            return (
                <Layout history={this.props.history}>
                    <div >
                        <div style={ divStyle } >
                            <h1 align="center">Usuários</h1>
                            <UserTable users={users}/>
                        </div>
                        <div style={ divStyle } >
                            <h1 align="center">Dispositivos</h1>
                            <DeviceTable devices={devices} />
                        </div>
                    </div>
                </Layout>
            );
        }
    }
};

export default connect(mapStateToProps)(SettingsPage);