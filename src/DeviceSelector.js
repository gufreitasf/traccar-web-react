import React, { Component } from 'react';
import { connect } from 'react-redux';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

const mapStateToProps = state => ({
    devices: state.devices
});

class DeviceSelector extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedDevices: []
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.defaultValue !== prevProps.defaultValue) {
            const defaultValue = this.props.defaultValue;
            if (defaultValue != null) {
                this.setState({
                    selectedDevices: defaultValue
                });
            }
            else {
                this.setState({
                    selectedDevices: []
                });
            }
        }
    }

    render() {
        let { devices, disableClearable } = this.props;
        let { selectedDevices } = this.state;

        if (devices && devices.length > 0) {

            return (
                <Autocomplete
                    multiple
                    id="tags-standard"
                    options={devices}
                    value={selectedDevices}
                    disableClearable={disableClearable}
                    clearText="Limpar seleção"
                    filterSelectedOptions={false}
                    style={{ maxWidth: 400 }}
                    getOptionLabel={(option) => option.name}
                    getOptionSelected={(option, value) => option.id === value.id}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            label="Nome do dispositivo"
                            placeholder="Dispositivo"
                            margin="normal"
                        />
                    )}
                    onChange={(event, newValue) => {
                        this.setState({
                            selectedDevices: newValue
                        });
                        this.props.onChange(event, newValue);
                    }}
                />
            );
        }
        else {
            return ""
        }
    }
}

export default connect(mapStateToProps)(DeviceSelector);
