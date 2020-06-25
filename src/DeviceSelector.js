import React, { Component } from 'react';
import { connect } from 'react-redux';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

const mapStateToProps = state => ({
    devices: state.devices
  });

class DeviceSelector extends Component {
    render() {
        const { devices } = this.props;

        if( devices && devices.length > 0 ) {

            return  (
                <Autocomplete
                    multiple
                    id="tags-standard"
                    options={devices}
                    getOptionLabel={(option) => option.name}
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
