import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeviceTable from './DeviceTable'
import DeviceSelector from './DeviceSelector'

export default class UserDeviceDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedDevices: [],
            initialDevices: []
        };
        this.linkDevice = this.linkDevice.bind(this);
        this.selectDevices = this.selectDevices.bind(this);
    }

    linkDevice(deviceId, add) {
        const user = this.props.user;
        const method = add ? "POST" : "DELETE"

        if (user != null) {
            const map = {
                userId: user.id,
                deviceId: deviceId
            }
            fetch('/api/permissions', {
                method: method,
                body: new Blob([JSON.stringify(map)], { type: 'application/json' })
            }).then(response => {
                if (!response.ok) {
                    window.alert("Falha ao relacionar o dispositivo");
                    this.props.setOpen(false);
                }
            });
        }
    }

    selectDevices(devices) {
        const { selectedDevices } = this.state;
        // Busca dispositivos a adicionar
        devices.forEach((value) => {
            var existing = selectedDevices.filter( (v, i) => {
                return v.id === value.id;
            });
            if (!existing.length) {
                this.linkDevice(value.id, true);
            }
        });

        // Busca dispositivos a remover
        selectedDevices.forEach((value) => {
            var existing = devices.filter( (v, i) => {
                return v.id === value.id;
            });
            if (!existing.length) {
                this.linkDevice(value.id, false);
            }
        });

        this.setState({
            selectedDevices: devices
        });

    }

    componentDidUpdate(prevProps) {
        if (this.props.user !== prevProps.user || (this.props.open !== prevProps.open && this.props.open===true) ) {
            const user = this.props.user;
            if (user != null) {
                const url = '/api/devices?userId=' + user.id;
                fetch(url).then(response => {
                    if (response.ok) {
                        response.json().then(devices => {
                            this.setState({
                                initialDevices: devices,
                                selectedDevices: devices
                            });
                        });
                    } else {
                        this.props.history.push('/login');
                    }
                });
            }
        }
    }

    render() {
        const { open, setOpen, user } = this.props;
        const divStyle = { float: "center", "margin": "20px" };
        const { selectedDevices, initialDevices } = this.state;
        const userName = user != null ? user.name : "";

        return (
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="userDevice-dialog"
            >
                <DialogTitle id="userDevice-dialog">{"Dispositivos do usuário: " + userName}</DialogTitle>
                <DialogContent>
                    <form>
                        <div style={divStyle} >
                            <DeviceSelector
                                disableClearable={true}
                                defaultValue={initialDevices}
                                onChange={(event, newValue) => {
                                    event.preventDefault();
                                    this.selectDevices(newValue);
                                }}
                            />
                        </div>
                        <div style={divStyle} >
                            <DeviceTable devices={selectedDevices} visibleColumns={['category', 'name', 'uniqueId']} />
                        </div>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        onClick={() => {
                            setOpen(false);

                        }}
                        color="default"
                    >
                        Ok
                </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

